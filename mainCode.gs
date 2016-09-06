function onFormSubmit(formSubmitObj) {
  Logger.log('On form submited fired.')

  var config = getConfig();

  var formID = getFormID(formSubmitObj, config);
  Logger.log('Form id is:' + formID)

  if(formID != 'ERR'){
    //TODO: Do error handling
  }

  workOnSendingEmail(formSubmitObj, formID);
  
}

function getFormID(formSubmitObj, config){

  var formID = '';
  var eventsNamedValues = formSubmitObj.namedValues;
  
  if(eventsNamedValues.hasOwnProperty(config['FirstQuestionCZ'])){
    formID = 'CZ';
  }
  else if (eventsNamedValues.hasOwnProperty(config['FirstQuestionEN'])){
    formID = 'EN';
  }
  else {
    formID = 'ERR';
  }
  
  return formID;
}

function workOnSendingEmail(formSubmitObj, formID) {
  //Could do a switch statement but don't think it's neccessary now as I have only two form IDs
  var formConfig = (formID == 'CZ') ? getFormConfigCZ() : getFormConfigEN(); 
  var priceConfig = getPriceConfig();

  var batchesInfo = getBatchesInfo(formSubmitObj, formConfig);
  var priceAccomodInfo = getAccomodationPrice(batchesInfo, priceConfig);
  var priceInsuranceInfo = getInsurancePrice(batchesInfo, priceConfig);

  Logger.log(batchesInfo);
  Logger.log(priceAccomodInfo);
  Logger.log(priceInsuranceInfo);
}

function getBatchesInfo(formSubmitObj, formConfig){
  var batchesConfig = formConfig['BatchesQuestion'];

  var rawResponse = formSubmitObj.namedValues[batchesConfig['Title']];
  var hrString = rawResponse;
 
  var responses = rawResponse[0].split(", ");
  var batchesInfo = [];

  //Translates batch answers to batch ids
  var answersConfig = batchesConfig['Answers'];
  for (var i = 0; i < responses.length; ++i) {
    var batchInfo = answersConfig[responses[i]];

    if(batchInfo == null) {/*TODO: Do error handling*/}
    else { batchesInfo.push(batchInfo); }   
  }

  //Figures out individual uninterupted batch segments
  var lastBatchId = -1;
  var numberOfBatches = 0;
  var batchSegments = [];
  for(var i = 0; i < batchesInfo.length; ++i){

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