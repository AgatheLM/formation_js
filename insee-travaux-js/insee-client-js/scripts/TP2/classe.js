/*******************************************************************************
 * Personnel *
 ******************************************************************************/

function Personnel(nom, anEmbauche, salaireM) {
	// Attributs
	this.nom = nom;
	this.anEmbauche = anEmbauche;
	this.salaireM = salaireM;
}

//Méthodes
Personnel.prototype.getSalaireA = function() {
	return 12 * this.salaireM;
}
Personnel.prototype.getAnciennete = function() {
	var today=new Date();
	var anneeEnCours = today.getFullYear();
	return anneeEnCours-this.anEmbauche;
}
Personnel.prototype.personnelToString = function() {
	return "M. "+this.nom +  " gagne " + this.getSalaireA() + " € par an et a "+this.getAnciennete()+" ans d'ancienneté.";
}

/*******************************************************************************
 * Developpeur *
 ******************************************************************************/

function Developpeur(nom, anEmbauche, salaireM, nbApp, note) {
	// Attributs parents
	Personnel.call(this, nom, anEmbauche, salaireM);
	// Attributs propres
	this.nbApp = nbApp;
	this.note = note;
}
Developpeur.prototype= new Personnel();
/*******************************************************************************
 * Commercial *
 ******************************************************************************/

function Commercial(nom, anEmbauche, salaireM, nbClient, caMoy, pourcent) {
	// Attributs parents
	Personnel.call(this, nom, anEmbauche, salaireM);
	// Attributs propres
	this.nbClient = nbClient;
	this.caMoy = caMoy;
	this.pourcent=pourcent;
}

//Méthodes
/**On instancie le fait que commercial est une instance de personnel pour pouvoire hériter des méthodes*/
Commercial.prototype= new Personnel();
Commercial.prototype.getSalaireA = function(){
	var salaireA = this.constructor.prototype.getSalaireA.call(this) + (this.caMoy*this.pourcent/100);
	return salaireA;
}

