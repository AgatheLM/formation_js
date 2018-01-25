//The root URL for the RESTful services
var URL_ROOT = "http://localhost:8082/eproduit-web/rest/clients/";

var currentCustomer;

//Retrieve wine list when application starts 
findAllOnServer();

//Register listeners
$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});

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
		var ok = confirm("Etes vous certain de vouloir supprimer Cette entite ?");
		if (ok){
			$.ajax({
				type: 'DELETE',
				url: URL_ROOT + customerId,
				success: function(data, textStatus, jqXHR){
					refreshTabList(data);
					//On reinitialise le formulaire après suppression
					resetForm();
					alert('Customer deleted successfully');
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert('deleteByIdAndRefresh error');
				}
			});
			
		}
	} catch (e) {
		console.log(e);
	}

}

function search(searchKey) {
	if (searchKey == '') 
		findAllOnServer();
	else
		findByName(searchKey);
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

function findByName(searchKey) {
	try {
		console.log('findByName: ' + searchKey);
		$.ajax({
			type: 'GET',
			url: URL_ROOT + 'search/' + searchKey,
			dataType: "json",
			success: function(data){
				refreshTabList(data);
				resetForm();
			} 
		});
	} catch (e) {
		console.log(e);
	}
}

function findByIdAndLoadForm(customerId) {
	console.log('findByIdAndLoadForm: ' + customerId);
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8082/eproduit-web/rest/clients/' + customerId,
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
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: URL_ROOT,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Customer created successfully');
			$('#idClient').val(data.idClient);
			findAllOnServer();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addCustomer error: ' + textStatus);
		}
	});
}

function updateCustomer() {
	console.log('updateCustomer');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: URL_ROOT + $('#idClient').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Customer updated successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateCustomer error: ' + textStatus);
		}
	});
	findAllOnServer();
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

//Helper function to serialize all the form fields into a JSON string
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
