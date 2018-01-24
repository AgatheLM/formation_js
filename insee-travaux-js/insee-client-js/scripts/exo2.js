/*************************
* Exercice 2             *
*************************/
	
	function main_exo2(){
		
		/*Exercice 2 : Manipulation des tableaux
		Nous souhaitons afficher les éléments d’un tableau selon l’indice fourni par un utilisateur. 
		Cette action sera répétée autant de fois jusqu’à ce que l’utilisateur saisisse le nombre « -1 » pour sortir. 
		Travail à faire :
		- Coder une fonction qui initialisera le tableau ci dessous :
		var tab = new Array("Hollande","ZOME","Sarkozy","LE PEN","LE MAIRE","VALLS"
		- Faire pointer l’action du bouton sur cette nouvelle fonction. 
		*/
			
		try{
			var tab = initTableau();
			var max=tab.length;
			var i = 0;
			while (i!=-1 ){
				i = parseInt(prompt ('Quel élément voulez vous?'));
				if ( i<max){
					alert(afficheElement(tab,i));
					//i = prompt ('Quel élément voulez vous?');	
				} else  {
					alert ("Indice incorrect, il n'y a que " + max + " élements");
					//i = prompt ('Quel élément voulez vous?');				
				}
			}	
			
		} catch(e) {
			console.log(e);
		}
		
		
	}

	function initTableau(){
		return new Array("Hollande","ZOME","Sarkozy","LE PEN","LE MAIRE","VALLS");
	}
	
	
	function afficheElement(tab, i){
		return tab[i];
	}
