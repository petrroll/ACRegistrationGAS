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
                //Months in dates are zero-based e.g. 0 for January, 11 for December
                "1. turnus": {"Id":1,"Starts":new Date(2016, 5, 26),"Ends":new Date(2016, 6, 2)},
                "2. turnus": {"Id":2,"Starts":new Date(2016, 6, 3),"Ends":new Date(2016, 6, 9)},
                "3. turnus": {"Id":3,"Starts":new Date(2016, 6, 10),"Ends":new Date(2016, 6, 16)},
                "4. turnus": {"Id":4,"Starts":new Date(2016, 6, 17),"Ends":new Date(2016, 6, 23)},
                "5. turnus": {"Id":5,"Starts":new Date(2016, 6, 24),"Ends":new Date(2016, 6, 30)},
                "6. turnus": {"Id":6,"Starts":new Date(2016, 6, 31),"Ends":new Date(2016, 7, 6)},
            },
        },
    }
}

function getPriceConfig(){
    return {
        "AccomodFirstBatchCZK":2600,
        "AccomodFirstBatchEUR":95,
        "AccomodNextBatchesCZK":650,
        "AccomodNextBatchesEUR":25,
        "InsurancePerDayCZK":15,
        "InsurancePerDayEUR":0.5,
        //How many days should be added for transport
        "InsuranceDaysForTransport":1
    }
}
