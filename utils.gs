function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function dayDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24)) + 1;
}


 function dateTimeToFullString(date) {
    var now     = date; 
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

 function dateTimeToLimitedString(date) {
    var now     = date; 
    var year    = now.getFullYear().toString();
    var month   = (now.getMonth()+1).toString(); 
    var day     = now.getDate().toString();

    if(month.length == 1) {
        month = '0'+month;
    }
    if(day.length == 1) {
        day = '0'+day;
    }   
 
    var dateTime = day+'/'+month;   
    return dateTime;
}