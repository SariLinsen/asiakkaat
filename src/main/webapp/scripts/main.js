//lomaketietojen muuttaminen JSON-stringiksi
function serialize_form(form) {
	return JSON.stringify(
		Array.from(new FormData(form).entries())
		.reduce((m, [key,value]) => Object.assign(m,{[key]: value}), {})
	);
}

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
		htmlStr+="<td><span class='poista' onclick=varmistaPoisto('"+item.asiakas_id+"','"+encodeURI(item.etunimi)+ "')>Poista</span></td>";
		
		//htmlStr+="<td><a href='muutaasiakas.jsp?id=" + item.asiakas_id+"'>Muuta</a>&nbsp;";
		//htmlStr+="<span class='poista' onclick=varmistaPoisto('"+item.asiakas_id+"','"+encode
		htmlStr+="</tr>";		
	}
	document.getElementById("tbody").innerHTML = htmlStr;
}

function tutkiJaLisaa(){
	if (tutkiTiedot()) {
		lisaaTiedot();
	}
}

function tutkiTiedot() {
	let ilmo="";	
	if(document.getElementById("etunimi").value.length<2) {
		ilmo="Etunimi ei kelpaa!";
		document.getElementById("etunimi").focus();
	} else if (document.getElementById("sukunimi").value.length<2) {
		ilmo="Sukunimi ei kelpaa!";
		document.getElementById("sukunimi").focus();
	} else if (document.getElementById("puhelin").value.length<5) {
		ilmo="Puhelinnumero ei kelpaa!";
		document.getElementById("puhelin").focus();
	} else if (document.getElementById("sposti").value.length<5) {
		ilmo="Sähköposti ei kelpaa!";
		document.getElementById("sposti").focus();
	}
	if (ilmo!="") {
		document.getElementById("ilmo").innerHTML=ilmo;
		setTimeout(function(){document.getElementById("ilmo").innerHTML="";}, 3000);
		return false;
	} else {
		document.getElementById("etunimi").value=siivoa(document.getElementById("etunimi").value);
		document.getElementById("sukunimi").value=siivoa(document.getElementById("sukunimi").value);
		document.getElementById("puhelin").value=siivoa(document.getElementById("puhelin").value);
		document.getElementById("sposti").value=siivoa(document.getElementById("sposti").value);
		return true;
	}
}

function siivoa(teksti) {
	teksti=teksti.replace(/</g, "");
	teksti=teksti.replace(/>/g, "");
	teksti=teksti.replace(/'/g, "''");
	return teksti;
}

function lisaaTiedot() {
	let formData = serialize_form(lomake);
	//console.log(formData);
	let url = "Asiakkaat";
	let requestOptions = {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: formData
	};
	fetch(url, requestOptions)
	.then(response => response.json()) //Muutetaan vastausteksti JSON-objektiksi
	.then(responseObj => {
		console.log(responseObj);
		if(responseObj.response==0) {
			document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys epäonnistui.";
		} else if (responseObj.response==1) {
			document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys onnistui.";
			document.lomake.reset(); //lomakkeen tyhjennys lisäyksen jälkeen
		}
		setTimeout(function(){document.getElementById("ilmo").innerHTML="";}, 3000);
	})
	.catch(errorText => console.error("Fetch failed: " + errorText));
}

function varmistaPoisto(asiakas_id, etunimi) {
	if (confirm("Poista asiakas " + decodeURI(etunimi) + "?")) {
		poistaAuto(asiakas_id, encodeURI(etunimi));
	}
}

function poistaAuto(asiakas_id, etunimi) {
	let url = "Asiakkaat?asiakas_id=" + asiakas_id;
	let requestOptions = {
		method: "DELETE"
	};
	fetch(url, requestOptions)
	.then(response => response.json())
	.then(responseObj => {
		console.log(responseObj);
		if(responseObj.response==0) {
			alert ("Asiakkaan poisto epäonnistui.");
		} else if (responseObj.response==1) {
			document.getElementById("rivi_"+asiakas_id).style.backgroundColor="red";
			alert ("Asiakkaan " + decodeURI(etunimi)+ " poisto onnistui.");
			haeAsiakkaat();
		}
	})
	.catch(errorText => console.error("Fetch failed: " + errorText));
}	
	









