
	/*************************
	* Exercice 3             *
	*************************/	
	
	function main_exo3(){		
		/*Exercice 3 : Faire une calculette*/
			
		try{
			var resul;
			var v1 = parseFloat(document.getElementById("val1").value);
			var v2 = parseFloat(document.getElementById("val2").value);
			var op = document.getElementById("operateur").value;
			resul=calcul(v1,v2,op);
			result.innerHTML=resul;
			
		} catch(e) {
			console.log(e);
		}
				
	}


	
	function main_exo3_reinit(){		
		/*Exercice 3 : Faire une calculette*/
			
		try{
			//document.getElementById("val1").value="";
			//document.getElementById("val2").value="";
			//document.getElementById("operateur").value="none";
			result.innerHTML="";
			
		} catch(e) {
			console.log(e);
		}
				
	}
	
	function calcul (v1,v2,op){
		try{
			var resul;
			switch(op){
			case "+" :
				resul = v1 + v2
				break;
			case "-" :
				resul = v1-v2
				break;
			case "*" :
				resul = v1*v2
				break;
			case "/" :
				if(v2!=0){
					resul = v1/v2
				}else{
					resul=0;
					alert("On ne peut pas diviser par 0");
					main_exo3_reinit();
				}
				break;
			}
			return resul;
		}catch(e){
			console.log(e);
		}

	}