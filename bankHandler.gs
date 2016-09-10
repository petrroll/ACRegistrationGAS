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

function processTransactions(transactions){

  var transactionObjects = [];
  Logger.log('transactions' + transactions.length);
  for(var i = 0; i < transactions.length; ++i){

    var currTransaction = transactions[i];
    var processedTransaction = processTransaction(currTransaction);
    if(processedTransaction != null) {transactionObjects.push(processedTransaction);}

  }

  var fullTransactions = transactionObjects.filter(
    function(trans) {
      return (
        trans.hasOwnProperty('currency') &&
        trans.hasOwnProperty('accountNumber') &&
        trans.hasOwnProperty('date') &&
        trans.hasOwnProperty('variableSymbol') &&
        trans.hasOwnProperty('transferId') &&
        trans.hasOwnProperty('amount'))
    });

  return fullTransactions;
}

function processTransaction(transaction){

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

function testBankAccess(){
  var data = getTestingDataFromBank();
  var transactionData = data.accountStatement.transactionList.transaction;
  var processedTransactions = processTransactions(transactionData);
  bankLog(processedTransactions);
}