//MANUÁL
//Tady se všechno konfiguruje - položky formuláře, termíny turnusů, ceny jednotlivých položek. 
//Kdykoliv změníš nějakou kolonku ve formuláři, musíš ji změnit i tady. Jinak to přestane pracovat. Názvy kolonek ve formuláři se musí PŘESNĚ shodovat s jejich pojmenováním tady.


function getFormIdConfig(){
    return {
        "uniqueQuestionFormIdTest":{
            "en":"NotImplemented",
            "cz":"Jméno & příjmení",
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
            "firstName":{
                "title":"Jméno",
            },
            "secondName":{
                "title":"Příjmení",
            },
            "numberOfTickets":{
                "title":"Počet vstupenek",
            },           
        },
        "en":{},
    };

    return translateObj[formID];
}


function getPriceConfig(){
    return {
        "OneTicketCZK":100,
        "OneTicketEUR":4,
    }
}
