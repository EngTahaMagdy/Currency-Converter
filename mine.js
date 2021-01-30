
//  Variables


const addCurrencyBtn = document.querySelector(".add-currency-btn");

const addCurrencyList = document.querySelector(".add-currency-list");
const currenciesList = document.querySelector(".currencies");


const initiallyDisplayedCurrencies = ["USD", "EUR", "GBP","EG"];
let baseCurrency;
let baseCurrencyAmount;

let currencies = [
  {
    name: "US Dollar",
    abbreviation: "USD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/us.gif"
	 
  },
  {
    name: "Euro",
    abbreviation: "EUR",
    symbol: "\u20AC",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
  },
  {
    name: "Japanese Yen",
    abbreviation: "JPY",
    symbol: "\u00A5",
    flagURL: "http://www.geonames.org/flags/l/jp.gif"
  },
  {
    name: "British Pound",
    abbreviation: "GBP",
    symbol: "\u00A3",
    flagURL: "http://www.geonames.org/flags/l/uk.gif"
  },
	
	{
    name: "Egypt Pound",
    abbreviation: "EG",
    symbol: "EG",
    flagURL: "http://www.geonames.org/flags/l/eg.gif",
	 rate:19.0585 //Static , Not in api rates
  },
	
	{
    name: "	Saudi Arabia Riyal",
    abbreviation: "SAR",
    symbol: "SAR",
    flagURL: "http://www.geonames.org/flags/l/sa.gif",
	 rate:4.55038  //Static , Not in api rates
  },
	
	{
    name: "	Tunisia Denar",
    abbreviation: "TND",
    symbol: "TND",
    flagURL: "http://www.geonames.org/flags/l/tn.gif",
	 rate:3.27832   //Static , Not in api rates
  },
	
	
  {
    name: "Australian Dollar",
    abbreviation: "AUD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/au.gif"
  },
	
  
  {
    name: "Canadian Dollar",
    abbreviation: "CAD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/ca.gif"
  },
  {
    name: "Chinese Yuan ",
    abbreviation: "CNY",
    symbol: "\u00A5",
    flagURL: "http://www.geonames.org/flags/l/cn.gif"
  },
  {
    name: "Swedish Krona",
    abbreviation: "SEK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/se.gif"
  },
  {
    name: "New Zealand Dollar",
    abbreviation: "NZD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/nz.gif"
  },
  {
    name: "Mexican Peso",
    abbreviation: "MXN",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/mx.gif"
  },
  
  {
    name: "Turkish Lira",
    abbreviation: "TRY",
    symbol: "\u20BA",
    flagURL: "http://www.geonames.org/flags/l/tr.gif"
  },
  {
    name: "Russian Ruble",
    abbreviation: "RUB",
    symbol: "\u20BD",
    flagURL: "http://www.geonames.org/flags/l/ru.gif"
  },
  
  {
    name: "Brazilian Real",
    abbreviation: "BRL",
    symbol: "\u0052\u0024",
    flagURL: "http://www.geonames.org/flags/l/br.gif"
  },
  {
    name: "South African Rand",
    abbreviation: "ZAR",
    symbol: "\u0052",
    flagURL: "http://www.geonames.org/flags/l/za.gif"
  },
  {
    name: "Indonesian Rupiah",
    abbreviation: "IDR",
    symbol: "\u0052\u0070",
    flagURL: "http://www.geonames.org/flags/l/id.gif"
  },
  {
    name: "Icelandic Krona",
    abbreviation: "ISK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/is.gif"
  },
  {
    name: "Croatian Kuna",
    abbreviation: "HRK",
    symbol: "\u006B\u006E",
    flagURL: "http://www.geonames.org/flags/l/hr.gif"
  }
];


addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

function addCurrencyBtnClick() {
  addCurrencyBtn.classList.toggle("open");
}




function populateAddCyrrencyList() {
  for(let i=0; i<currencies.length; i++) {
   /* addCurrencyList.insertAdjacentHTML(
      "beforeend",
      `<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} - ${currencies[i].name}</span>
      </li>`
    );
	*/
	  addCurrencyList.innerHTML+=`<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} - ${currencies[i].name}</span>
      </li>`
	
  }
}







/*to show in main page*/



addCurrencyList.addEventListener("click", addCurrencyListClick);

function addCurrencyListClick(event) {
  const clickedListItem = event.target.closest("li");/*search*/
	
  if(!clickedListItem.classList.contains("disabled")) {
    const newCurrency = currencies.find(c => c.abbreviation===clickedListItem.getAttribute("data-currency"));
    if(newCurrency) newCurrenciesListItem(newCurrency);
  }
}


