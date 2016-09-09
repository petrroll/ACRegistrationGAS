function productionLog(logSheetName, message){
    var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    var logSheet = currSpreadsheet.getSheetByName(logSheetName);
    if(logSheet == null) {
        logSheet = currSpreadsheet.insertSheet(logSheetName);
    }

    var timestampString = dateTimeToFullString(new Date());

    if(Array.isArray(message)){
        message.unshift(timestampString);
    } else {
        message = [timestampString, message];
    }

    logSheet.appendRow(message);
}