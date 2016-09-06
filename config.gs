function getConfig() {
  return {
    "FirstQuestionCZ":"Doprava?",
    "FirstQuestionEN":"Test",
  };
}

function getFormConfigCZ(){
    return {
        "BatchesQuestion":{
            "Title":"Jaké turnusy chci?",
            "Answers":{
                "1. turnus":1,
                "2. turnus":2,
                "3. turnus":3,
                "4. turnus":4,
                "5. turnus":5,
                "6. turnus":6,
            },
        },
    }
}

function getPriceConfig(){
    return {
        "AccomodFirstWeekCZK":2600,
        "AccomodFirstWeekEUR":95,
        "AccomodNextWeeksCZK":650,
        "AccomodNextWeeksEUR":25,
        "InsurancePerDayCZK":15,
        "InsurancePerDayEUR":0.5,
        //How many days should be added for transport
        "InsuranceDaysForTransport":1
    }
}
