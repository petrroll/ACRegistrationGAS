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

  var userEmailAddress = getEmailAddress(formSubmitObj, translationConfig);


  Logger.log(batchesInfo);
  Logger.log(priceAccomodInfo);
  Logger.log(priceInsuranceInfo);
  Logger.log(priceTransportInfo);
  Logger.log(userEmailAddress);

  sendEmailConfirmation(batchesInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, userEmailAddress, formID);
}

function getBatchesInfo(formSubmitObj, translationConfig){
  var batchesConfig = getBatchesConfig();
  var batchesTranslation = translationConfig['BatchesQuestion'];

  var rawResponse = formSubmitObj.namedValues[batchesTranslation['Title']];
  var hrString = rawResponse;
 
  var responses = rawResponse[0].split(", ");
  var batchesInfo = [];

  //Translates batch answers to batch ids
  var answersTranslation = batchesTranslation['Answers'];
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

  var typeAnswer = formSubmitObj.namedValues[translationConfig['TransportTypeQuestions']['Title']];
  var typeIndex = translationConfig['TransportTypeQuestions']['Answers'][typeAnswer];

  var priceIndex = null;

  if(typeIndex == -1){
    var qualityAnswer = formSubmitObj.namedValues[translationConfig['TransportQualityQuestions']['Title']];
    priceIndex = translationConfig['TransportQualityQuestions']['Answers'][qualityAnswer];

    //Assume that quantity is applicable only when quality is applicable
    var quantityAnswer = formSubmitObj.namedValues[translationConfig['TransportQuantityQuestions']['Title']];
    var quantityCoef = translationConfig['TransportQuantityQuestions']['Answers'][quantityAnswer];

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
  var email = formSubmitObj.namedValues[translationConfig['Email']['Title']][0];

  return email;
}



function sendEmailConfirmation(batchesInfo, priceAccomodInfo, priceInsuranceInfo, priceTransportInfo, userEmailAddress, formID){
  var template = getConfirmationEmailTemplate(formID);

  var confirmationTemplateVars = {
    "stringBatches" : batchesInfo.hrString,
    "priceFinalCZK" : (priceAccomodInfo.priceCZK + priceTransportInfo.priceCZK + priceInsuranceInfo.priceCZK),
    "priceFinalEUR" : (priceAccomodInfo.priceEUR + priceTransportInfo.priceEUR + priceInsuranceInfo.priceEUR),
    "priceAccommodCZK" : priceAccomodInfo.priceCZK,
    "priceAccommodEUR" : priceAccomodInfo.priceEUR,
    "priceTransportCZK" : priceTransportInfo.priceCZK,
    "priceTransportEUR" : priceTransportInfo.priceEUR,
    "priceInsuranceCZK" : priceInsuranceInfo.priceCZK,
    "priceInsuranceEUR" : priceInsuranceInfo.priceEUR,
    "dateInsuranceHR" : priceInsuranceInfo.hrFromTo,
    "priceTShirtCZK" : 0,
    "priceTShirtEUR €" : 0,
    "sizeTShirt" : '',
    "priceDepositCZK" : 0,
    "priceDepositEUR" : 0,
    "priceRestCZK" : 0,
    "priceRestEUR" : 0,
    "varSymbol": ''
  };

  var subject = "";
  var templatedData = fillInTemplate(template, confirmationTemplateVars);
  sendEmail(userEmailAddress, subject, templatedData);


}