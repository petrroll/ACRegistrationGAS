function onOpenAddUI() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('AC system')
      .addItem('User paid', 'userPaidFunctionUI')
      .addToUi();
}

function userPaidFunctionUI(){
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
      'Enter information about payment',
      'Please user id, amount paid, and currency (CZK or EUR); all separated with ";".\n E.g.: "9510234298;CZK;2000"',
      ui.ButtonSet.OK);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  
  if (button == ui.Button.CLOSE) {
    return;
  }
  
  var matches = text.match(/^([0-9]{10});((CZK)|(EUR));([0-9]+)$/);
  if(matches.length != 6){
    ui.alert("Incorrect format :(.");
    return;
  }
  
  var varSymbol = matches[1];
  var transactionObj = {
    'currency' : matches[2],
    'amount' : matches[5],
  }
  
  runtimeLog(varSymbol);
  runtimeLog(transactionObj);
  updateBankInfoWithTransactionObj(varSymbol, transactionObj);
  
}

function updateBankInfoWithTransactionObj(varSymbol, transactionObj){
  var sheetName = 'money info';
  var searchIndex = 1;
  var searchValue = varSymbol;
  
  var rowInfo = findRowIndexAndRangeInSheet(sheetName, searchValue, searchIndex); runtimeLog(rowInfo);
  if(rowInfo == null) {return;}
  
  writeDownTransactionToBankInfo(transactionObj, rowInfo.range, rowInfo.indexInRange);
}

