function onFormSubmit(formSubmitObj) {
  runtimeLog('On form submited fired.')

  var formID = getFormID(formSubmitObj);
  runtimeLog('Form id is:' + formID)

  if (formID == 'err') {
    logError(['Form id unkwnon:', formID]);
    return;
  }

  prepareHeaderForId(formSubmitObj);
  workOnSendingConfirmationEmail(formSubmitObj, formID);

}

function getFormID(formSubmitObj) {
  var formIdConfig = getFormIdConfig();
  var configUniqueQuestion = formIdConfig['uniqueQuestionFormIdTest'];

  var formID = '';
  var eventsNamedValues = formSubmitObj.namedValues;

  if (eventsNamedValues.hasOwnProperty(configUniqueQuestion['cz'])) { formID = 'cz'; }
  else if (eventsNamedValues.hasOwnProperty(configUniqueQuestion['en'])) { formID = 'en'; }
  else { formID = 'err'; }

  return formID;
}


function prepareHeaderForId(formSubmitObj) {
  var sheet = formSubmitObj.range.getSheet();
  insertComumnIfDoesNotExist('id/var. symbol', sheet, 1);
}

function workOnSendingConfirmationEmail(formSubmitObj, formID) {

  var translationConfig = getTranslationConfig(formID);
  var priceConfig = getPriceConfig();

  var formData = getFormData(formSubmitObj, translationConfig); runtimeLog(formData);
  var ticketPriceInfo = getTicketPriceInfo(formData, priceConfig);

  var userEmailAddress = formData.email.value;
  var varSymbolId = getVarriableSymbol(formData);

  var summaryVars = {
    'priceFinalCZK' : ticketPriceInfo.priceCZK,
    'priceFinalEUR' : ticketPriceInfo.priceEUR,
    'priceDepositCZK' : ticketPriceInfo.priceCZK,
    'priceDepositEUR' : ticketPriceInfo.priceEUR,
    'varSymbol' : varSymbolId
  }

  storeNewRelevantDataToOriginalSheet(formSubmitObj.range, varSymbolId);
  
  saveBankImportantData(summaryVars, formData['firstName'].value + ' ' + formData['secondName'].value, userEmailAddress, formID, true);
  sendEmailConfirmation(summaryVars, userEmailAddress, formID, 'normal');
}

function getVarriableSymbol(formData) {
  var otherData = formData.numberOfTickets.toString();
  var email = formData.email.value;


  var uniqueString = '';
  var hashValue = 0;
  do{
    uniqueString += otherData + email;
    hashValue = getStringHashCode(uniqueString);

  }while(findRowIndexAndRangeInSheet("money info", hashValue, 1) != null)


  return hashValue;
}

function getTicketPriceInfo(formData, priceConfig){

  return {
    'priceCZK' : formData.numberOfTickets.value * priceConfig.OneTicketCZK, 
    'priceEUR' : formData.numberOfTickets.value * priceConfig.OneTicketEUR
  };

}

function storeNewRelevantDataToOriginalSheet(currRange, varSymbolId){
  //saves id or variable symbol
  addDataToCurrentRow(currRange, 1, varSymbolId);
}

function saveBankImportantData(summaryVars, name, email, formId, registrationValid) {
  var moneyInfoSheetName = 'money info';

  var userDataHeader = ['timestamp','name', 'id', 'manual override', 'email', 'language', 'final price CZK', 'final price EUR', 'paid CZK', 'paid EUR', 'paid deposit', 'paid everything', 'deposit CZK', 'deposit EUR', 'registration valid (not too old, ...)', 'other notes'];
  createSheetIfDoesntExist(moneyInfoSheetName, userDataHeader);

  var moneyInfo = {
    'name' : name,
    'id' : summaryVars.varSymbol,
    'manualOverrideReq' : false,
    'email' : email,
    'language' : formId,
    'finalPriceCZK' : summaryVars.priceFinalCZK,
    'finalPriceEUR' : summaryVars.priceFinalEUR,
    'paidCZK' : 0,
    'paidEUR' : 0,
    'paidDeposit' : false,
    'paidEverything' : false,
    'depositCZK' : summaryVars.priceDepositCZK,
    'depositEUR' : summaryVars.priceDepositEUR,
    'registrationValid' : registrationValid

  }
  sheetLog(moneyInfoSheetName, objectValuesToArray(moneyInfo));
}


function sendEmailConfirmation(summaryVars, userEmailAddress, formID, emailType) {

  var template = getConfirmationEmailTemplate(formID)[emailType];
  var templatedData = fillInTemplate(template.text, summaryVars);

  var subject = template.subject;

  sendEmail(userEmailAddress, subject, templatedData, undefined, true);
}
