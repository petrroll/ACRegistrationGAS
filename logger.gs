function createSheetIfDoesntExist(sheetName, header) {

    var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = currSpreadsheet.getSheetByName(sheetName);
    if(sheet == null) {
        sheet = currSpreadsheet.insertSheet(sheetName);
        if(typeof header !== 'undefined') { sheet.appendRow(header); }
    }

    return sheet;
}

function productionLog(logSheetName, message){
    
    var logSheet = createSheetIfDoesntExist(logSheetName, undefined);
    var timestamp = new Date();

    if(Array.isArray(message)){
      message = message.map(function(obj) { if(typeof obj !== 'string') {return JSON.stringify(obj);} else { return obj; }});
      message.unshift(timestamp);
    } else {
      if(typeof message !== 'string') { message = JSON.stringify(message);}
      message = [timestamp, message];
    }

    logSheet.appendRow(message);
}
