var reader = new ElementReader();
var writer = new ElementWriter();


/**
  Permet de charger le cookie qui a ete selectionne
*/
function selectEltByCookieName(cookieName){
      var cookieSelected = getCookieObjectByName(cookieName);
      //alert("cookieName"+cookieName);
      writer.InputText('nomCookieId',cookieSelected.nom);
      writer.InputText('valeurCookieId',cookieSelected.valeur);
      writer.InputInt('nbJourExpId',1);
}
/**
  Permet de supprimer un cookie apres confirmation par le client
*/
function suppEltCookieByCookieName(cookieName){
      var resp = confirm("Etes vous certain de supprimer le cookie ["+cookieName+"]?");
      if (resp) {
          //Si confirmation alors on supprime effectivement
          eraseCookie(cookieName);
          //On rafraichit ensuite le tableau
          construitCollectionPourTableau('divIdTableauCookies');
      }
}

function displayCookie(){
	document.cookie = 'ppkcookie1=monPremierTest; expires=Mon, 1 Mar 2018 00:00:00 UTC; path=/';
	document.cookie = 'ppkcookie2=encore un autre test; expires=Mon, 1 Mar 2018 00:00:00 UTC; path=/';
	var cookieCourant = getCookieValue('ppkcookie1');
	alert("Cookie :"+ cookieCourant);
}

/**
  Construit dynamiquement le tableau des cookies
  param blocTabId: Identifiant du bloc div devant contenir notre tableau
*/
function construitCollectionPourTableau(blocTabId){
    //Preparation de l'entete du tableau
    var tabColumn = new Array();
    tabColumn[0] = "Nom";
    tabColumn[1] = "Valeur";
    tabColumn[2] = "ActionU";
    tabColumn[3] = "ActionD";
    //Preparation des lignes du tableau
    var stockCookies = new Array();
    var tabCookies = document.cookie.split(';');
    for(var i=0;i < tabCookies.length;i++) {
            var cookieCourant = tabCookies[i];
            while (cookieCourant.charAt(0)==' ') {
                  cookieCourant = cookieCourant.substring(1,cookieCourant.length);
               }
               var tabCleValCookieCourant = cookieCourant.split('=');
               var nomCookie = tabCleValCookieCourant[0];
               var valCookie = tabCleValCookieCourant[1];
               //On cree le cookie a stocker
               monCookieObjetCourant = new CookieINSEE(nomCookie,valCookie);
               stockCookies[i] = monCookieObjetCourant;
      } 
      dessineTableauCookies(blocTabId,tabColumn,stockCookies);
 } 


/**
 Methode principale de validation de la saisie
*/
function formSaveCookieAndDisplayTab(){
      var nomCookie = reader.InputText('nomCookieId');
      var valCookie = reader.InputText('valeurCookieId');
      var nbDaysExpired = reader.InputInt('nbJourExpId');
      createOrUpdateCookie(nomCookie,valCookie,nbDaysExpired);
      //On construit la liste
      construitCollectionPourTableau('divIdTableauCookies');
}