function productionLog(message){
    var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    var logSheet = currSpreadsheet.getSheetByName("log");
    if(logSheet == null) {
        logSheet = currSpreadsheet.insertSheet("log");
    }

    var timestampString = dateTimeToFullString(new Date());

    if(Array.isArray(message)){
        message.unshift(timestampString);
    } else {
        message = [timestampString, message];
    }

    logSheet.appendRow(message);
}