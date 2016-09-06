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

  Logger.log(batchesInfo);
  Logger.log(priceAccomodInfo);
  Logger.log(priceInsuranceInfo);
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
  }

}

function getAccomodationPrice(batchesInfo, priceConfig){
  var numberOfBatches = batchesInfo.numberOfBatches;

  var priceCZK = priceConfig['AccomodFirstBatchCZK'] + (numberOfBatches - 1) * priceConfig['AccomodNextBatchesCZK'];
  var priceEUR = priceConfig['AccomodFirstBatchEUR'] + (numberOfBatches - 1) * priceConfig['AccomodNextBatchesEUR'];

  return {
    'priceEUR' : priceEUR,
    'priceCZK' : priceCZK,
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
  }
}