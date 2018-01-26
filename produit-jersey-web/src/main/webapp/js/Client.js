/*Definition de la classe Client */

var  Client = function(nomP,prenomP,numeroP,adrP,codeP,sexeP){ 
	    //L'identifiant est attribué par le système
		this.idClient = Date.now();
		this.nom = nomP;
		this.prenom = prenomP;
		this.numClient = numeroP;
		this.adresse = adrP;
		this.codePostal = codeP;
		this.sexe = sexeP;
}


Client.prototype.toString = function toString(){
  return this.idClient + '|'+ this.nom + '|'+ this.prenom + '|' +this.adresse+ '|'+ this.codePostal + '|'+ this.numClient+'|'+ this.sexe;
}

Client.prototype.toClientObject = function (clientInString){
		var arrayOfStrings = clientInString.split('|');
		this.idClient = arrayOfStrings[0];
		this.nom = arrayOfStrings[1];
		this.prenom = arrayOfStrings[2];
		this.numClient = arrayOfStrings[5];
		this.adresse = arrayOfStrings[3];
		this.codePostal = arrayOfStrings[4];
		this.sexe = arrayOfStrings[6];
	  return this;
	}

