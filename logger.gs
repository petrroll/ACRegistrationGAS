function productionLog(message){
    var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    var logSheet = currSpreadsheet.getSheetByName("log");
    if(logSheet == null) {
        logSheet = currSpreadsheet.insertSheet("log");
    }

    var timestampString = getDateTime();

    if(Array.isArray(message)){
        message.unshift(timestampString);
    } else {
        message = [timestampString, message];
    }

    logSheet.appendRow(message);
}

 function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear().toString();
    var month   = (now.getMonth()+1).toString(); 
    var day     = now.getDate().toString();
    var hour    = now.getHours().toString();
    var minute  = now.getMinutes().toString();
    var second  = now.getSeconds().toString(); 

    if(month.length == 1) {
        month = '0'+month;
    }
    if(day.length == 1) {
        day = '0'+day;
    }   
    if(hour.length == 1) {
        hour = '0'+hour;
    }
    if(minute.length == 1) {
        minute = '0'+minute;
    }
    if(second.length == 1) {
        second = '0'+second;
    }   
    var dateTime = year+'/'+day+'/'+month+' '+hour+':'+minute+':'+second;   
     return dateTime;
}