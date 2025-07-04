const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");

/*for(code in countryList ){
    console.log(code,countryList[code]);
}*/

for (let select of dropdown) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (currcode === "USD" && select.name === "from") {
      newOption.selected = "selected";
    } else if (currcode === "INR" && select.name === "to") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  //console.log(element);
  let currcode = element.value;
  //console.log(currcode);
  let countrycode = countryList[currcode]; // in,eu
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();

});

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
  let amtvalue=amount.value;
  if(amtvalue==="" ||amtvalue<1){
    amtvalue=1;
    amount.value=1;
  }
  //console.log(fromCurr.value,toCurr.value);


  const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response= await fetch(URL); //JSON
  //console.log(response);
  let data=await response.json();
  //console.log(data); // data is the object

  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  //console.log(rate);

  let finalamount=amtvalue*rate;
  msg.innerText=`${amtvalue}${fromCurr.value} = ${finalamount} ${toCurr.value}`;
}



window.addEventListener("load",()=>{
    updateExchangeRate();

})
