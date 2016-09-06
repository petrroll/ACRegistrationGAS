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
  var batchIDs = [];

  //Translates batch answers to batch ids
  var answersConfig = batchesConfig['Answers'];
  for (var i = 0; i < responses.length; ++i) {
    var batchID = answersConfig[responses[i]];

    if(batchID == null) {/*TODO: Do error handling*/}
    else { batchIDs.push(batchID); }   
  }

  //Figures out individual uninterupted batch segments
  var lastBatchId = -1;
  var numberOfBatches = 0;
  var batchSegments = [];
  for(var i = 0; i < batchIDs.length; ++i){

    if(batchIDs[i] - lastBatchId > 1){
      batchSegments.push([]);
    }

    var lastBatchSegment = batchSegments[batchSegments.length-1];
    lastBatchSegment.push(batchIDs[i]);
    lastBatchId = batchIDs[i];

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

  var priceCZK = priceConfig['AccomodFirstWeekCZK'] + (numberOfBatches - 1) * priceConfig['AccomodNextWeeksCZK'];
  var priceEUR = priceConfig['AccomodFirstWeekEUR'] + (numberOfBatches - 1) * priceConfig['AccomodNextWeeksEUR'];

  return {
    'priceEUR' : priceEUR,
    'priceCZK' : priceCZK,
  };
}

function getInsurancePrice(batchesInfo, priceConfig){
  var numberOfTransports =  (batchesInfo.batchSegments.length * 2)
  var daysInTransport = numberOfTransports * priceConfig['InsuranceDaysForTransport'];
  var daysInAlbania = 7 * batchesInfo.numberOfBatches;
  
  var daysUnderInsurance = daysInAlbania + daysInTransport;

  var priceCZK = priceConfig['InsurancePerDayCZK'] * daysUnderInsurance;
  var priceEUR = priceConfig['InsurancePerDayEUR'] * daysUnderInsurance;

  return {
    'priceEUR' : priceEUR,
    'priceCZK' : priceCZK,
  }
}