function onFormSubmit(formSubmitObj) {
  Logger.log('On form submited fired.')

  var formID = getFormID(formSubmitObj);
  Logger.log('Form id is:' + formID)

  if(formID != 'ERR'){
    //TODO: Do error handling
  }

  workOnSendingEmail(formSubmitObj, formID);
  
}

function workOnSendingEmail(formSubmitObj, formID) {

  var translationConfig = getTranslationConfig(formID);
  var priceConfig = getPriceConfig();

  var batchesInfo = getBatchesInfo(formSubmitObj, translationConfig);
  var priceAccomodInfo = getAccomodationPrice(batchesInfo, priceConfig);
  var priceInsuranceInfo = getInsurancePrice(batchesInfo, priceConfig);
  var priceTransportInfo = getTransportPrice(batchesInfo, formSubmitObj, priceConfig, translationConfig);
  var priceTShirtInfo = getTShirtPrice(formSubmitObj, priceConfig, translationConfig );

  var userEmailAddress = getEmailAddress(formSubmitObj, translationConfig);


  Logger.log(batchesInfo);
  Logger.log(priceAccomodInfo);
  Logger.log(priceInsuranceInfo);
  Logger.log(priceTransportInfo);
  Logger.log(userEmailAddress);
  Logger.log(priceTShirtInfo);

  var summaryVars = getConfirmationSummary(batchesInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, priceConfig);
  Logger.log(summaryVars);

  sendEmailConfirmation(summaryVars, userEmailAddress, formID);
}

function getAnswerFromSubmitObj(formSubmitObj, questionTranslationConfig){
  var titleTranslation = questionTranslationConfig['Title'];
  var answerFromFormSubmit = formSubmitObj.namedValues[titleTranslation][0];

  return answerFromFormSubmit;
}

function getAnswerIdFromSubmitObj(formSubmitObj, questionTranslationConfig){
  var answerFromSubmit = getAnswerFromSubmitObj(formSubmitObj, questionTranslationConfig);
  var answerId = questionTranslationConfig['Answers'][answerFromSubmit];

  return answerId;
}

function getBatchesInfo(formSubmitObj, translationConfig){
  var batchesConfig = getBatchesConfig();

  var rawResponse = getAnswerFromSubmitObj(formSubmitObj, translationConfig['BatchesQuestion']);
  var hrString = rawResponse;
 
  var responses = rawResponse.split(", ");
  var batchesInfo = [];

  //Translates batch answers to batch ids
  var answersTranslation = translationConfig['BatchesQuestion']['Answers'];
  for (var i = 0; i < responses.length; ++i) {
    var batchIndex = answersTranslation[responses[i]];
    var batchInfo = batchesConfig[batchIndex];

    if(batchInfo == null) {/*TODO: Do error handling*/}
    else { batchesInfo.push(batchInfo); }   
  }

  //Figures out individual uninterupted batch segments
  var lastBatchId = -1;
  var numberOfBatches = 0;
  var batchSegments = [];
  for(var i = 0; i < batchesInfo.length; ++i){

    //If there was a gap between two batches
    if(batchesInfo[i]['Id'] - lastBatchId > 1){
      batchSegments.push([]);
    }

    var lastBatchSegment = batchSegments[batchSegments.length-1];
    lastBatchSegment.push(batchesInfo[i]);
    lastBatchId = batchesInfo[i]['Id'];

    ++numberOfBatches;
  }

  return {
    'batchSegments' : batchSegments,
    'numberOfBatches' : numberOfBatches,
    'hrString' : hrString,
    'manualOverrideReq' : false,
  }

}

function getAccomodationPrice(batchesInfo, priceConfig){
  var numberOfBatches = batchesInfo.numberOfBatches;

  var priceCZK = priceConfig['AccomodFirstBatchCZK'] + (numberOfBatches - 1) * priceConfig['AccomodNextBatchesCZK'];
  var priceEUR = priceConfig['AccomodFirstBatchEUR'] + (numberOfBatches - 1) * priceConfig['AccomodNextBatchesEUR'];

  return {
    'priceEUR' : priceEUR,
    'priceCZK' : priceCZK,
    'manualOverrideReq' : false,
  };
}

function getInsurancePrice(batchesInfo, priceConfig){
  var batchSegments = batchesInfo.batchSegments;
  var daysUnderInsurance = 0;

  var fromToString = [];

  for(var i = 0; i < batchSegments.length; ++i){
    var currSegment = batchSegments[i];
    var hrCurrSegment = '';

    var inAlbaniaStarts = currSegment[0]['Starts'];
    var inAlbaniaEnds = currSegment[currSegment.length - 1]['Ends'];

    var insuranceStarts = addDays(inAlbaniaStarts, -priceConfig['InsuranceDaysForTransport']);
    var insuranceEnds = addDays(inAlbaniaEnds, priceConfig['InsuranceDaysForTransport']);
    
    daysUnderInsurance += dayDiff(insuranceStarts, insuranceEnds);
    fromToString.push(dateTimeToLimitedString(insuranceStarts) + '->' + dateTimeToLimitedString(insuranceEnds));
  }

  var priceCZK = priceConfig['InsurancePerDayCZK'] * daysUnderInsurance;
  var priceEUR = priceConfig['InsurancePerDayEUR'] * daysUnderInsurance;

  var hrFromTo = fromToString.join(', ');
  return {
    'priceEUR' : priceEUR,
    'priceCZK' : priceCZK,
    'hrFromTo' : hrFromTo,
    'manualOverrideReq' : false,
  };
}

