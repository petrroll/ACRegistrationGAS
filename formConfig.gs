function getFormIdConfig(){
    return {
        "uniqueQuestionFormIdTest":{
            "en":"NotImplemented",
            "cz":"Na které turnusy chceš?",
        },
    }
}

function getTranslationConfig(formID){
    var translateObj = 
    {
        "cz":{
            "email":{
                "title":"Email",
            },
            "birthDayInfo":{
                "title":"Datum narození",
            },
            'insurance':{
                'title':"Cestovní pojištění",
                "answers":{
                    "si seženu sám/a": 0,
                    "chci společné": 1,
                },
            },
            "batches":{
                'multiple':true,
                "title":"Na které turnusy chceš?",
                //Numbers in answeres corresponds to zero-based index of info in getBatchesConfig()
                "answers":{
                    "16.7.-22.7.2017 (1. turnus)": 0,
                    "23.7.-29.7.2017 (2. turnus)": 1,
                    "30.7.-5.8.2017 (3. turnus)": 2,
                    "6.8.-12.8.2017 (4. turnus)": 3,
                    "13.8.-19.8.2017 (5. turnus)": 4,
                },
            },
            "transportQuality":{
                "title":"Kvalita auta",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TransportPrice"]
                "answers":{
                    "Stačí horší / je mi to jedno":0,
                    "Chci lepší":1,
                }
            },
            "transportType":{
                "title":"Doprava na místo",
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
                    "Všechny cesty":1,
                    "Jen jednu":0,
                    "Jinak (napiš nám email)":-1
                }
            },
            "tshirtWant":{
                "title":"Máš zájem o tričko Albánské výzvy?",
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
                "title":"Typ trička",
            },
        },
        "en":{}
    }

    return translateObj[formID];
}

function getOtherConfig(){
    return {
        'lastAlowedBirthdate' : new Date(1986, 7, 01)
    }

}

function getBatchesConfig(){
    return [
      //Months in dates are zero-based e.g. 0 for January, 11 for December
      {"id":1,"starts":new Date(2017, 7, 16),"ends":new Date(2017, 7, 22)},
      {"id":2,"starts":new Date(2017, 7, 23),"ends":new Date(2017, 7, 29)},
      {"id":3,"starts":new Date(2017, 7, 30),"ends":new Date(2017, 8, 8)},
      {"id":4,"starts":new Date(2017, 8, 17),"ends":new Date(2017, 8, 15)},
      {"id":5,"starts":new Date(2017, 8, 24),"ends":new Date(2017, 8, 22)},
    ]    

}

function getPriceConfig(){
    return {
        "AccomodFirstBatchCZK":2600,
        "AccomodFirstBatchEUR":95,
        "AccomodNextBatchesCZK":675,
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
        "TShirtPriceCZK":120,
        "TShirtPriceEUR":4.5,
        "DepositCZK":1500,
        "DepositEUR":55,
    }
}
