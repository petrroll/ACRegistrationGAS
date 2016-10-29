function getConfirmationEmailTemplate(formID) {
  if (formID == "cz") {
    return { 'normal' :{

      'subject': "Přihláška do Klubu Albánské výzvy",
      'text': "Ahoj!\n\
\n\
Těší nás Tvůj zájem o členství v Klubu Albánské výzvy. \n\
Členský příspěvek je #priceFinalCZK Kč / #priceFinalEUR EUR ročně.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Za rok 2016 se neplatí – jestliže zaplatíš nyní, poplatek se započítá na celý rok 2017.\n\
\n\
Jestli se ale potkáš s někým z pořadatelů Albánské výzvy, můžeš zaplatit i v hotovosti.\n\
\n\
Hezký den, \n\
organizační tým Albánské výzvy\n\
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
      'subject': "Potvrzení zaplacení členského příspěvku do Klubu Albánské výzvy za rok 2017!",
      'text': "Ahoj!\n\
\n\
Rád bych se Ti představil. Jsem robot Curraj01. Byl jsem naprogramován jako účetní Albánské výzvy. Každý den pečlivě kontroluji výpisy z účtů Albánské výzvy a údaje z nich přepisuji do účetních knih.\n\
Dnes jsem si všiml, že jsi zaplatil/a členský poplatek Klubu Albánské výzvy za rok 2017.\n\
Konkrétně nám od Tebe přišlo #alreadyPaidNew #currency.\n\
Lístky budeš mít připraveny u vstupu na recepci v den jejího konání, nebo si je můžeš vyzvednout u některého z pořadatelů Albánské výzvy.\n\
\n\
Užívej si všechny klubové akce. \n\
robot Curraj01\n\
"
    }
  };
}

function getNotYetDepositEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "Potvrzení přijetí členského příspěvku Klubu Albánské výzvy",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsi zaplatil/a část členského příspěvku Klubu Albánské výzvy za rok 2017. Přišlo nám od Tebe #alreadyPaidNew #currency. Měl/a jsi ale zaplatit #deposit #currency a do umoření celé částky Ti zbývá (#finalPrice #currency) ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Hezký den, \n\
organizační tým Albánské výzvy\n\
"
    }
  };
}

function getNotYetEverythingEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "=",
      'text': "="
    }
  };
}