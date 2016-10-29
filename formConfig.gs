//MANUÁL
//Tady se všechno konfiguruje - položky formuláře, ceny jednotlivých položek. 
//Kdykoliv změníš nějakou kolonku ve formuláři, musíš ji změnit i tady. Jinak to přestane pracovat. Názvy kolonek ve formuláři se musí PŘESNĚ shodovat s jejich pojmenováním tady.


function getFormIdConfig(){
    return {
        "uniqueQuestionFormIdTest":{
            "en":"NotImplemented",
            "cz":"Jméno",
        },
    }
}

function getTranslationConfig(formID){
    var translateObj = 
    {
        "cz":{
            "gotOverFilter":{
                "title":"Splňuješ základní podmínku členství – překročil/a jsi již tzv. Přírodní filtr?",
                "answers":{
                    "Ano": 1,
                    "Ne": 0,
                    "Nevím, co je to přírodní filtr.": 0,
                },
            },
            "firstName":{
                "title":"Jméno",
            },
            "secondName":{
                "title":"Příjmení",
            },
            "email":{
                "title":"E-mail",
            },
        },
        "en":{},
    };

    return translateObj[formID];
}


function getPriceConfig(){
    return {
        "OneYearCZK":200,
        "OneYearEUR":7.5,
    }
}
