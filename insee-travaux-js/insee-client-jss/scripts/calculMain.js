 function calculateSalary() {
	 try {
		 var reader = new ElementReader();
	      var writer = new ElementWriter();
	      var nomP = reader.InputText('Nom');
	      var anneeEmbaucheP = reader.InputInt('anneeEmbauche');
	      var salaireMensuelP = reader.InputInt('salaireM');
	      var nbAppP,noteMoyP,pourcentP,chiffreMoyP,nbClientP;
	      
	      var typePersonnel = reader.Select('typePersonne');
	     if (typePersonnel == '0'){
	        nbAppP = reader.InputInt('nbApp');
	        noteMoyP = reader.InputInt('noteMoy');
	     } else {
	        chiffreMoyP = reader.InputInt('chiffMoy');
	        nbClientP = reader.InputInt('nbClient');
	        pourcentP = reader.InputInt('pourcent');
	     }

	     var dev = new Developpeur(nomP,anneeEmbaucheP,salaireMensuelP,nbAppP,noteMoyP);
	     var com = new Commercial(nomP,anneeEmbaucheP,salaireMensuelP,nbClientP,chiffreMoyP,pourcentP);

	     var devJSON = JSON.stringify(dev);
	     console.log("DEV En JSON :" +devJSON);
	     
	     var labelSalaireAnnuel;
	     var labelAnciennete;
	     var personnelObject;
	     if (typePersonnel == '0'){
	        personnelObject = dev;
	     } else {
	        personnelObject = com;
	     }
	     labelSalaireAnnuel = personnelObject.getTypePersonnel() + ' > ' + personnelObject.getSalaireAnnuel();
	     labelAnciennete  = personnelObject.getTypePersonnel() + ' > ' + personnelObject.getAnciennete();
	      //getTypePersonnel
	      writer.Tag('salaireAnnuelResult',    labelSalaireAnnuel);
	      writer.Tag('ancienneteResult', labelAnciennete);
	      writer.Tag('toStringResult', personnelObject);
	} catch (e) {
		console.log(e);
	}
      

    }
  
 function clicSelect(){
   var reader = new ElementReader();
   var writer = new ElementWriter();
   //nom,anneeEmbaucheP,salaireMensuelP,nbClientP,chiffreMoyP,pourcentP
   var typePersonnel = reader.Select('typePersonne');
   if (typePersonnel == '0'){
    //On cache les blocs pour le commercial
    writer.hideElement('pourcentageDivId');
    writer.hideElement('chiffreMoyDivId');
    writer.hideElement('nbClientDivId');
    //On affiche les blocs pour le developpeur
    writer.showElement('nbAppDivId');
    writer.showElement('noteMoyDivId');
   }else {//L'inverse 
    writer.showElement('pourcentageDivId');
    writer.showElement('chiffreMoyDivId');
    writer.showElement('nbClientDivId');
    //On cache les blocs pour le developpeur
    writer.hideElement('nbAppDivId');
    writer.hideElement('noteMoyDivId');
   }
   writer.Tag('salaireAnnuelResult',    "");
   writer.Tag('ancienneteResult', "");
   writer.Tag('toStringResult', "");
 } 

function resetAll() {
      var writer = new ElementWriter();
      var results = ['salaireAnnuelResult', 'ancienneteResult'];
      for (var i = 0; i < results.length; i++) {
        writer.Tag(results[i], '');
      }
    }