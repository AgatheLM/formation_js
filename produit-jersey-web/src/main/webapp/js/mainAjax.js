//The root URL for the RESTful services
var URL_ROOT = "http://localhost:8082/eproduit-web/rest/clients/";

var currentCustomer;

//Retrieve customer list when application starts 
findAllOnServer();

$('#btnAdd').click(function() {
	resetForm();
	return false;
});

//Juste pour conserver la page html telquelle car bouton inutile pour une gestion de données en base
$('#btnRaz').click(function() {
	return false;
});

$('#btnSave').click(function() {
	if ($('#idClient').val() == '')
		addCustomer();
	else
		updateCustomer();
	return false;
});

//Selection d'une ligne du tableau
$('#customerTableDivId table tr').live('click', function() {
	try {
		var customerId = $(this).data('identity');
		findByIdAndLoadForm(customerId);
		console.log("Current Id :"+customerId)
	} catch (e) {
		console.log(e);
	}
});

//Suppression d'une ligne selectionnée du tableau
$('#customerTableDivId table tr').live('dblclick', function() {
	console.log('Entree dans double clic pour suppresion');
	var customerId = $(this).data('identity');
	deleteByIdAndRefresh(customerId);
});

/**
 * Supprime et rafraichit un client par son identifiant
 * @param customerId : Identifiant de l'objet qu'on desire supprimer
 * @returns
 */
function deleteByIdAndRefresh(customerId){
	try {
		console.log('deleteByIdAndRefresh');
		//TODO 3 : Codez ici les instructions pour la suppression
	} catch (e) {
		console.log(e);
	}

}


function resetForm() {
	currentCustomer = {};
	renderDetails(currentCustomer); // Display empty form
}

function findAllOnServer() {
	console.log('findAllOnServer');
	$.ajax({
		type: 'GET',
		url: URL_ROOT,
		dataType: "json", // data type of response
		success: refreshTabList
	});
}

function findByIdAndLoadForm(customerId) {
	console.log('findByIdAndLoadForm: ' + customerId);
	$.ajax({
		type: 'GET',
		url: URL_ROOT + customerId,
		dataType: "json",
		success: function(data){
			console.log('findByIdAndLoadForm success: ' + data.nom);
			currentCustomer = data;
			renderDetails(currentCustomer);
		}
	});
}

function addCustomer() {
	console.log('addCustomer');
	//TODO 1 : Codez les instructions pour l'ajout d'un client
	//En retour il faut rafraichir le tableau
}

function updateCustomer() {
	console.log('updateCustomer');
	//TODO 2 : Codez les instructions pour la mise à jour d'un client
	//En retour il faut rafraichir le tableau
}

/**
 * Rafraichit le tableau
 * @returns
 */
function refreshTabList(customerDataList) {
	console.log('refreshTabList');
	try {
		// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
		customerDataList = customerDataList == null ? [] : (customerDataList instanceof Array ? customerDataList : [customerDataList]);
		//var myTableDiv = document.getElementById("customerTableDivId");
		var myTableDiv = $('#customerTableDivId');
		//$('#customerTableDivId').val("");
		//myTableDiv.innerHTML="";
		myTableDiv.html("");
		if (customerDataList.length >0){ //On ne fait rien si aucun client en Session
			var table = document.createElement('TABLE');
			//Preparation de l'entete du tableau
			var tabHeadingArray = new Array();
			tabHeadingArray[0] = "Nom";
			tabHeadingArray[1] = "Prenom";
			tabHeadingArray[2] = "Sexe";
			tabHeadingArray[3] = "Numéro Client";
			tabHeadingArray[4] = "Adresse";
			tabHeadingArray[5] = "Code Postal";
			//On fixe les border
			table.border = '5'
				//TABLE COLUMNS ENTETE
				var tr = document.createElement('TR');
			for (i = 0; i < tabHeadingArray.length; i++) {
				var th = document.createElement('TH')
				th.width = '230';
				th.appendChild(document.createTextNode(tabHeadingArray[i]));
				tr.appendChild(th);
			}
			table.appendChild(tr);
			var compteur = 0;
			$.each(customerDataList, function(index, currentSessionCustomer) {
				//for(var currentSessionCustomer in customerDataList){
				//currentSessionCustomer = JSON.parse(entity);
				//TABLE ROWS
				var tr = document.createElement('TR');
				//On ajoute l'attribut permettant d'identifier la ligne Client
				tr.setAttribute("data-identity",currentSessionCustomer.idClient); 
				//Calcul de la classe
				tr.className = (compteur % 2 == 0)?"tdPairClass":"tdImpairClass";
				compteur++;
				//console.log("current Storage Object :"+currentSessionCustomer);
				var tdNom = document.createElement('TD');
				var tdPrenom = document.createElement('TD');
				var tdSexe = document.createElement('TD');
				var tdNumeroClient = document.createElement('TD');
				var tdAdresse = document.createElement('TD');
				var tdCodePostal = document.createElement('TD');
				//Ajout du nom
				tdNom.appendChild(document.createTextNode(currentSessionCustomer.nom));
				tr.appendChild(tdNom);
				//Ajout du prenom
				tdPrenom.appendChild(document.createTextNode(currentSessionCustomer.prenom));
				tr.appendChild(tdPrenom);
				//Ajout du Sexe
				labelSexe = getSexLabelByCode(currentSessionCustomer.sexe);
				tdSexe.appendChild(document.createTextNode(labelSexe));
				tr.appendChild(tdSexe);
				//Ajout du Numéro Client
				tdNumeroClient.appendChild(document.createTextNode(currentSessionCustomer.numClient));
				tr.appendChild(tdNumeroClient);
				//Ajout de l'adresse
				tdAdresse.appendChild(document.createTextNode(currentSessionCustomer.adresse));
				tr.appendChild(tdAdresse);
				//Ajout de l'adresse
				tdCodePostal.appendChild(document.createTextNode(currentSessionCustomer.codePostal));
				tr.appendChild(tdCodePostal);
				//Rajout de la cellule dans le tableau
				table.appendChild(tr);
			});
			myTableDiv.append(table);
		}
	}
	catch(error) {
		console.log(error);
	}
}

function renderDetails(entity) {
	$('#idClient').val(entity.idClient);
	$('#nom').val(entity.nom);
	$('#prenom').val(entity.prenom);
	$('#numClient').val(entity.numClient);
	$('#adresse').val(entity.adresse);
	$('#codePostal').val(entity.codePostal);
	$('#sexe').val(entity.sexe);
}

/**
 * Methode d'aide pour convertir le formulaire à transmettre en POJO JSON
 * @returns
 */
function formToJSON() {
	var idClient = $('#idClient').val();
	return JSON.stringify({
		"idClient": idClient == "" ? null : idClient, 
				"nom": $('#nom').val(), 
				"prenom": $('#prenom').val(),
				"numClient": $('#numClient').val(),
				"adresse": $('#adresse').val(),
				"codePostal": $('#codePostal').val(),
				"sexe": $('#sexe').val()
	});
}

function getSexLabelByCode(code){
	return code == 1 ? "Homme":"Femme";
}
