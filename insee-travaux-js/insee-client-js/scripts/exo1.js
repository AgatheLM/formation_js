
/*************************
* Exercice 1             *
*************************/

function main(){
	
	// Exercice 1
	try{
		// 1 - Demande à l'utilisateur
		var largeur = prompt ('Renseigner la largeur?','');
		var longueur = prompt ('Renseigner la longueur?','');
		//2. Appel aux fonctions utilitaires
		var surface=calculSurface(longueur, largeur);
		var perimetre=calculPerimetre(longueur, largeur);
		//3. Affichage du résultat
		alert ("La surface est de " + surface);
		alert ("Le périmètre est de " + perimetre);
	} catch(e) {
		console.log(e);
	}
	
	
}


	function calculSurface (longueur, largeur)  {
		try {
			surface=longueur*largeur;
			return surface;
		} catch(e){
			console.log(e);
		}
		
	}
	
	function calculPerimetre (longueur, largeur){
		try {
			perimetre=2*longueur+2*largeur;
			return perimetre;
		}catch(e){
			console.log(e);
		}

	}
