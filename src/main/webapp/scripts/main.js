function haeAsiakkaat() {
	let url = "Asiakkaat?hakusana=" + document.getElementById("hakusana").value;
	let requestOptions = {
			method: "GET",
			headers: { "Content-type": "application/x-www-form-urlencoded" }
	};
	fetch(url, requestOptions)
	.then(response => response.json()) //Muutetaan vastausteksti json-objektiksi
	.then(response => printItems(response))
	.catch(errorText => console.error("Fetch failed: " + errorText));
}

//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList) {
	//console.log(respObjList);
	let htmlStr="";
	for(let item of respObjList) {
		htmlStr+="<tr id='rivi_" + item.asiakas_id+"'>";
		htmlStr+="<td>"+item.etunimi+"</td>";
		htmlStr+="<td>"+item.sukunimi+"</td>";
		htmlStr+="<td>"+item.puhelin+"</td>";
		htmlStr+="<td>"+item.sposti+"</td>";
		//htmlStr+="<td><a href='muutaasiakas.jsp?id=" + item.asiakas_id+"'>Muuta</a>&nbsp;";
		//htmlStr+="<span class='poista' onclick=varmistaPoisto('"+item.asiakas_id+"','"+encode
		htmlStr+="</tr>";		
	}
	document.getElementById("tbody").innerHTML = htmlStr;
}