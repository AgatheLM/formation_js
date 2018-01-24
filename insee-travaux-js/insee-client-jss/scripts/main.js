function displayTab(){
	var tab = new Array("Hollande","ZOME","Sarkozy","LE PEN","LE MAIRE","VALLS");
	var indice = 0;
	while (indice !=-1){
		indice = prompt("Donnez l'indice de l'element à afficher");
		if (indice >= 0 && indice < tab.length){
			alert ("Element["+indice+"] ="+tab[indice]);
		} else {
			alert("ERREUR INDICE INEXISTANT");
			if (indice == -1){
				alert("GOOD BYE");
			} 
		}
	}
	alert("Tableau : "+tab.sort());
}

function effectueCalcul(){
	var resul = 0;
	oper1 = document.getElementById('op1').value;
	oper1Entier = parseInt(oper1);
	oper2 = document.getElementById('op2').value;
	oper2Entier = parseInt(oper2);
	operateur = document.getElementById('operateur').value;

	switch (operateur) {
	case "+":
		resul = oper1Entier + oper2Entier;
		break;
	case "-":
		resul = oper1Entier - oper2Entier;
		break;
	case "*":
		resul = oper1Entier * oper2Entier;
		break;
	case "/":
		resul = oper1Entier / oper2Entier;
		break;
	default:
		break;
	}
	document.getElementById('labelResultat').innerHTML = resul;
}

function mainCalcul(){
	longueur=prompt("rentrez la longueur");
	largeur=prompt("rentrez la largeur");
	if (isNaN(longueur)){
		alert("Vous devez rentrer un nombre entier positif");
		return;
	}
	perimetre=calculPerimetreRectangle(longueur,largeur);
	surface=calculSurfaceRectangle(longueur,largeur)
	alert("surface ="+surface);
	alert("perimetre ="+perimetre);
}

function calculPerimetreRectangle(long,larg){
	longueur=parseInt(long);
	largeur=parseInt(larg);
	perimetre=(longueur + largeur) * 2;
	return perimetre;
}


function calculSurfaceRectangle(long,larg){
	longueur=parseInt(long);
	largeur=parseInt(larg);
	surface=longueur * largeur;
	return surface;
}


function reinitFormConnexion() {
	document.getElementById("login").value = "";
	document.getElementById("pass").value = "";
}

function reinitFormInscription() {
	document.getElementById("login").value = "";
	document.getElementById("pass").value = "";
}

function displayOneForm(){
	var login = document.getElementById("login").value;
	var password = document.getElementById("pass").value;
	alert('Login saisi :'+login+" Et Mot de passe :"+password);
}

function displayPairImpair(){
	var tabGlobal = new Array();
	var tabPair = new Array();
	var tabImpair = new Array();
	var compteur = 0;
	var nbEltPair = 0;
	var nbEltImpair = 0;
	nbEltTab = prompt("Donnez le nombre delements du tab");
	nbEltTabEntier = parseInt(nbEltTab);
	while (compteur < nbEltTabEntier){
		valSaisi = prompt("Donnez l'element "+(compteur+1)+" du tab:");
		valSaisiEntier = parseInt(valSaisi);
		tabGlobal[compteur++] = valSaisiEntier;
		if (valSaisiEntier % 2 ==0){
			tabPair[nbEltPair++] = valSaisiEntier;
		}else {
			tabImpair[nbEltImpair++] = valSaisiEntier;
		}
	}
	alert("Tab  impairs : "+tabImpair);
	alert("Tab  pairs : "+tabPair);
}



function verifFormGlobal(){
	var tabErreur = new Array();
    var cptEltTab = 0;
    valNomSaisi = trim(document.getElementById('nom').value)
	if (valNomSaisi == ''){
	tabErreur[cptEltTab++] = 'Vous devez renseigner le nom';
	}
	if (!isBonEmail(document.getElementById('email').value)){
		tabErreur[cptEltTab++] = 'Vous devez renseigner un email valide.';
		//alert('Vous devez renseigner un email valide.')
	}
	if (!isBonCodeP(document.getElementById('codeP').value)){
		tabErreur[cptEltTab++] = 'Vous devez renseigner un code Postal valide.';
	}
	if (tabErreur.length >0){
		document.getElementById('labelErreur').innerHTML = '<ul>';
		for (var i = 0; i < tabErreur.length; i++) {
			ligneErreur = '<li>'+tabErreur[i]+'</li>';
			document.getElementById('labelErreur').innerHTML += ligneErreur;
		}
		document.getElementById('labelErreur').innerHTML += '</ul>';
		return false;
	} else {
		return true;
	}
}

/*
 * Interdit la saisie des nombres non entiers
 */
function interditSaisieNonEnter(composant){
	try{
		valeurSaisie = composant.value;
		if (valeurSaisie.length>0){
			composant.valu = trim(composant.value);
			//composant.value = composant.value.
			if (isNaN(valeurSaisie)){
				composant.value = valeurSaisie.substring(0,valeurSaisie.length-1);
			}
		}
	}
	catch(e){
		alert("Erreur dans interditSaisieNonEnter==>"+e);
	}
}


function isBonCodeP(cpValue){
	isBonCodeP =  (cpValue.length!=5 || isNaN(cpValue)) ? false : true;
	return isBonCodeP;
}

function valideEmailApresSortie(emailValue){
	if (emailValue.length >0){
		 if (!isBonEmail(emailValue)){
		 	document.getElementById('labelErreur').innerHTML = '<font color=\"red\"><ul><li>Email incorrect</li></ul></font>';
		 } else {
		 	document.getElementById('labelErreur').innerHTML ='';
		 }
	}
}

function isBonEmail(emailValue){
	var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
	return reg.test(emailValue);
}

function gestionOnmouseOverImages(refImage){
	document.getElementById('img_footer').src = refImage.src;
}
function gestionOnmouseOutImages(){
	document.getElementById('img_footer').src = "img/img4.jpg";
}

function trim(sString) {
	while (sString.substring(0,1) == ' ' || sString.substring(0,1) == '\t' || sString.substring(0,1) == '\r' || sString.substring(0,1) == '\n')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ' || sString.substring(sString.length-1, sString.length) == '\t' || sString.substring(sString.length-1, sString.length) == '\r' || sString.substring(sString.length-1, sString.length) == '\n')
	{
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}


