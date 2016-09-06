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
  var formConfig = (formID == 'CZ') ? getFormConfigCZ() : getFormConfigEN(); 

  var batchesInfo = getBatchesInfo(formSubmitObj, formConfig);
  Logger.log(batchesInfo);
}

function getBatchesInfo(formSubmitObj, formConfig){


}