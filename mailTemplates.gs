function getConfirmationEmailTemplate(formID) {
  if (formID == "cz") {
    return { 'normal' :{

      'subject': "Recepce Albánské výzvy – potvrzení přihlášky",
      'text': "Ahoj!\n\
\n\
Těší nás Tvůj zájem o recepci Albánské výzvy 2016. \n\
Lístky Tě budou stát celkem #priceFinalCZK Kč / #priceFinalEUR EUR.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Jestli se ale potkáš s někým z pořadatelů Albánské výzvy, můžeš zaplatit i v hotovosti.\n\
\n\
Budeme potěšeni, pokud si vybereš nějakou odměnu na Startovači: https://www.startovac.cz/projekty/auto-ac/.\n\
\n\
Hezký den, těšíme se na setkání na recepci, \n\
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
      'subject': "Potvrzení zaplacení lístků recepce Albánské výzvy 2016!",
      'text': "Ahoj!\n\
\n\
Rád bych se Ti představil. Jsem robot Curraj01. Byl jsem naprogramován jako účetní Albánské výzvy. Každý den pečlivě kontroluji výpisy z účtů Albánské výzvy a údaje z nich přepisuji do účetních knih.\n\
Dnes jsem si všiml, že jsi zaplatil/a všechny objednané lístky na recepci Albánské výzvy 2016.\n\
Konkrétně nám od Tebe přišlo #alreadyPaidNew #currency.\n\
Lístky budeš mít připraveny u vstupu na recepci v den jejího konání, nebo si je můžeš vyzvednout u některého z pořadatelů Albánské výzvy.\n\
Recepce se koná v sobotu 22. 10. 2016 od 18:00 hod. na Biskupském gymnáziu v Brně (Barvičova 85). Nejbližší zastávka trolejbusu se jmenuje Barvičova a jezdí na ni trolejbus č. 39 z Komenského náměstí (to je zastávka před FSS).\n\
Prosíme o dodržení dresscode (formální oděv ideálně v barvách černá-bílá-červená).\n\
\n\
Nezapomeň, že konec našeho Startovače se blíží: https://www.startovac.cz/projekty/auto-ac/.\n\
\n\
Hezký den, užij si recepci. \n\
robot Curraj01\n\
"
    }
  };
}

function getNotYetDepositEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "Potvrzení přijatých peněz za recepci Albánské výzvy",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsi zaplatil/a část částky za recepci Albánské výzvy. Přišlo nám od Tebe #alreadyPaidNew #currency. Měl/a jsi ale zaplatit #deposit #currency a do umoření celé částky Ti zbývá (#finalPrice #currency) ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Hezký den, těším se na viděnou v Curraji\n\
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