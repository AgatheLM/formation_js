var reader = new ElementReader();
var writer = new ElementWriter();
//On reinitialise la session
//sessionStorage.clear();

//Retrieve customer list when application starts 
refreshTabList();

$('#btnAdd').click(function() {
	resetForm();
	return false;
});

$('#btnRaz').click(function() {
	resetSessionStorage();
	return false;
});

$('#btnSave').click(function() {
	if ($('#idClient').val() == '') {
		addCustomer();
	}
	else{
		updateCustomer();
	}
	//On rafraichit
	refreshTabList();
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
		console.log('Entree dans deleteByIdAndRefresh');
		var result = confirm("Etes vous certain de vouloir supprimer Cette entite ?");
		if (result){
			sessionStorage.removeItem(customerId);
			refreshTabList();
			console.log("Entité d'identifiant :"+customerId + ' supprimée avec succès');
		}
	} catch (e) {
		console.log(e);
	}
}

/**
 * Reinitialise le formulaire 
 * @returns
 */
function resetForm() {
	currentCustomer = {};
	renderDetails(currentCustomer); // Display empty form
}

/**
 * Reinitialise le formulaire 
 * @returns
 */
function resetSessionStorage() {
	sessionStorage.clear();
	refreshTabList();
}

/**
 * Rafraichit le tableau
 * @returns
 */
function refreshTabList() {
	console.log('refreshTabList');
	try {
		//var myTableDiv = document.getElementById("customerTableDivId");
		var myTableDiv = $('#customerTableDivId');
		//$('#customerTableDivId').val("");
		//myTableDiv.innerHTML="";
		myTableDiv.html("");
		if (sessionStorage.length >0){ //On ne fait rien si aucun client en Session
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
			//tableBody.appendChild(tr);
			table.appendChild(tr);
			var compteur = 0;
			for(var customerKeyId in sessionStorage){
				//TABLE ROWS
				var tr = document.createElement('TR');
				//On ajoute l'attribut permettant d'identifier la ligne Client
				tr.setAttribute("data-identity",customerKeyId); 
				//Calcul de la classe
				tr.className = (compteur % 2 == 0)?"tdPairClass":"tdImpairClass";
				compteur++;
				//var currentStringCustomer = sessionStorage.getObj(i);
				var currentStringCustomer = sessionStorage.getItem(customerKeyId);
				if (currentStringCustomer != null){
					console.log("current Storage Object :"+currentStringCustomer);
					var currentSessionCustomer = new Client();
					currentSessionCustomer = currentSessionCustomer.toClientObject(currentStringCustomer);
					//alert('currentSessionCustomer:'+currentSessionCustomer.nom);
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
				}
			}
			myTableDiv.append(table);
		}
	}
	catch(error) {
		console.log(error);
	}
}

/**
 * Recherche un client par son identifiant
 * @param id : Identifiant du client recherché
 * @returns
 */
function findByIdAndLoadForm(id) {
	try {
		var selectedCustomer = sessionStorage.getItem(id);
		var currentSessionCustomer = new Client();
		selectedCustomerObject = currentSessionCustomer.toClientObject(selectedCustomer);
		renderDetails(selectedCustomerObject);
		console.log('findByIdAndLoadForm: ' + id);
	} catch (e) {
		console.log(e);
	}
}
/**
 * Rajoute un client en fin de tableau et en mémoire
 * @returns
 */
function addCustomer() {
	try {
		console.log('addCustomer');
		var nomP = reader.InputText('nom');
		var prenomP = reader.InputText('prenom');
		var numClientP = reader.InputText('numClient');
		var adresseP = reader.InputText('adresse');
		var codeP = reader.InputText('codePostal');
		var sexeP = reader.InputText('sexe');
		//nomP,prenomP,numeroP,adrP,codeP,sexeP
		var currentCustomer = new Client(nomP,prenomP,numClientP,adresseP,codeP,sexeP);
		//Stockage en Session
		var customerToStringObject = currentCustomer.toString();
		sessionStorage.setItem(currentCustomer.idClient,customerToStringObject);
		//console.log("Client crée ==>"+customerToStringObject);
	}
	catch(error) {
		console.log(error);
	}

}

/**
 * Met à jour un client
 * @returns
 */
function updateCustomer() {
	try {
		var nomP = reader.InputText('nom');
		var prenomP = reader.InputText('prenom');
		var numClientP = reader.InputText('numClient');
		var adresseP = reader.InputText('adresse');
		var codeP = reader.InputText('codePostal');
		var sexeP = reader.InputText('sexe');
		var currentCustomer = new Client(nomP,prenomP,numClientP,adresseP,codeP,sexeP);
		currentCustomer.idClient = reader.InputText('idClient');
		//Stockage en Session
		var customerToStringObject = currentCustomer.toString();
		sessionStorage.setItem(currentCustomer.idClient,customerToStringObject);
	} catch (e) {
		console.log(e);
	}
	console.log('updateCustomer');
}

/**
 * Rafraichit le formulaire pour une éventuelle mise à jour
 * @param entity
 * @returns
 */
function renderDetails(entity) {
	try {
		$('#idClient').val(entity.idClient);
		$('#nom').val(entity.nom);
		$('#prenom').val(entity.prenom);
		$('#numClient').val(entity.numClient);
		$('#adresse').val(entity.adresse);
		$('#codePostal').val(entity.codePostal);
		$('#sexe').val(getSexLabelByCode(entity.sexe));
		//document.getElementById("idClient").value = entity.idClient;
	} catch (e) {
		console.log(e);
	}
}

function getSexLabelByCode(code){
	return code == 1 ? "Homme":"Femme";
}