/*close */


currenciesList.addEventListener("click", currenciesListClick);

function currenciesListClick(event) {
  if(event.target.classList.contains("close")) {
    const parentNode = event.target.parentNode;
    parentNode.remove();
	  
	  
    addCurrencyList.querySelector(`[data-currency=${parentNode.id}]`).classList.remove("disabled");
	
  }
}




//    for input

currenciesList.addEventListener("input", currenciesListInputChange);

function currenciesListInputChange(event) {
	
	
  const isNewBaseCurrency = event.target.closest("li").id!==baseCurrency;
  if(isNewBaseCurrency) {
    currenciesList.querySelector(`#${baseCurrency}`).classList.remove("base-currency");
	  /*here*/
    setNewBaseCurrency(event.target.closest("li"));
  }
	
	
	
	
  const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
	
	
  if(baseCurrencyAmount!==newBaseCurrencyAmount || isNewBaseCurrency) {
   
	 baseCurrencyAmount = newBaseCurrencyAmount;
	  
	  
    const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
	  
	  
    currenciesList.querySelectorAll(".currency").forEach(currencyLI => {
		
		
      if(currencyLI.id!==baseCurrency) {
		  
        const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
		  
		  
        const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
		  
		  
        currencyLI.querySelector(".input input").value = exchangeRate*baseCurrencyAmount!==0 ? (exchangeRate*baseCurrencyAmount).toFixed(4) : "";
      }
    });
  }
	
	
}





function setNewBaseCurrency(newBaseCurrencyLI) {
	
  newBaseCurrencyLI.classList.add("base-currency");
	
  baseCurrency = newBaseCurrencyLI.id;
	
	
  const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
	
	
	
  currenciesList.querySelectorAll(".currency").forEach(currencyLI =>
  {
    const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
	  
    const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
	  
	  
    currencyLI.querySelector(".base-currency-rate").textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLI.id}`;
  });
}




function populateCurrenciesList() {
	
  for(let i=0; i<initiallyDisplayedCurrencies.length; i++) {
    const currency = currencies.find(c => c.abbreviation===initiallyDisplayedCurrencies[i]);
    if(currency) newCurrenciesListItem(currency);
	  //alert(currency)
  }
}
//alert( currencies.find(c => c.abbreviation==='USD').rate)

function newCurrenciesListItem(currency) {
  if(currenciesList.childElementCount===0) {
    baseCurrency = currency.abbreviation;
    baseCurrencyAmount = 0;
  }
  addCurrencyList.querySelector(`[data-currency=${currency.abbreviation}]`).classList.add("disabled");
	
	
	
	
	//console.log(currencies.find(c => c.abbreviation===baseCurrency))
	const baseCurrencyRate = currencies.find(c => c.abbreviation===baseCurrency).rate;
	const exchangeRate = currency.abbreviation===baseCurrency ? 1 : (currency.rate/baseCurrencyRate).toFixed(4);
	
	
  const inputValue = baseCurrencyAmount ? (baseCurrencyAmount*exchangeRate).toFixed(4) : "";

  currenciesList.innerHTML+=
   
    `<li class="currency ${currency.abbreviation===baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
      <img src=${currency.flagURL} class="flag">
      <div class="info">
        <p class="input"><span class="currency-symbol">${currency.symbol}</span><input placeholder="0.0000" value=${inputValue}></p>
        <p class="currency-name">${currency.abbreviation} - ${currency.name}</p>
        <p class="base-currency-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
      </div>
      <span class="close">&times;</span>
    </li>`;
}
//connection response
const dataURL = "https://api.exchangeratesapi.io/latest";

fetch(dataURL).then(res => res.json())
  .then(data => {
	let dates =new Date();
	console.log(data)
    document.querySelector(".date").textContent = dates.toISOString().slice(0, 10);
    data.rates["EUR"] = 1;
    //currencies = currencies.filter(currency => data.rates[currency.abbreviation]);
	
	
	
	currencies.forEach(currency => {
		if(data.rates[currency.abbreviation] === undefined)
			{
				currency.rate = currency.rate;
				
			}
		else{
		currency.rate = data.rates[currency.abbreviation]
			}
	
	});
	
	
	
	
    populateAddCyrrencyList();
    populateCurrenciesList();
  })
  .catch(err => console.log(err));