function getTransportPrice(batchesInfo, formSubmitObj, priceConfig, translationConfig){
  var manualOverrideReq = false;
  var numberOfTransports = batchesInfo.batchSegments.length;

  var typeIndex = getAnswerIdFromSubmitObj(formSubmitObj, translationConfig['TransportTypeQuestions']);

  var priceIndex = null;

  if(typeIndex == -1){
    priceIndex = getAnswerIdFromSubmitObj(formSubmitObj, translationConfig['TransportQualityQuestions']);
    //Assume that quantity is applicable only when quality is applicable
    var quantityCoef = getAnswerIdFromSubmitObj(formSubmitObj, translationConfig['TransportQuantityQuestions']);


    /*
      1 -> Price for transport is computed normally
      0 -> Charged only half of one transport price (no matter how many batch segments there are (e.g. when user goes to 1. and 5. batch))
     -1 -> Not charged anything in the system, manual override required
    */
    if(quantityCoef == 0) {numberOfTransports = 0.5;}
    else if(quantityCoef == -1) {numberOfTransports = 0; manualOverrideReq = true;}

  } else {
    priceIndex = typeIndex;
  }

  var transportPrice = priceConfig['TransportPrice'][priceIndex];

  return {
    'priceEUR' : transportPrice['EUR'] * numberOfTransports,
    'priceCZK' : transportPrice['CZK'] * numberOfTransports, 
    'manualOverrideReq' : manualOverrideReq,
  };
}

function getEmailAddress(formSubmitObj, translationConfig){
  var email = getAnswerFromSubmitObj(formSubmitObj, translationConfig['Email']);
  return email;
}

function getTShirtPrice(formSubmitObj, priceConfig, translationConfig){

  var tshirtIndex = getAnswerIdFromSubmitObj(formSubmitObj, translationConfig['TShirtQuestions']);

  var size = null;
  var type = null;
  var hrString = '-';
  var priceCZK = 0;
  var priceEUR = 0;

  if(tshirtIndex == 1){
    priceCZK = priceConfig['TShirtPriceCZK'];
    priceEUR = priceConfig['TShirtPriceEUR'];

    size = getAnswerFromSubmitObj(formSubmitObj, translationConfig['TShirtSize']);
    type = getAnswerFromSubmitObj(formSubmitObj, translationConfig['TShirtType']);

    hrString = size + " - " + type;
  }

  return {
    "priceEUR" : priceEUR,
    "priceCZK" : priceCZK,
    "size" : size,
    "type" : type,
    "hrString" : hrString,
    "manualOverrideReq":false,
  };
  
}

function getConfirmationSummary(batchesInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, priceTShirtInfo, priceConfig){
    var finalPriceCZK = priceAccomodInfo.priceCZK + priceTransportInfo.priceCZK + priceInsuranceInfo.priceCZK;
    var finalPriceEUR = priceAccomodInfo.priceEUR + priceTransportInfo.priceEUR + priceInsuranceInfo.priceEUR

    Logger.log(priceTShirtInfo);

    var confirmationTemplateVars = {
    "stringBatches" : batchesInfo.hrString,
    "priceFinalCZK" : finalPriceCZK,
    "priceFinalEUR" : finalPriceEUR,
    "priceAccommodCZK" : priceAccomodInfo.priceCZK,
    "priceAccommodEUR" : priceAccomodInfo.priceEUR,
    "priceTransportCZK" : priceTransportInfo.priceCZK,
    "priceTransportEUR" : priceTransportInfo.priceEUR,
    "priceInsuranceCZK" : priceInsuranceInfo.priceCZK,
    "priceInsuranceEUR" : priceInsuranceInfo.priceEUR,
    "dateInsuranceHR" : priceInsuranceInfo.hrFromTo,
    "priceTShirtCZK" : priceTShirtInfo.priceCZK,
    "priceTShirtEUR" : priceTShirtInfo.priceEUR,
    "typeTShirt" : priceTShirtInfo.hrString,
    "priceDepositCZK" : 0,
    "priceDepositEUR" : 0,
    "priceRestCZK" : 0,
    "priceRestEUR" : 0,
    "varSymbol": ''
  };

  return confirmationTemplateVars;
}



function sendEmailConfirmation(summaryVars, userEmailAddress, formID){

  var template = getConfirmationEmailTemplate(formID);
  var templatedData = fillInTemplate(template, summaryVars);
  
  var subject = "";

  sendEmail(userEmailAddress, subject, templatedData);
}