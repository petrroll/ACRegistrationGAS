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
  insertComumnIfDoesNotExist('id/var. symbol', sheet, 2);
}

function workOnSendingConfirmationEmail(formSubmitObj, formID) {

  var translationConfig = getTranslationConfig(formID);
  var priceConfig = getPriceConfig();

  var formData = getFormData(formSubmitObj, translationConfig); runtimeLog(formData);
  var batchSegmentsInfo = getBatchSegmentsInfo(formData); runtimeLog(batchSegmentsInfo);

  var priceAccomodInfo = getAccomodationPrice(batchSegmentsInfo, priceConfig); runtimeLog(priceAccomodInfo);
  var priceInsuranceInfo = getInsurancePrice(batchSegmentsInfo, priceConfig, formData); runtimeLog(priceInsuranceInfo);
  var priceTransportInfo = getTransportPrice(batchSegmentsInfo, formData, priceConfig); runtimeLog(priceTransportInfo);
  var priceTShirtInfo = getTShirtPrice(formData, priceConfig); runtimeLog(priceTShirtInfo);

  var userEmailAddress = formData.email.value; runtimeLog(userEmailAddress);
  var variableSymbol = getVarriableSymbol(formData); runtimeLog(variableSymbol);

  var summaryVars = getConfirmationSummary(batchSegmentsInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, variableSymbol, priceConfig);
  logSummaryData(summaryVars); runtimeLog(summaryVars);

  storeNewRelevantDataToOriginalSheet(formSubmitObj.range, summaryVars);
  saveBankImportantData(summaryVars, userEmailAddress, formID);

  handleManualOverride(batchSegmentsInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, variableSymbol, userEmailAddress);
  sendEmailConfirmation(summaryVars, userEmailAddress, formID);
}

function storeNewRelevantDataToOriginalSheet(currRange, summaryVars){
  //saves id or variable symbol
  addDataToCurrentRow(currRange, 2, summaryVars.varSymbol);
}

function logSummaryData(summaryVars) {
  var logSummaryDataSheetName = 'summaryLog';

  var userDataHeader = objectKeysToArray(summaryVars);
  userDataHeader.unshift('timestamp');

  createSheetIfDoesntExist(logSummaryDataSheetName, userDataHeader);
  sheetLog(logSummaryDataSheetName, objectValuesToArray(summaryVars));
}

function getVarriableSymbol(formData) {
  var birthDate = formData['birthDayInfo'].value;
  var email = formData['email'].value;

  var uniqueString = birthDate + email;
  return getStringHashCode(uniqueString);
}

function getBatchSegmentsInfo(formData) {

  var batches = formData['batches'];
  var batchesInfo = getInfoFromIndexes(getBatchesConfig(), batches.value, 'batches');

  //Figures out individual uninterupted batch segments
  var lastBatchId = -1;
  var numberOfBatches = 0;
  var batchSegments = [];
  for (var i = 0; i < batchesInfo.length; ++i) {

    //If there was a gap between two batches
    if (batchesInfo[i]['id'] - lastBatchId > 1) { batchSegments.push([]); }

    var lastBatchSegment = batchSegments[batchSegments.length - 1];
    lastBatchSegment.push(batchesInfo[i]);
    lastBatchId = batchesInfo[i]['id'];

    ++numberOfBatches;
  }

  return {
    'batchSegments': batchSegments,
    'numberOfBatches': numberOfBatches,
    'hrString': batches.originalValue,
    'manualOverrideReq': false,
  }

}

function getAccomodationPrice(batchesInfo, priceConfig) {
  var numberOfBatches = batchesInfo.numberOfBatches;

  var priceCZK = priceConfig['AccomodFirstBatchCZK'] + (numberOfBatches - 1) * priceConfig['AccomodNextBatchesCZK'];
  var priceEUR = priceConfig['AccomodFirstBatchEUR'] + (numberOfBatches - 1) * priceConfig['AccomodNextBatchesEUR'];

  return {
    'priceEUR': priceEUR,
    'priceCZK': priceCZK,
    'manualOverrideReq': false,
  };
}

function getInsurancePrice(batchesInfo, priceConfig, formData) {

  if(!formData.insurance.value){
    return {
      'priceEUR': 0,
      'priceCZK': 0,
      'hrFromTo': '-',
      'manualOverrideReq': false,
    };
  }


  var batchSegments = batchesInfo.batchSegments;
  var daysUnderInsurance = 0;

  var fromToString = [];

  for (var i = 0; i < batchSegments.length; ++i) {
    var currSegment = batchSegments[i];
    var hrCurrSegment = '';

    var inAlbaniaStarts = currSegment[0]['starts'];
    var inAlbaniaEnds = currSegment[currSegment.length - 1]['ends'];

    var insuranceStarts = addDays(inAlbaniaStarts, -priceConfig['InsuranceDaysForTransport']);
    var insuranceEnds = addDays(inAlbaniaEnds, priceConfig['InsuranceDaysForTransport']);

    daysUnderInsurance += dayDiff(insuranceStarts, insuranceEnds);
    fromToString.push(dateTimeToLimitedString(insuranceStarts) + '->' + dateTimeToLimitedString(insuranceEnds));
  }

  var priceCZK = priceConfig['InsurancePerDayCZK'] * daysUnderInsurance;
  var priceEUR = priceConfig['InsurancePerDayEUR'] * daysUnderInsurance;

  var hrFromTo = fromToString.join(', ');
  return {
    'priceEUR': priceEUR,
    'priceCZK': priceCZK,
    'hrFromTo': hrFromTo,
    'manualOverrideReq': false,
  };
}

