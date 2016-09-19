function getConfirmationEmailTemplate(formID) {
  if (formID == "cz") {
    return { 'normalEmail' :{

      'subject': ":Potvrzení registrace Albánské výzvy 2017!",
      'text': "Ahoj!\n\
\n\
Velmi nás těší Tvůj zájem o Albánskou výzvu 2017. Počítáme s tebou na následující turnusy:\n\
#stringBatches \n\
\n\
Albánská výzva Tě bude stát celkem #priceFinalCZK Kč / #priceFinalEUR EUR.\n\
\n\
Celková cena se skládá z:\n\
\n\
Pobyt: #priceAccommodCZK Kč / #priceAccommodEUR €\n\
Doprava: #priceTransportCZK Kč / #priceTransportEUR €\n\
Pojištění: #priceInsuranceCZK Kč / #priceInsuranceEUR € (pojištění: #dateInsuranceHR)\n\
Tričko: #priceTShirtCZK Kč / #priceTShirtEUR € (vybral/a sis tričko #typeTShirt).\n\
\n\
Platbu nemusíš posílat celou najednou. Stačí poslat zálohu #priceDepositCZK Kč (#priceDepositEUR €) nejpozději do konce března, doplatek #priceRestCZK Kč (#priceRestEUR €) do konce května. Odesláním zálohy se Tvá přihláška stává závaznou a Tvé místo je rezervováno. Dokud není záloha zaplacena, může Tvé místo obsadit jiný zájemce. Platbu můžeš předat v hotovosti někomu z organizačního týmu (Honza Balák, Vojta Kaska, Erika Lorencová nebo Robin Dobra) nebo nám ji poslat na účet.\n\
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
 'fullBatch' :{

      'subject': ":Nahradnik Albánské výzvy 2017!",
      'text': "Ahoj!\n\
\n\
Velmi nás těší Tvůj zájem o Albánskou výzvu 2017. Počítáme s tebou na následující turnusy:\n\
#stringBatches \n\
\n\
Albánská výzva Tě bude stát celkem #priceFinalCZK Kč / #priceFinalEUR EUR.\n\
\n\
Celková cena se skládá z:\n\
\n\
Pobyt: #priceAccommodCZK Kč / #priceAccommodEUR €\n\
Doprava: #priceTransportCZK Kč / #priceTransportEUR €\n\
Pojištění: #priceInsuranceCZK Kč / #priceInsuranceEUR € (pojištění: #dateInsuranceHR)\n\
Tričko: #priceTShirtCZK Kč / #priceTShirtEUR € (vybral/a sis tričko #typeTShirt).\n\
\n\
Platbu nemusíš posílat celou najednou. Stačí poslat zálohu #priceDepositCZK Kč (#priceDepositEUR €) nejpozději do konce března, doplatek #priceRestCZK Kč (#priceRestEUR €) do konce května. Odesláním zálohy se Tvá přihláška stává závaznou a Tvé místo je rezervováno. Dokud není záloha zaplacena, může Tvé místo obsadit jiný zájemce. Platbu můžeš předat v hotovosti někomu z organizačního týmu (Honza Balák, Vojta Kaska, Erika Lorencová nebo Robin Dobra) nebo nám ji poslat na účet.\n\
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
'notOldEnough' :{

      'subject': ":Potvrzení registrace Albánské výzvy 2017!",
      'text': "Ahoj!\n\
\n\
Velmi nás těší Tvůj zájem o Albánskou výzvu 2017. Jak píšeme na stránkách, tak ovšem standardně přijímáme pouze lidi do 30 let. \
To samozřejmě neznamená, že určitě jet nemůžeš, výhledově ti napíšeme a domluvíme se s tebou.\n\
\n\
Pokud se s tebou nakonec přeci jen domluvíme jako na dobrovolníkovi (turisté mohou jet nezávisle na věku!), tak s tebou budeme počítat na následující turnusy:\n\
#stringBatches \n\
\n\
Albánská výzva Tě bude stát celkem #priceFinalCZK Kč / #priceFinalEUR EUR (neplať, dokud se s tebou nedomluvíme najisto).\n\
\n\
Celková cena se skládá z:\n\
\n\
Pobyt: #priceAccommodCZK Kč / #priceAccommodEUR €\n\
Doprava: #priceTransportCZK Kč / #priceTransportEUR €\n\
Pojištění: #priceInsuranceCZK Kč / #priceInsuranceEUR € (pojištění: #dateInsuranceHR)\n\
Tričko: #priceTShirtCZK Kč / #priceTShirtEUR € (vybral/a sis tričko #typeTShirt).\n\
\n\
Platbu nemusíš posílat celou najednou. Stačí poslat zálohu #priceDepositCZK Kč (#priceDepositEUR €) nejpozději do konce března, doplatek #priceRestCZK Kč (#priceRestEUR €) do konce května. Odesláním zálohy se Tvá přihláška stává závaznou a Tvé místo je rezervováno. Dokud není záloha zaplacena, může Tvé místo obsadit jiný zájemce. Platbu můžeš předat v hotovosti někomu z organizačního týmu (Honza Balák, Vojta Kaska, Erika Lorencová nebo Robin Dobra) nebo nám ji poslat na účet.\n\
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
    }
  };
}

function getPaidDepositEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': ":Potvrzení zaplacení zálohy za Albánskou výzvu 2017!",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsi zaplatil zálohu za Albánskou výzvu 2017 ve výši #deposit #currency.\n\
Konkrétně nám od tebe již přišlo #alreadyPaidNew #currency. To znamená, že do zaplacení celé částky (#finalPrice #currency) ti zbývá ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosím přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
Hezký den, těším se na viděnou v Curraji\n\
organizační tým Albánské výzvy\n\
"
    }
  };
}

function getPaidEverythingtEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': ":Potvrzení zaplacení Albánské výzvy 2017!",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsi zaplatil celou Albánskou výzvu 2017.\
Konkrétně nám od tebe již přišlo #alreadyPaidNew #currency. To znamená, že od tebe již máme vše co potřebujeme (měl jsi zaplatit #finalPrice #currency) a těšíme se na tebe v létě!.\n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosím přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
Hezký den, těším se na viděnou v Curraji\n\
organizační tým Albánské výzvy\n\
"
    }
  };
}

function getNotYetDepositEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': ":Potvrzení přijatých peněz za Albánskou výzvu 2017!",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsi zaplatil část zálohy za Albánskou výzvu 2017. Přišlo nám od tebe již #alreadyPaidNew #currency. Záloha je ovšem #deposit #currency a do umoření celé částky ti zbývá (#finalPrice #currency) ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosím přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
Hezký den, těším se na viděnou v Curraji\n\
organizační tým Albánské výzvy\n\
"
    }
  };
}

function getNotYetEverythingEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': ":Potvrzení přijatých peněz za Albánskou výzvu 2017!",
      'text': "Ahoj!\n\
\n\
Potvrzujeme, že jsme od tebe dostali nějaké peníze za Albánskou výzvu 2017. Přišlo nám od tebe již #alreadyPaidNew #currency. Do umoření celé částky ti zbývá (#finalPrice #currency) ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosím přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
Hezký den, těším se na viděnou v Curraji\n\
organizační tým Albánské výzvy\n\
"
    }
  };
}