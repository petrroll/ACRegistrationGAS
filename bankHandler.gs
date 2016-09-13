function bankLog(message){
  sheetLog('bankLog', message);
}

function getNewDataFromBank(){
  var token = getBankSecret();
  var url = "https://www.fio.cz/ib_api/rest/last/" + token + "/transactions.json"
  var data = UrlFetchApp.fetch(url);

  var decodedData = processDataFromBank(data);
  if(decodedData !== null) {
    var dataInfo = decodedData.accountStatement.info;
    runtimeLog("Data ids from:" + dataInfo.idFrom + "to:" + dataInfo.idTo); 
    bankLog(["Data ids from to", dataInfo.idFrom , dataInfo.idTo]);
  }

  return decodedData;
}

function getTestingDataFromBank(){
  var token = getBankSecret();
  var url = "https://www.fio.cz/ib_api/rest/periods/" + token + "/2016-07-25/2016-09-10/transactions.json"
  var data = UrlFetchApp.fetch(url);

  return processDataFromBank(data);
}

function processDataFromBank(data){

  var responseCode = data.getResponseCode();
  var contentText = data.getContentText();
  if(responseCode != 200){
    logError(['Could not connect to bank API:', responseCode, contentText]);
    return null;
  }

  var responseObject = JSON.parse(contentText);
  return responseObject;
}

function extactTransactions(transactionsRaw){

  var transactionDictionary = {};
  Logger.log('transactions' + transactionsRaw.length);
  for(var i = 0; i < transactionsRaw.length; ++i){

    var currTransaction = transactionsRaw[i];
    var processedTransaction = extractTransaction(currTransaction);
    if (processedTransaction == null) { continue; }

    //filter the ones that we don't wont (don't have variable symbol, transfer id, or date')
    if (!(processedTransaction.hasOwnProperty('accountNumber') && processedTransaction.hasOwnProperty('variableSymbol'))){ continue; }
        
    var variableSymbol = processedTransaction.variableSymbol;
    if(!transactionDictionary.hasOwnProperty(variableSymbol)){
      transactionDictionary[variableSymbol] = [];
    }

    transactionDictionary[variableSymbol].push(processedTransaction);
    
  }

  return transactionDictionary;
}

function extractTransaction(transaction){

  var bankConfig = getBankConfig();

  var transactionObject = {};
  var transactionParametersArray = objectValuesToArray(transaction);

  for(var i = 0; i < transactionParametersArray.length; ++i){

    var currParameter = transactionParametersArray[i];
    if(currParameter == null) {continue;}

    var currParameterName = currParameter.name;
    var currParameterValue = currParameter.value;

    if(bankConfig.hasOwnProperty(currParameterName)){
      var properPropertyName = bankConfig[currParameterName];
      transactionObject[properPropertyName] = currParameterValue;
    }

  }

  handleAdditionalInfoWhenSendingEurosToCZKAccount(transactionObject);
  return transactionObject;
}

function handleAdditionalInfoWhenSendingEurosToCZKAccount(transactionObj){

  if(!transactionObj.hasOwnProperty('additionalInfo')) { return;}

  var additionalInfo = transactionObj['additionalInfo'];
  var match =  additionalInfo.match(/^([0-9]+\.[0-9]+) EUR$/);

  if(match.length < 2){ return; }
  var newAmountEUR = match[1];

  transactionObj['currencyOrig'] = transactionObj.currency;
  transactionObj['amountOrig'] = transactionObj.amount;
  transactionObj.currency = 'EUR';
  transactionObj.amount  = newAmountEUR;  

  Logger.log(transactionObj);  
  
}

function getVariableSymbolsRows(){

  
  var tstData = [2, 3, 4];
  return tstData;
}

function writeDownTransactionsToBankInfo(transactionDictionary){
  var bankSheetRange = getActiveRange('money info');
  if(bankSheetRange == null) { return; } //No info to be processed

  var bankSheetData = bankSheetRange.getValues();
  //First row is header;
  for(var i = 1; i < bankSheetData.length; ++i){

    var bankData = bankSheetData[i];

    var manOverride = bankData[2];
    if(manOverride) { continue; }

    var varSymbol = bankData[1];
    if(!transactionDictionary.hasOwnProperty(varSymbol)){ continue; }

    var transactionsForVarSymbol = transactionDictionary[varSymbol];
    for(var j = 0; j < transactionsForVarSymbol.length; ++j){

      var currTransaction = transactionsForVarSymbol[j];
      writeDownTransactionToBankInfo(currTransaction, bankSheetRange, i);

    }
  }
}

