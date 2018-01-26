var reader = new ElementReader();
var writer = new ElementWriter();
//On reinitialise la session
//sessionStorage.clear();

//Retrieve customer list when application starts 
refreshTabList();

//Reinitialisation de la session
$('#btnRaz').click(function() {
	resetForm();
	sessionStorage.clear();
	//On rafraichit
	refreshTabList();
	return false;
});


//Reinitialisation du formulaire
$('#btnAdd').click(function() {
	resetForm();
	return false;
});

//Ecouter de clic sur le bouton "save"
$('#btnSave').click(function() {
	if ($('#idClient').val() == '') {
		addCustomer();
	}
	else{
		updateCustomer();
	}
	//On rafraichit
	refreshTabList();
	resetForm();
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
	resetForm();
});

/**
 * Supprime et rafraichit un client par son identifiant
 * @param customerId : Identifiant de l'objet qu'on desire supprimer
 * @returns
 */
function deleteByIdAndRefresh(customerId){
	try {
		console.log('Entree dans deleteByIdAndRefresh');
		pString=sessionStorage.getItem(customerId);
		 if(pString!=null){			
			var c = new Client();
			c=c.toClientObject(pString);
		 }		
		if(confirm("Vous allez supprimer le client "+ c.nom +" " + c.prenom+", voulez vous valider?")){
			sessionStorage.removeItem(customerId);
		}
		// Raffrachissement du tableau
		refreshTabList();
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
 * Rafraichit le tableau
 * @returns
 */
function refreshTabList() {
	console.log('refreshTabList');
	try {
		var myTableDiv = document.getElementById("customerTableDivId"); //ou var myTableDiv = $('#customerTableDivId');
		// On vide a chaque fois la div
		myTableDiv.innerHTML="";  //Ou myTableDiv.html("");
		//TODO 3 : construisez dynamiquement le tableau ici
		
		// tableau à créer dans customerTableDivId
		var tableau=document.createElement("table");
		// On ajoute une ligne d'entête
			var ligneEnTete=document.createElement("tr");
			var c1=document.createElement("th");
			var c2=document.createElement("th");
			var c3=document.createElement("th");
			var c4=document.createElement("th");
			var c5=document.createElement("th");
			var c6=document.createElement("th");
			t1=document.createTextNode("Nom");
			t2=document.createTextNode("Prenom");
			t3=document.createTextNode("Sexe");
			t4=document.createTextNode("Numéro client");
			t5=document.createTextNode("Code Postal");
			t6=document.createTextNode("Adresse");
			c1.appendChild(t1);
			c2.appendChild(t2);
			c3.appendChild(t3);
			c4.appendChild(t4);
			c5.appendChild(t5);
			c6.appendChild(t6);
			ligneEnTete.appendChild(c1);
			ligneEnTete.appendChild(c2);
			ligneEnTete.appendChild(c3);
			ligneEnTete.appendChild(c4);
			ligneEnTete.appendChild(c5);
			ligneEnTete.appendChild(c6);
			ligneEnTete.className="ligneTitre";
			tableau.appendChild(ligneEnTete);
			
			// Mise en forme du tableau
			tableau.className="table";

			//On ajoute des lignes par client
			 var numLigne=0;
			 for (var cle in sessionStorage) {
				 pString=sessionStorage.getItem(cle);
				 if(pString!=null){					
					console.log(pString);
					// On réconstruit l'objet client à partir de la clé
					var p = new Client();
					p=p.toClientObject(pString);
					var ligneP=document.createElement("tr");
					//On ajoute l'attribut permettant d'identifier la ligne Client
					ligneP.setAttribute("data-identity",cle); 
					// Nom
					var cp1=document.createElement("td");
					tp1=document.createTextNode(p.nom);
					cp1.appendChild(tp1);
					ligneP.appendChild(cp1);
					// Prenom
					var cp2=document.createElement("td");
					tp2=document.createTextNode(p.prenom);
					cp2.appendChild(tp2);
					ligneP.appendChild(cp2);
					// Sexe
					var cp3=document.createElement("td");
					tp3=document.createTextNode(p.sexe);
					cp3.appendChild(tp3);
					ligneP.appendChild(cp3);
					// Numéro Client
					var cp4=document.createElement("td");
					tp4=document.createTextNode(p.numClient);
					cp4.appendChild(tp4);
					ligneP.appendChild(cp4);
					// Code postal
					var cp5=document.createElement("td");
					tp5=document.createTextNode(p.codePostal);
					cp5.appendChild(tp5);
					ligneP.appendChild(cp5);
					// Adresse
					var cp6=document.createElement("td");
					tp6=document.createTextNode(p.adresse);	
					cp6.appendChild(tp6);	
					ligneP.appendChild(cp6);
					// Style
					if (numLigne %2 == 0){
						ligneP.className = "ligneImpaire";
					}else{
						ligneP.className = "lignePaire";
					}
					numLigne ++;
					// Ajout de la ligne au tableau
					tableau.appendChild(ligneP);
				}
			}
			
			myTableDiv.append(tableau);
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
		pString=sessionStorage.getItem(id);
		 if(pString!=null){			
			console.log(pString);
			var selectedCustomerObject = new Client();
			selectedCustomerObject=selectedCustomerObject.toClientObject(pString);
		 }
		//TODO 4 : Renseignez les instructions nécessaires pour recupérer l'utilisateur en session avec son ID
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
		// On crée le client
		p = new Client($('#nom').val(),$('#prenom').val(),$('#numClient').val(),$('#adresse').val(),$('#codePostal').val(),$('#sexe').val());
		//TODO 2 : Rajouter ici les instructions pour le stockage
		// On passe en session l'id comme clé et l'instance EN STRING comme valeur
		sessionStorage.setItem(p.idClient,p.toString());
		//La construction du tableau doit se définir dans la méthode ci après
		refreshTabList();
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
		console.log('updateCustomer');
		// On crée le client
		pString=sessionStorage.getItem($('#idClient').val());
		 if(pString!=null){			
				console.log(pString);
				var c = new Client();
				c=c.toClientObject(pString);
				c.nom=$('#nom').val();
				 c.prenom=$('#prenom').val();
				 c.numClient=$('#numClient').val();
				 c.adresse=$('#adresse').val();
				 c.codePostal=$('#codePostal').val();
				 c.sexe=$('#sexe').val();
				// On passe en session l'id comme clé et l'instance EN STRING comme valeur
				 sessionStorage.setItem(c.idClient,c.toString());
				//La construction du tableau doit se définir dans la méthode ci après
				refreshTabList();	
		 }
	} catch (e) {
		console.log(e);
	}
	console.log('updateCustomer');
}

/**
 * Rafraichit le formulaire pour une éventuelle mise à jour
 * @param entity : instance de la classe Client portant l'entité dont les champs doivent être affichés
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
		$('#sexe').val(entity.sexe);
	} catch (e) {
		console.log(e);
	}
}

function getSexLabelByCode(code){
	return code == 1 ? "Homme":"Femme";
}
