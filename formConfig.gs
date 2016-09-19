//MANUÁL
//Tady se všechno konfiguruje - položky formuláře, termíny turnusů, ceny jednotlivých položek. 
//Kdykoliv změníš nějakou kolonku ve formuláři, musíš ji změnit i tady. Jinak to přestane pracovat. Názvy kolonek ve formuláři se musí PŘESNĚ shodovat s jejich pojmenováním tady.


function getFormIdConfig(){
    return {
        "uniqueQuestionFormIdTest":{
            "en":"When do you intend to come?",
            "cz":"Na které turnusy chceš?",
        },
    }
}

function getTranslationConfig(formID){
    var translateObj = 
    {
        "cz":{
            "email":{
                "title":"E-mail",
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

                    "16.7.-22.7.2017 (1. turnus) PLNO": 5,
                    "23.7.-29.7.2017 (2. turnus) PLNO": 6,
                    "30.7.-5.8.2017 (3. turnus) PLNO": 7,
                    "6.8.-12.8.2017 (4. turnus) PLNO": 8,
                    "13.8.-19.8.2017 (5. turnus) PLNO": 9,
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
                    "Mám auto a mohu sdílet volná místa s ostatními.":2,
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
                    "Jinak (napiš nám e-mail)":-1
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
        "en":{
            "email":{
                "title":"E-mail",
            },
            "birthDayInfo":{
                "title":"Date of birth",
            },
            'insurance':{
                'title':"Travel insurance",
                "answers":{
                    "No, thanks": 0,
                    "Yes, I'm interested": 1,
                },
            },
            "batches":{
                'multiple':true,
                "title":"When do you intend to come?",
                //Numbers in answeres corresponds to zero-based index of info in getBatchesConfig()
                "answers":{
                    "16.7.-22.7.2017 (1st batch)": 0,
                    "23.7.-29.7.2017 (2nd batch)": 1,
                    "30.7.-5.8.2017 (3rd batch)": 2,
                    "6.8.-12.8.2017 (4th batch)": 3,
                    "13.8.-19.8.2017 (5th batch)": 4,

                    "16.7.-22.7.2017 (1st batch) FULL": 5,
                    "23.7.-29.7.2017 (2nd batch) FULL": 6,
                    "30.7.-5.8.2017 (3rd batch) FULL": 7,
                    "6.8.-12.8.2017 (4th batch) FULL": 8,
                    "13.8.-19.8.2017 (5th batch) FULL": 9,
                },
            },
            "transportQuality":{
                "title":"Quality of the car",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TransportPrice"]
                "answers":{
                    "Worse is enough / it doesn't matter":0,
                    "I want better":1,
                }
            },
            "transportType":{
                "title":"Transport to Albania",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TransportPrice"]
                "answers":{
                    "On my own":2,
                    "I can share my own car with the others":2,
                    "Together with the others":-1, //-1 means transport quality will determine final price
                }
            },
           "transportQuantity":{
                "title":"Transport to Albania",
                /*
                1 -> Price for transport is computed normally
                0 -> Charged only half of one transport price (no matter how many batch segments there are (e.g. when user goes to 1. and 5. batch))
                -1 -> Not charged anything in the system, manual override required
                */
                "answers":{
                    "Both directions":1,
                    "Only one":0,
                    "Another way (email us)":-1
                }
            },
            "tshirtWant":{
                "title":"Do you want Albanian Challenge's T-shirt?",
                //Numbers in answeres corresponds to zero-based index of info in getPriceConfig()["TShirtPrice"]
                "answers":{
                    "Yes":1,
                    "No":0,
                }
            },
            "tshirtSize":{
                "title":"Size",
            },
            "tshirtType":{
                "title":"Gender",
            },
        },
    }

    return translateObj[formID];
}

function getOtherConfig(){
    return {
        'lastAlowedBirthdate' : new Date(1986, 7, 1)
    }

}

function getBatchesConfig(){
    return [
      //Months in dates are zero-based e.g. 0 for January, 11 for December
      //A radší ještě jednou česky, kdyby to někdo přehlédl. Číslování měsíců začíná nulou (leden). Takže tady, v definici turnusů, 6 znamená červenec a 7 znamená srpen. 
      {"id":1, "starts":new Date(2017, 6, 16), "ends":new Date(2017, 6, 22), 'full':false},
      {"id":2, "starts":new Date(2017, 6, 23), "ends":new Date(2017, 6, 29), 'full':false},
      {"id":3, "starts":new Date(2017, 6, 30), "ends":new Date(2017, 7, 5), 'full':false},
      {"id":4, "starts":new Date(2017, 7, 6), "ends":new Date(2017, 7, 12), 'full':false},
      {"id":5, "starts":new Date(2017, 7, 13), "ends":new Date(2017, 7, 19), 'full':false},

      {"id":1, "starts":new Date(2017, 6, 16), "ends":new Date(2017, 6, 22), 'full':true},
      {"id":2, "starts":new Date(2017, 6, 23), "ends":new Date(2017, 6, 29), 'full':true},
      {"id":3, "starts":new Date(2017, 6, 30), "ends":new Date(2017, 7, 5), 'full':true},
      {"id":4, "starts":new Date(2017, 7, 6), "ends":new Date(2017, 7, 12), 'full':true},
      {"id":5, "starts":new Date(2017, 7, 13), "ends":new Date(2017, 7, 19), 'full':true},
    ];    

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
