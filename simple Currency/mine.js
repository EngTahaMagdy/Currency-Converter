let select =document.querySelectorAll('select');
let input =document.querySelectorAll('input');
let html=''
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		console.log(myObj.rates)
		
		var arrKeys=Object.keys(myObj.rates)
		
arrKeys.forEach( item =>{
	return html+=`<option value=${item}>${item}</option>`
})
for(let i=0;i<select.length;i++)
	{
		select[i].innerHTML=html;
	}
	console.log(myObj.rates[select[1].value])
		input[0].addEventListener('keyup',()=>{
			input[1].value=input[0].value*myObj.rates[select[1].value]/myObj.rates[select[0].value]
		})
		input[1].addEventListener('keyup',()=>{
			input[0].value=input[1].value*myObj.rates[select[0].value]/myObj.rates[select[1].value]
		})
		
		
		
		select[0].addEventListener('change',()=>{
			input[1].value=input[0].value*myObj.rates[select[1].value]/myObj.rates[select[0].value]
		})
		select[1].addEventListener('change',()=>{
			input[0].value=input[1].value*myObj.rates[select[0].value]/myObj.rates[select[1].value]
		})
		

	}
};
xmlhttp.open("GET", "https://api.exchangeratesapi.io/latest", 
			 true);
xmlhttp.send();