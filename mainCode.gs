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
  Logger.log(batchesInfo);
  Logger.log(priceAccomodInfo);
}

function getBatchesInfo(formSubmitObj, formConfig){
  var batchesConfig = formConfig.BatchesQuestion;

  var rawResponse = formSubmitObj.namedValues[batchesConfig.Title];
  var hrString = rawResponse;
 
  var responses = rawResponse[0].split(", ");
  var batchIDs = [];

  for (var i = 0; i < responses.length; ++i) {
    var batchID = batchesConfig.Answers[responses[i]];

    if(batchID == null) {/*TODO: Do error handling*/}
    else { batchIDs.push(batchID); }   
  }

  return {
    'IDs' : batchIDs,
    'HRString' : hrString,
  }

}

function getAccomodationPrice(batchesInfo, priceConfig){
  var numberOfBatches = batchesInfo.IDs.length;

  var priceCZK = priceConfig['AccomodFirstWeekCZK'] + (numberOfBatches - 1) * priceConfig['AccomodNextWeeksCZK'];
  var priceEUR = priceConfig['AccomodFirstWeekEUR'] + (numberOfBatches - 1) * priceConfig['AccomodNextWeeksEUR'];

  return {
    'priceEUR' : priceEUR,
    'priceCZK' : priceCZK,
  };
}