function productionLog(logSheetName, message){
    var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    var logSheet = currSpreadsheet.getSheetByName(logSheetName);
    if(logSheet == null) {
        logSheet = currSpreadsheet.insertSheet(logSheetName);
    }

    var timestampString = dateTimeToFullString(new Date());

    if(Array.isArray(message)){
      message = message.map(function(obj) { if(typeof obj !== 'string') {return JSON.stringify(obj);} else { return obj; }});
      message.unshift(timestampString);
    } else {
      if(typeof message !== 'string') { message = JSON.stringify(message);}
      message = [timestampString, message];
    }

    logSheet.appendRow(message);
}
