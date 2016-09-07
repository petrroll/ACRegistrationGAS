function getConfirmationEmailTemplate(formID){
if(formID == "CZ") {
    return "Ahoj!\n\
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
    };
}