function onFormSubmit(formSubmitObj) {
  runtimeLog('On form submited fired.')

  var formID = getFormID(formSubmitObj);
  runtimeLog('Form id is:' + formID)

  if (formID == 'err') {
    sheetLog('errorLog', ['Form id unkwnon:', formID]);
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
  var priceInsuranceInfo = getInsurancePrice(batchSegmentsInfo, priceConfig); runtimeLog(priceInsuranceInfo);
  var priceTransportInfo = getTransportPrice(batchSegmentsInfo, formData, priceConfig); runtimeLog(priceTransportInfo);
  var priceTShirtInfo = getTShirtPrice(formData, priceConfig); runtimeLog(priceTShirtInfo);

  var userEmailAddress = formData.email.value; runtimeLog(userEmailAddress);
  var variableSymbol = getVarriableSymbol(formData); runtimeLog(variableSymbol);

  var summaryVars = getConfirmationSummary(batchSegmentsInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, variableSymbol, priceConfig);
  logSummaryData(summaryVars); runtimeLog(summaryVars);

  addDataToAddedRow(formSubmitObj.range, 2, summaryVars.varSymbol);
  sendEmailConfirmation(summaryVars, userEmailAddress, formID);
}

function logSummaryData(summaryVars) {
  var userDataHeader = objectKeysToArray(summaryVars);
  userDataHeader.unshift('timestamp');

  createSheetIfDoesntExist('userData', userDataHeader);
  sheetLog('userData', objectValuesToArray(summaryVars));
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

function getInsurancePrice(batchesInfo, priceConfig) {
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



function sendEmailConfirmation(summaryVars, userEmailAddress, formID) {

  var template = getConfirmationEmailTemplate(formID);
  var templatedData = fillInTemplate(template, summaryVars);

  var subject = "";

  sendEmail(userEmailAddress, subject, templatedData, undefined);
}

////
// Logger
//
function runtimeLog(obj) {
  Logger.log(obj);
}

function sheetLog(logSheetName, message) {

  var logSheet = createSheetIfDoesntExist(logSheetName, undefined);
  var timestamp = new Date();

  if (Array.isArray(message)) {
    message = message.map(function (obj) { if (typeof obj !== 'string') { return JSON.stringify(obj); } else { return obj; } });
    message.unshift(timestamp);
  } else {
    if (typeof message !== 'string') { message = JSON.stringify(message); }
    message = [timestamp, message];
  }

  logSheet.appendRow(message);
}
//
// End Logger
////


////
// Sheet manipulating functions
//
function createSheetIfDoesntExist(sheetName, header) {

  var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = currSpreadsheet.getSheetByName(sheetName);
  if (sheet == null) {
    sheet = currSpreadsheet.insertSheet(sheetName);
    if (typeof header !== 'undefined') { sheet.appendRow(header); }
  }

  return sheet;
}

function insertComumnIfDoesNotExist(columnHeader, sheet, indexBefore) {

  var headerCellValue = sheet.getRange(1, indexBefore).getValue();
  if (headerCellValue != 'formSubmitRange') {
    sheet.insertColumnBefore(indexBefore);
  }

  sheet.getRange(1, indexBefore).setValue(columnHeader);
}

function addDataToAddedRow(range, columnIndex, data) {
  var sheet = range.getSheet();
  var rowNumber = range.getRow();

  var cellObject = sheet.getRange(rowNumber, columnIndex);
  var originalValue = cellObject.getValue();
  if (originalValue !== '') { sheetLog('errorLog', ['Cell for id was not empty:', originalValue]); runtimeLog(originalValue); }

  cellObject.setValue(data);
}
//
// End Sheet manipulating functions
////

////
// Mailer:
//
function fillInTemplate(template, data) {
  var templateVars = template.match(/#[A-Za-z]+/g);
  var templatedString = template;

  for (var i = 0; i < templateVars.length; ++i) {
    var variableData = data[templateVars[i].substring(1)].toString();
    templatedString = templatedString.replace(templateVars[i], variableData || "#ERROR");
  }

  return templatedString;
}

function sendEmail(recipient, subject, body, bcc) {

  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  runtimeLog("Remaining email quota: " + emailQuotaRemaining);


  var mailObject = {
    to: recipient,
    subject: subject,
    body: body
  }

  if (typeof bcc !== 'undefined') { mailObject['bcc'] = bcc; }
  //TODO: Some form of queing & resending

  MailApp.sendEmail(mailObject);
}
//
// End Mailer;
////

////
// Utils:
//
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function dayDiff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24)) + 1;
}

function getStringHashCode(stringToBeHashed) {
  var hash = 0;
  if (this.length == 0) return hash;
  for (var i = 0; i < stringToBeHashed.length; i++) {
    var char = stringToBeHashed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function objectValuesToArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key] });
}

function objectKeysToArray(obj) {
  return Object.keys(obj);
}

function dateTimeToFullString(date) {
  var now = date;
  var year = now.getFullYear().toString();
  var month = (now.getMonth() + 1).toString();
  var day = now.getDate().toString();
  var hour = now.getHours().toString();
  var minute = now.getMinutes().toString();
  var second = now.getSeconds().toString();

  if (month.length == 1) {
    month = '0' + month;
  }
  if (day.length == 1) {
    day = '0' + day;
  }
  if (hour.length == 1) {
    hour = '0' + hour;
  }
  if (minute.length == 1) {
    minute = '0' + minute;
  }
  if (second.length == 1) {
    second = '0' + second;
  }
  var dateTime = year + '/' + day + '/' + month + ' ' + hour + ':' + minute + ':' + second;
  return dateTime;
}

function dateTimeToLimitedString(date) {
  var now = date;
  var year = now.getFullYear().toString();
  var month = (now.getMonth() + 1).toString();
  var day = now.getDate().toString();

  if (month.length == 1) {
    month = '0' + month;
  }
  if (day.length == 1) {
    day = '0' + day;
  }

  var dateTime = day + '/' + month;
  return dateTime;
}
//
// End Utils;
////