function writeDownTransactionToBankInfo(transactionObj, bankSheetRange, rowIndexInRange){

  var sheet = bankSheetRange.getSheet();
  var values = bankSheetRange.getValues()[rowIndexInRange];
  
  var userEmail = values[3];
  var userLanguage = values[4];

  if(transactionObj.currency == 'CZK'){
    var finalPriceIndex = 5;
    var alreadyPaidIndex = 7
    var paidDepositIndex = 9;
    var paidEverythingIndex = 10;
    var depositIndex = 11;
  } 
  else if(transactionObj.currency == 'EUR'){
    var finalPriceIndex = 6;
    var alreadyPaidIndex = 8;
    var paidDepositIndex = 9;
    var paidEverythingIndex = 10;
    var depositIndex = 12;
  }
  else {

    logNeedsAttention(['Someone paid in non-supportd currency.', transactionObj.currency, transactionObj.amount], userEmail, transactionObj.variableSymbol);
    sheet.getRange(rowIndexInRange + 1, 3).setValue(true);  
    return;

  }

  var values = bankSheetRange.getValues()[rowIndexInRange];

  var alreadyPaid = reliableToInt(values[alreadyPaidIndex]);
  var finalPrice = reliableToInt(values[finalPriceIndex]);
  var deposit = reliableToInt(values[depositIndex]);

  var alreadyPaidNew = alreadyPaid + transactionObj.amount;
  sheet.getRange(rowIndexInRange + 1, alreadyPaidIndex + 1).setValue(alreadyPaidNew);

  var paidDeposit = (alreadyPaidNew >= deposit);
  var paidEverything = (alreadyPaidNew >= finalPrice);

  var paidDepositBefore = values[paidDepositIndex];
  var paidEverythingBefore = values[paidEverythingIndex];

  var variablesObject = {
    'varSymbol' : transactionObj.variableSymbol,
    'alreadyPaidOld' : alreadyPaid,
    'alreadyPaidNew' : alreadyPaidNew,
    'deposit' : deposit,
    'currency' : transactionObj.currency,
    'finalPrice' : finalPrice,
    'leftToBePaid' : finalPrice - alreadyPaidNew,
  }

  var emailTemplate = null;

  if(paidEverything && !paidEverythingBefore){
    sheet.getRange(rowIndexInRange + 1, paidEverythingIndex + 1).setValue(true);  
    emailTemplate = getPaidEverythingtEmail(userLanguage);
  }
  else if(paidDeposit && !paidDepositBefore){
    sheet.getRange(rowIndexInRange + 1, paidDepositIndex + 1).setValue(true);  
    emailTemplate = getPaidDepositEmail(userLanguage);
  }
  else if(!paidDeposit){
    emailTemplate = getNotYetDepositEmail(userLanguage);
  }
  else {
    emailTemplate = getNotYetEverythingEmail(userLanguage);
  }

  bankLog(["New payment:"].concat(objectValuesToArray(variablesObject)));
  var templatedData = fillInTemplate(emailTemplate.text, variablesObject);

  var subject = emailTemplate.subject;

  sendEmail(userEmail, subject, templatedData, undefined);
}

function onGetBankingDataTick(){
  var data = getNewDataFromBank();
  var transactionsRaw = data.accountStatement.transactionList.transaction;
  var transactionsDictionary = extactTransactions(transactionsRaw);
  
  writeDownTransactionsToBankInfo(transactionsDictionary);
}


function testBankAccess(){

  var data = getTestingDataFromBank();
  var transactionsRaw = data.accountStatement.transactionList.transaction;
  var transactionsDictionary = extactTransactions(transactionsRaw);
  bankLog(transactionsDictionary)

}

function testBankWriteDown(){
  var transactionDictionary = {"0":[
    {"transferId":10810816122,"date":"2016-07-25+0200","amount":270,"currency":"CZK","accountNumber":"250759191","variableSymbol":"0"},
    {"transferId":10810885551,"date":"2016-07-25+0200","amount":220,"currency":"CZK","accountNumber":"35-4901320237","variableSymbol":"0"},
    {"transferId":10810887096,"date":"2016-07-25+0200","amount":220,"currency":"CZK","accountNumber":"43-6614030287","variableSymbol":"0"},
    {"transferId":10824264139,"date":"2016-08-23+0200","amount":440,"currency":"CZK","accountNumber":"43-5055990227","variableSymbol":"0"},
    {"transferId":10824269003,"date":"2016-08-23+0200","amount":220,"currency":"CZK","accountNumber":"107-3120930257","variableSymbol":"0"},
    {"transferId":10824755392,"date":"2016-08-24+0200","amount":220,"currency":"CZK","accountNumber":"224099476","variableSymbol":"0"},
    {"transferId":11331170097,"date":"2016-09-07+0200","amount":500,"currency":"CZK","accountNumber":"107431492","variableSymbol":"0"}],
    "0093816071":[{"transferId":10821625937,"date":"2016-08-16+0200","amount":-349,"currency":"CZK","accountNumber":"2300203634","variableSymbol":"0093816071"}],
    "905806":[{"transferId":10822317506,"date":"2016-08-18+0200","amount":220,"currency":"CZK","accountNumber":"670100-2212691412","variableSymbol":"905806"}],
    "12345":[{"transferId":10824880789,"date":"2016-08-24+0200","amount":220,"currency":"CZK","accountNumber":"2800394860","variableSymbol":"12345"}],
    "24681012":[{"transferId":11331260158,"date":"2016-09-07+0200","amount":2000,"currency":"CZK","accountNumber":"1015593472","variableSymbol":"24681012"}],
    
    //The last one is used for testing
    "1441690989":[{"transferId":11331926089,"date":"2016-09-08+0200","amount":40,"currency":"CZK","accountNumber":"2300203634","variableSymbol":"1441690989"}]}
  writeDownTransactionsToBankInfo(transactionDictionary);
}