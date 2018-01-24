/*Definition de la classe Personnel */

var  Personnel = function(nomP,anneeEmbaucheP,salaireMensuelP){ 
		this.nom = nomP;
		this.anneeEmbauche = anneeEmbaucheP;
		this.salaireMensuel = salaireMensuelP;
}

Personnel.prototype.getSalaireAnnuel = function(){
	return this.salaireMensuel * 12;
}
Personnel.prototype.getAnciennete = function(){
		var dateAuj = new Date();
		var anneeCourante = dateAuj.getFullYear();
		return anneeCourante - this.anneeEmbauche;
}

Personnel.prototype.toString = function persToString(){
  return 'M. '+this.nom + ' (Personnel) a gagné '+ this.getSalaireAnnuel() +' euros'+ ' et a '+this.getAnciennete()+ ' ans d\'anciennete';
}

/*Definition de la classe Developpeur */
var  Developpeur = function(nomP,anneeEmbaucheP,salaireMensuelP,nbAppP,noteMoyP){
		Personnel.call(this,nomP,anneeEmbaucheP,salaireMensuelP);
		this.nbApp = nbAppP;
		this.noteMoyenne = noteMoyP;
}

Developpeur.prototype.toString = function devToString(){
  return 'M. '+this.nom + ' (Developpeur) a gagné '+ this.getSalaireAnnuel() +' euros'+ ' et a '+this.getAnciennete()+ ' ans d\'anciennete';
}

//Heritage des methodes de la classe Personnel
Developpeur.prototype = new Personnel();
Developpeur.prototype.getTypePersonnel = function(){
	return '[Developpeur]';
}
//Definition de la classe Commercial

var  Commercial = function(nomP,anneeEmbaucheP,salaireMensuelP,nbClientP,chiffreMoyP,pourcentP){
		Personnel.call(this,nomP,anneeEmbaucheP,salaireMensuelP);
		this.nbClient = nbClientP;
		this.chiffreMoy = chiffreMoyP;
		this.pourcent = pourcentP;
}

//Heritage des methodes de la classe Personnel
Commercial.prototype = new Personnel();

Commercial.prototype.getSalaireAnnuel = function(){
	var salaireAnnuelTmp = this.constructor.prototype.getSalaireAnnuel.call(this);
	chiffreMoyTmp = (this.chiffreMoy * (this.pourcent/100)) + this.chiffreMoy;
	salaireAnnuelTmp += chiffreMoyTmp;
	return salaireAnnuelTmp;
}

Commercial.prototype.toString = function persToString(){
  return 'M. '+this.nom + ' (Commercial) a gagné '+ this.getSalaireAnnuel() +' euros'+ ' et a '+this.getAnciennete()+ ' ans d\'anciennete';
}

Commercial.prototype.getTypePersonnel = function(){
	return '[Commercial]';
}


