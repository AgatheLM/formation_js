
	
/*************************
* Exercice 4             *
*************************/
	
	function verifForm(){
		try{
			var nom = document.getElementById("nom").value;
			var an = document.getElementById("an").value;
			var email = document.getElementById("email").value;
			var cp = document.getElementById("cp").value;
			var ok=true;
			erreur_nom.innerHTML="";
			erreur_an.innerHTML="";
			erreur_email.innerHTML="";
			erreur_cp.innerHTML="";
			//Un champ « nom » : Ce champ doit être obligatoire
			if (nom==''){
				erreur_nom.innerHTML="Le nom doit être renseigné";
				ok=false
			}
			//Un champ « annee_naissance » : Ce champ s’il est renseigné ne doit accepter que des nombres numériques
			if (!isAnValide(an)){
				erreur_an.innerHTML="Année de naissance non valide";
				ok=false
			}
			
			//Un champ email : Si ce champ est renseigné l’email doit être valide avant de perdre le focus
			if (!isEmail(email)){
				erreur_email.innerHTML="Email invalide";
				ok=false
			}
			//Un champ code postal : le code Postal doit être un nombre à 5 chiffres s’il est renseigné.
			if (cp.length!=5){
				erreur_cp.innerHTML='CP non valide';
				ok=false
			}
			if (ok==true){
				reinit_form();
			}
			
		return ok;
		}catch(e){
			console.log(e);
		}
	}
	
	 function isEmail(myVar){
	     // La 1ère étape consiste à définir l'expression régulière d'une adresse email
	     var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

	     return regEmail.test(myVar);
	   }
	 
	 function isNumber(){
		 var cp = document.getElementById("cp").value;
		 var last = cp.charAt(cp.length-1);
		 if (isNaN(parseInt(last))){
			 	document.getElementById("cp").value=cp.substr(0,cp.length-1);
				erreur_cp.innerHTML='Il faut saisir un chiffre';
			}else{
				erreur_cp.innerHTML='';
			}
			
	   }
	 
	 function isEmailValide(){
		 var email = document.getElementById("email").value;
		 if (!isEmail(email)){
				erreur_email.innerHTML="Email invalide";
		}else{
			erreur_email.innerHTML="";
		}
	   }
	 
	 function isAnValide(an){		 
		var today=new Date();
		var annee = today.getFullYear();
		 if (isNaN(parseInt(an))){
				erreur_an.innerHTML="Année de naissance non valide";
				return false;
			}else if (an>annee){
				erreur_an.innerHTML="Année de naissance non valide";
				return false;
			}else{
				return true;
			}
	   }
	 
	 
	 function reinit_form(){
		 erreur_nom.innerHTML="";
		 erreur_email.innerHTML="";
		 erreur_an.innerHTML="";
		 erreur_cp.innerHTML="";
	 }
	