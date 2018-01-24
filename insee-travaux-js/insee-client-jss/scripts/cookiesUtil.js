 //Classe Pour un CookieINSEE
 function CookieINSEE(nomP,valeurP){
 	this.nom=nomP;
 	this.valeur=valeurP;
 }

 /*
  Renvoie la valeur d'un cookie par son name
 */
 function getCookieValue(name){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

  /*
   Cree un nouveau cookie (ou met a jour l'existant)
   param name : Nom du cookie à créer
   param value : Valeur du cookie
   param days : Nombre de jour de validite 
  */
  function createOrUpdateCookie(name,value,days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else { 
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

/**
 Supprime un cookie dans le navigateur
*/
function eraseCookie(name) {
    createOrUpdateCookie(name,"",-1);
}
/**
 Permet de recuperer un cookie par son nom (identique a la fonction getCookieValue)
*/
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') 
            c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}



/**
    Dessine un tableau
    param blocTabId : Identifiant du tableau dans le Html
    param tabHeadingArray : Array des entetes du tableau
    param tabObjetCookiesArray : Array contenant la liste des objets cookies  du navigateur
**/
function dessineTableauCookies(blocTabId,tabHeadingArray,tabObjetCookiesArray){
			var myTableDiv = document.getElementById(blocTabId);
			myTableDiv.innerHTML="";
            var table = document.createElement('TABLE');

            table.border = '10'


            //TABLE COLUMNS
            var tr = document.createElement('TR');
            //tableBody.appendChild(tr);
            table.appendChild(tr);
            for (i = 0; i < tabHeadingArray.length; i++) {
                var th = document.createElement('TH')
                th.width = '200';
                th.appendChild(document.createTextNode(tabHeadingArray[i]));
                tr.appendChild(th);
            }
            
            for (i = 0; i < tabObjetCookiesArray.length; i++) {
            	//TABLE ROWS
            	var tr = document.createElement('TR');
                tr.className="tdPairClass";

            	var cookieObjectCourant = tabObjetCookiesArray[i];
                //alert('cookieObjectCourant:'+cookieObjectCourant.nom);
            	var tdNom = document.createElement('TD');
            	var tdValeur = document.createElement('TD');
            	var tdActionU = document.createElement('TD');
            	var tdActionD = document.createElement('TD');
            	//Ajout du nom
            	tdNom.appendChild(document.createTextNode(cookieObjectCourant.nom));
            	tr.appendChild(tdNom);
            	//Ajout de la valeur
            	tdValeur.appendChild(document.createTextNode(cookieObjectCourant.valeur));
            	tr.appendChild(tdValeur);
            	//Ajout de l'action U
				var strButtonModifierAction="<input type='button' id="+cookieObjectCourant.nom+" onclick='selectEltByCookieName(this.id)' value='Charger'/>" ;
            	tdActionU.innerHTML = strButtonModifierAction;
            	tr.appendChild(tdActionU);
            	
                //Ajout de l'action D
                var strButtonSupprimerAction="<input type='button' id="+cookieObjectCourant.nom+" onclick='suppEltCookieByCookieName(this.id)' value='Supprimer'/>" ;
            	tdActionD.innerHTML= strButtonSupprimerAction;
            	tr.appendChild(tdActionD);
                table.appendChild(tr);
            }
            myTableDiv.appendChild(table)
        }

/*
Renvoie un Objet cookie par son nom
*/
function getCookieObjectByName(cookieNameP){
    var tabCookies = document.cookie.split(';');
    for(var i=0;i < tabCookies.length;i++) {
        var cookieCourant = tabCookies[i];
        while (cookieCourant.charAt(0)==' ') {
            cookieCourant = cookieCourant.substring(1,cookieCourant.length);
           }
           var tabCleValCookieCourant = cookieCourant.split('=');
           var nomCookie = tabCleValCookieCourant[0];
           var valCookie = tabCleValCookieCourant[1];
           if (cookieNameP == nomCookie){
            return new CookieINSEE(nomCookie,valCookie);
           }
    } 
}