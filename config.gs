function getFormIdConfig(){
    return {
        "uniqueQuestionFormIdTest":{
            "en":"NotImplemented",
            "cz":"Doprava?",
        },
    }
}

function getTranslationConfig(formID){
    var translateObj = 
    {
        "cz":{
            "email":{
                "title":"Email?",
            },
            "birthDayInfo":{
                "title":"Rodné číslo",
            },
            "batches":{
                'multiple':true,
                "title":"Jaké turnusy chci?",
                //Numbers in answeres corresponds to zero-based index of info in getBatchesConfig()
                "answers":{
                    "1. turnus": 0,
                    "2. turnus": 1,
                    "3. turnus": 2,
                    "4. turnus": 3,
                    "5. turnus": 4,
                    "6. turnus": 5,
                },
            },
            "transportQuality":{
                "title":"Kvalita auta:",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TransportPrice"]
                "answers":{
                    "Stačí horší / je mi to jedno":0,
                    "Chci lepší":1,
                }
            },
            "transportType":{
                "title":"Doprava?",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TransportPrice"]
                "answers":{
                    "Vlastní":2,
                    "Mám auto":2,
                    "Společná":-1, //-1 means transport quality will determine final price
                }
            },
           "transportQuantity":{
                "title":"Společná cesta",
                /*
                1 -> Price for transport is computed normally
                0 -> Charged only half of one transport price (no matter how many batch segments there are (e.g. when user goes to 1. and 5. batch))
                -1 -> Not charged anything in the system, manual override required
                */
                "answers":{
                    "Všechny":1,
                    "Jen jednu":0,
                    "Jinak":-1
                }
            },
            "tshirtWant":{
                "title":"Chci tričko?",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TShirtPrice"]
                "answers":{
                    "Ano":1,
                    "Ne":0,
                }
            },
            "tshirtSize":{
                "title":"Velikost trička",
            },
            "tshirtType":{
                "title":"Gender trička?",
            },
        },
    }

    return translateObj[formID];
}

function getBatchesConfig(){
    return [
      //Months in dates are zero-based e.g. 0 for January, 11 for December
      {"id":1,"starts":new Date(2016, 5, 26),"ends":new Date(2016, 6, 2)},
      {"id":2,"starts":new Date(2016, 6, 3),"ends":new Date(2016, 6, 9)},
      {"id":3,"starts":new Date(2016, 6, 10),"ends":new Date(2016, 6, 16)},
      {"id":4,"starts":new Date(2016, 6, 17),"ends":new Date(2016, 6, 23)},
      {"id":5,"starts":new Date(2016, 6, 24),"ends":new Date(2016, 6, 30)},
      {"id":6,"starts":new Date(2016, 6, 31),"ends":new Date(2016, 7, 6)},
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
        "InsuranceDaysForTransport":1,
        "TransportPrice":[
            {"EUR":20, "CZK":4000},
            {"EUR":30, "CZK":5000},
            {"EUR":0, "CZK":0},
        ],
        "TShirtPriceCZK":15,
        "TShirtPriceEUR":5,
        "DepositCZK":50,
        "DepositEUR":1000,
    }
}
