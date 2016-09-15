//MANUÁL
//Tady se nasatavuje text všech posílaných e-mailů. Celkem není co na tom zkazit. 


function getConfirmationEmailTemplate(formID) {
  if (formID == "cz") {

    return { 'normal' :{

      'subject': "Potvrzení registrace na recepci Albánské výzvy 2016!",
      'text': "Ahoj!\n\
\n\
Velmi nás těší Tvůj zájem o recepci Albánské výzvy 2016. \n\
Lístky tě budou stát celkem #priceFinalCZK Kč / #priceFinalEUR EUR.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosím přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
Hezký den, těším se na viděnou v Curraji\n\
organizační tým Albánské výzvy\n\
"
      },
      'notOldEnough': {

        'subject': "Albánská výzva – age limit",
        'text': "Hello!\n\
\n\
We are very pleased about your interest in Albania Challenge 2017.\n\
The Albanian Challenge is a project for young people aged between 18 to 30 years. If you're older than 30 years, we recommend you to compile your travels group and go to Albania as a tourist. It's a beautiful place, which is worth a visit! You will certainly enjoy traveling better with your peers than with much younger people.\n\
\n\
Best Regards, we look forward to seeing you in Curraj i Epërm,\n\
organization team of Albanian Challenge\n\
"
      },
    }
  };

}

function getPaidDepositEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "=",
      'text': "="
    }
  };
}

function getPaidEverythingtEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "Potvrzení zaplacení lístků recepce Albánské výzvy 2016!",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsi všechny lístky na recepci Albánské výzvy 2016.\
Konkrétně nám od tebe již přišlo #alreadyPaidNew #currency. To znamená, že od tebe již máme vše co potřebujeme (měl jsi zaplatit #finalPrice #currency) a těšíme se na tebe v létě!.\n\
\n\
Přeji Ti hezký den a tak trochu Ti závidím ten výlet do Albánie. Mě zavřeli do počítače a na dovolenou mě nechtějí pustit.\n\
robot Curraj001\n\
"
    };
  }
}

function getNotYetDepositEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': ":Potvrzení přijatých peněz za Albánskou výzvu 2017!",
      'text': "Ahoj!\n\
\n\
Jmenuji se robot Curraj001 a byl jsem vyvinut programátory pracujícími pro Albánskou výzvu. Pracuji jako účetní. Každý den pečlivě pročítám výpisy z bankovních účtů.\n\
Dneska jsem si všiml, že na účet Albánské výzvy od Tebe přišly nějaké peníze. Myslel jsem si, že to je záloha, a chtěl jsem si to poznamenat do účetní knihy. Když jsem ale namáčel razítko s nápisem ZAPLACENO do inkoustu, najednou jsem si všiml, že to nesedí!\n\
Zatím nám totiž od Tebe přišlo #alreadyPaidNew #currency, jenže záloha za Albánskou výzvu je #deposit #currency.\n\
Abys měl/a zaplacenou celou cenu Albánské výzvy, která činí (#finalPrice #currency), zbývá Ti doplatit ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Kdyby Tě zajímalo, jak se mám, tak můj život je plný zvratů. Právě jsem dostal novou tužku, tak už se těším, až si ji ořežu!\n\
Až doplatíš zbytek, tak se Ti určitě zase ozvu.\n\
Tvůj\n\
robot Curraj001\n\
"
    };
  }
}

function getNotYetEverythingEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "=",
      'text': "="
    }
  };
}