function getFormIdConfig(){
    return {
        "UniqueQuestionFormIdTest":{
            "EN":"Test",
            "CZ":"Doprava?",
        },
    }
}

function getTranslationConfig(formID){
    var translateObj = 
    {
        "CZ":{
            "BatchesQuestion":{
                "Title":"Jaké turnusy chci?",
                "Answers":{
                    "1. turnus": 0,
                    "2. turnus": 1,
                    "3. turnus": 2,
                    "4. turnus": 3,
                    "5. turnus": 4,
                    "6. turnus": 5,
                },
            }
        },
    }

    return translateObj[formID];
}

function getBatchesConfig(){
    return [
      //Months in dates are zero-based e.g. 0 for January, 11 for December
      {"Id":1,"Starts":new Date(2016, 5, 26),"Ends":new Date(2016, 6, 2)},
      {"Id":2,"Starts":new Date(2016, 6, 3),"Ends":new Date(2016, 6, 9)},
      {"Id":3,"Starts":new Date(2016, 6, 10),"Ends":new Date(2016, 6, 16)},
      {"Id":4,"Starts":new Date(2016, 6, 17),"Ends":new Date(2016, 6, 23)},
      {"Id":5,"Starts":new Date(2016, 6, 24),"Ends":new Date(2016, 6, 30)},
      {"Id":6,"Starts":new Date(2016, 6, 31),"Ends":new Date(2016, 7, 6)},
    ]    

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
