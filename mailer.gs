function fillInTemplate(template, data){
  var templateVars = template.match(/#[A-Za-z]+/g);
  var templatedString = template;

  for(var i = 0; i < templateVars.length; ++i){
    var variableData = data[templateVars[i].substring(1)].toString();
    templatedString = templatedString.replace(templateVars[i], variableData || "#ERROR");
  }

  return templatedString;
}

function sendEmail(recipient, subject, body, bcc){

  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);


  var mailObject = {
      to: recipient,
      subject: subject,
      body: body
  }

  if (typeof bcc !== 'undefined') { mailObject['bcc'] = bcc; }
  //TODO: Some form of queing & resending

  MailApp.sendEmail(mailObject);
}
