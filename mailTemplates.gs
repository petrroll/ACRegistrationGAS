//MANUÁL
//Tady se nasatavuje text všech posílaných e-mailů. Celkem není co na tom zkazit. 


function getConfirmationEmailTemplate(formID) {
  if (formID == "cz") {
    return {
      'normalEmail': {

        'subject': "Albánská výzva 2017 – přijali jsme Tvou přihlášku",
        'text': "Ahoj!\n\
\n\
Velmi nás těší Tvůj zájem o Albánskou výzvu 2017. Počítáme s Tebou na následující turnusy:\n\
#stringBatches \n\
\n\
Albánská výzva Tě bude stát celkem #priceFinalCZK Kč / #priceFinalEUR EUR.\n\
\n\
Celková cena se skládá z:\n\
 - pobyt: #priceAccommodCZK Kč / #priceAccommodEUR €\n\
 - doprava: #priceTransportCZK Kč / #priceTransportEUR €\n\
 - pojištění: #priceInsuranceCZK Kč / #priceInsuranceEUR € (pojištění: #dateInsuranceHR)\n\
 - tričko: #priceTShirtCZK Kč / #priceTShirtEUR € (vybral/a sis tričko #typeTShirt).\n\
\n\
Platbu nemusíš posílat celou najednou. Stačí poslat zálohu #priceDepositCZK Kč (#priceDepositEUR €) nejpozději do konce března, doplatek #priceRestCZK Kč (#priceRestEUR €) do konce května. Zaplacením zálohy, která je nevratná, se Tvá přihláška stane závaznou a Tvé místo bude rezervováno. Dokud není záloha zaplacena, může Tvé místo obsadit jiný zájemce. Platbu můžeš předat v hotovosti někomu z organizačního týmu (Honza Balák, Vojta Kaska, Erika Lorencová, Robin Dobra, Jura Němec), nebo nám ji poslat na účet.\n\
\n\
Platební údaje\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosíme přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
\n\
Hezký den, těšíme se na viděnou v Curraji.\n\
organizační tým Albánské výzvy\n\
"
      },
      'fullBatch': {

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
      'notOldEnough': {

        'subject': "Albánská výzva – máš správný věk?",
        'text': "Ahoj!\n\
\n\
Těší nás Tvůj zájem o Albánskou výzvu 2017.\n\
Albánská výzva je projekt určený především pro mladé lidi od 18 do 30 let. Je-li Ti více než 30 let, doporučujeme sestavit si svou cestovatelskou skupinku a vydat se do Curraje jako turista. Je to krásné místo a návštěva určitě stojí za to! A ve vrstevnické skupince si určitě cestování užijete daleko lépe, než ve skupině mnohem mladších lidí.\n\
Pokud je Ti výrazně nad 30 let, jako účastník projektu Albánská výzva s námi bohužel jet nemůžeš. Je-li Ti těsně nad 30 let, můžeš nás zkontaktovat a požádat o výjimku.\n\
Do severoalbánských hor z bezpečnostních důvodů určitě nejezdi sám/a (ty hory jsou daleko zrádnější a náročnější, než nejspíš předpokládáš). Protože ale lidí, kteří hledají parťáka na cestování, je spousta, můžeš ke zkontaktování s dalšími použít např. cestovatelskou seznamku na www.hedvabnastezka.cz nebo facebookové skupiny Spolucestování - Cestovatelská seznamka, Cestovatelé Brno atd.\n\
\n\
Hezký den, těšíme se na setkání někde v albánských horách.\n\
organizační tým Albánské výzvy\n\
"
      },
    }
  }

  if (formID == "en") {
    return {
      'normalEmail': {

        'subject': "Albanian Challenge – Acknowledgement of application receipt",
        'text': "Hello!\n\
\n\
We are very pleased about your interest in Albania Challenge 2017. We count with you on the following batches:\n\
#stringBatches \n\
\n\
The total price of the Albanian Challenge is for you #priceFinalEUR EUR.\n\
\n\
The total price consists of:\n\
 - stay: #priceAccommodEUR €\n\
 - transport: #priceTransportEUR €\n\
 - insurance: #priceInsuranceEUR € (insurance: #dateInsuranceHR)\n\
 - T-shirt: #priceTShirtEUR € (you chose #typeTShirt).\n\
\n\
You don't have to send full payment at once. Is enough to send a deposit #priceDepositEUR € to the end of March, additional payment #priceRestEUR € to the end of May. By paying the deposit, which is non refundable, Your registration will become mandatory and your place will be reserved. Until the deposit isn't paid, your place can occupy another candidate.\n\
\n\
Payment information\n\
IBAN: CZ1020100000002200918851\n\
BIC/SWIFT: FIOBCZPPXXX\n\
Bank: Fio banka, a.s., V Celnici 10, Prague, Czechia\n\
Variable symbol: #varSymbol \n\
\n\
You can add to our internal group on facebook: https://www.facebook.com/groups/334454786737221/.\n\
\n\
Best Regards, we look forward to seeing you in Curraj i Epërm,\n\
organization team of Albanian Challenge\n\
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
      'subject': ":Potvrzení zaplacení zálohy za Albánskou výzvu 2017",
      'text': "Ahoj!\n\
\n\
Jmenuji se robot Curraj001 a byl jsem vyvinut programátory pracujícími pro Albánskou výzvu. Pracuji jako účetní. Každý den pečlivě pročítám výpisy z bankovních účtů a údaje z nich přepisuji do účetních knih.\n\
Dneska jsem si všiml, že nám od Tebe přišla záloha ve výši #deposit #currency.\n\
Do zaplacení celé částky (#finalPrice #currency) Ti zbývá uhradit ještě #leftToBePaid #currency.\n\
\n\
Platební údaje:\n\
Číslo účtu: 2200918851 / 2010 (pro platby ze Slovenska 2200918851 / 8330 – jedná se o slovenský účet v eurech)\n\
Variabilní symbol: #varSymbol \n\
\n\
Celá částka by měla být uhrazena nejpozději do konce května.\n\
\n\
Pokud ještě nejsi v naší interní FB skupině, prosím přidej se tam. Stává se, že méně důležité informace sdílíme pouze přes ni: https://www.facebook.com/groups/334454786737221/.\n\
Přeji Ti hezký den,\n\
robot Curraj001\n\
"
    };
  }

  if (formID == "en") {
    return {
      'subject': ":Confirmation of advance payment for the Albanian Challenge",
      'text': "Hello!\n\
\n\
My name is robot Curraj001 and I was developed by programmers working for Albanian Challenge. I work as an accountant. Every day I carefully read over bank statements.\n\
Today I noticed that a deposit from you in the amount of #deposit #currency came to our account.\n\
To pay the full amount (#finalPrice #currency) you got to pay another #leftToBePaid #currency.\n\
\n\
Payment information\n\
IBAN: CZ1020100000002200918851\n\
BIC/SWIFT: FIOBCZPPXXX\n\
Bank: Fio banka, a.s., V Celnici 10, Prague, Czechia\n\
Variable symbol: #varSymbol \n\
\n\
The entire amount should be paid until the end of May.\n\
\n\
Best Regards, \n\
robot Curraj001\n\
"
    };
  }

}

function getPaidEverythingtEmail(formID) {
  if (formID == "cz") {
    return {
      'subject': "Potvrzení zaplacení Albánské výzvy 2017",
      'text': "Ahoj!\n\
\n\
To jsem zase já, robot Curraj001. Nejspíš už jsme si psali, ale přece se pro jistotu představím. Byl jsem vyvinut programátory pracujícími pro Albánskou výzvu jako účetní. Mou prací je bedlivě hlídat výpisy z bankovních účtů a údaje z nich přepisovat do účetních knih.\n\
Dneska jsem si všiml, že na účet Albánské výzvy od Tebe přišlo dohromady již #alreadyPaidNew #currency. To znamená, že jsi už zaplatil/a vše, co jsi zaplatit měl/a.\n\
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
      'subject': "Potvrzení přijatých peněz za Albánskou výzvu 2017",
      'text': "Ahoj!\n\
\n\
To jsem zase já, robot Curraj001. Nejspíš už jsme si psali, ale přesto se pro jistotu představím. Byl jsem vyvinut programátory pracujícími pro Albánskou výzvu jako účetní. Mou prací je bedlivě hlídat výpisy z bankovních účtů a údaje z nich přepisovat do účetních knih.\n\
Dneska jsem si všiml, že na účet Albánské výzvy od Tebe přišlo již #alreadyPaidNew #currency. Do umoření celé částky (#finalPrice #currency) Ti zbývá uhradit ještě #leftToBePaid #currency.\n\
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