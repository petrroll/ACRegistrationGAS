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

  return transactionObject;
}

function writeDownTransactionsToBankInfo(transactionDictionary){

}

function testBankAccess(){
  var data = getTestingDataFromBank();
  var transactionsRaw = data.accountStatement.transactionList.transaction;
  var processedTransactions = extactTransactions(transactionsRaw);
  bankLog(processedTransactions);
}