function getTransportPrice(batchesInfo, formData, priceConfig) {
  var manualOverrideReq = false;
  var numberOfTransports = batchesInfo.batchSegments.length;

  var typeIndex = formData['transportType'].value;
  var priceIndex = null;

  if (typeIndex == -1) {
    priceIndex = formData['transportQuality'].value;
    var quantityCoef = formData['transportQuantity'].value; //Assume that quantity is applicable only when quality is applicable

    /*
      1 -> Price for transport is computed normally
      0 -> Charged only half of one transport price (no matter how many batch segments there are (e.g. when user goes to 1. and 5. batch))
     -1 -> Not charged anything in the system, manual override required
    */
    if (quantityCoef == 0) { numberOfTransports = 0.5; }
    else if (quantityCoef == -1) { numberOfTransports = 0; manualOverrideReq = true; }

  } else {
    priceIndex = typeIndex;
  }

  var transportPrice = priceConfig['TransportPrice'][priceIndex];

  return {
    'priceEUR': transportPrice['EUR'] * numberOfTransports,
    'priceCZK': transportPrice['CZK'] * numberOfTransports,
    'manualOverrideReq': manualOverrideReq,
  };
}

function getTShirtPrice(formData, priceConfig) {

  var tshirtIndex = formData['tshirtWant'].value;

  var size = null;
  var type = null;
  var hrString = '-';
  var priceCZK = 0;
  var priceEUR = 0;

  if (tshirtIndex == 1) {
    priceCZK = priceConfig['TShirtPriceCZK'];
    priceEUR = priceConfig['TShirtPriceEUR'];

    size = formData['tshirtSize'].value;
    type = formData['tshirtType'].value;

    hrString = size + " - " + type;
  }

  return {
    "priceEUR": priceEUR,
    "priceCZK": priceCZK,
    "size": size,
    "type": type,
    "hrString": hrString,
    "manualOverrideReq": false,
  };

}

function getConfirmationSummary(batchesInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, variableSymbol, priceConfig) {
  var finalPriceCZK = priceAccomodInfo.priceCZK + priceTransportInfo.priceCZK + priceInsuranceInfo.priceCZK;
  var finalPriceEUR = priceAccomodInfo.priceEUR + priceTransportInfo.priceEUR + priceInsuranceInfo.priceEUR

  var depositCZK = priceConfig['DepositCZK'];
  var depositEUR = priceConfig['DepositEUR'];

  var confirmationTemplateVars = {
    "stringBatches": batchesInfo.hrString,
    "priceFinalCZK": finalPriceCZK,
    "priceFinalEUR": finalPriceEUR,
    "priceAccommodCZK": priceAccomodInfo.priceCZK,
    "priceAccommodEUR": priceAccomodInfo.priceEUR,
    "priceTransportCZK": priceTransportInfo.priceCZK,
    "priceTransportEUR": priceTransportInfo.priceEUR,
    "priceInsuranceCZK": priceInsuranceInfo.priceCZK,
    "priceInsuranceEUR": priceInsuranceInfo.priceEUR,
    "dateInsuranceHR": priceInsuranceInfo.hrFromTo,
    "priceTShirtCZK": priceTShirtInfo.priceCZK,
    "priceTShirtEUR": priceTShirtInfo.priceEUR,
    "typeTShirt": priceTShirtInfo.hrString,
    "priceDepositCZK": depositCZK,
    "priceDepositEUR": depositEUR,
    "priceRestCZK": finalPriceCZK - depositCZK,
    "priceRestEUR": finalPriceEUR - depositEUR,
    "varSymbol": variableSymbol
  };

  return confirmationTemplateVars;
}

function handleManualOverride(batchesInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, variableSymbol, email) {

  if(priceTransportInfo.manualOverrideReq){
    logNeedsAttention(['Non-traditional transport (price not computed automatically), please email user.'], email, variableSymbol);
  }
}

function saveBankImportantData(summaryVars, email, formId) {
  var moneyInfoSheetName = 'money info';

  var userDataHeader = ['timestamp', 'id', 'manual override', 'email', 'language', 'final price CZK', 'final price EUR', 'paid CZK', 'paid EUR', 'paid deposit', 'paid everything', 'deposit CZK', 'deposit EUR'];
  createSheetIfDoesntExist(moneyInfoSheetName, userDataHeader);

  var moneyInfo = {
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

  }
  sheetLog(moneyInfoSheetName, objectValuesToArray(moneyInfo));
}



function sendEmailConfirmation(summaryVars, userEmailAddress, formID) {

  var template = getConfirmationEmailTemplate(formID);
  var templatedData = fillInTemplate(template.text, summaryVars);

  var subject = template.subject;

  sendEmail(userEmailAddress, subject, templatedData, undefined);
}
