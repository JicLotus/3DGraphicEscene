function clickear(event) {
		 clickPresionado = true;
}

function desclickear(event) {
		 clickPresionado = false;
}

function coordenadas(event) {

	var canvas = document.getElementById('my-canvas');

	var rect = canvas.getBoundingClientRect();// check if your browser supports this

	//El mx es el angulo de rotacion hacia la izquierda/derecha en la vista dentro de la estacion
	//el my es el angulo de rotacion hacia arriba/abajo en la vista dentro de la estacion
	mx -= (event.clientX+rect.width/2)-xAnt;
	my -= (event.clientY+rect.height/2)-yAnt;

	if (camara==4&&clickPresionado){

		//la rotacion horizontal y vertical son las rotaciones de camaara en la vista del universo
		rotacionHorizontal -= event.clientX - xAnt2;
		rotacionVertical -= event.clientY-yAnt2;
//                    xAnt2 = event.clientX;
//                    yAnt2 = event.clientY;
	}

	//el xAnt e yAnt guardan las coordenadas del mouse de la vista dentro de la estacion 
	xAnt = (event.clientX+rect.width/2);
	yAnt = (event.clientY+rect.height/2);

	//el xAnt2 e yAnt2 guardan las coordenadas del mouse de la vista del universo
	xAnt2 = event.clientX;
	yAnt2 = event.clientY;

	
}

function myKeyNotPressed(event){
	var keynum;
	if(window.event) { // IE                    
	  keynum = event.keyCode;
	} else if(event.which){ // Netscape/Firefox/Opera                   
	  keynum = event.which;
	}
	if(event.keyCode == 38)  naveEspacial.onTeclaUp(naveEspacial.TECLA_ARRIBA);      //S
	if(event.keyCode == 39)  naveEspacial.onTeclaUp(naveEspacial.TECLA_IZQUIERDA);  // A
	if(event.keyCode == 37)  naveEspacial.onTeclaUp(naveEspacial.TECLA_DERECHA);  // D    
	if(event.keyCode == 69)  naveEspacial.onTeclaUp(naveEspacial.TECLA_GIRO_ANTIHORARIO);  // q
	if(event.keyCode == 81)  naveEspacial.onTeclaUp(naveEspacial.TECLA_GIRO_HORARIO);
	if(event.keyCode ==173)  naveEspacial.onTeclaUp(naveEspacial.TECLA_MENOS);   // e
	if(event.keyCode ==61 )  naveEspacial.onTeclaUp(naveEspacial.TECLA_MAS);
	if(event.keyCode == 40)  naveEspacial.onTeclaUp(naveEspacial.TECLA_ABAJO);

}

function myKeyPress(e){
	var keynum;

	if(window.event) { // IE                    
	  keynum = e.keyCode;
	} else if(e.which){ // Netscape/Firefox/Opera                   
	  keynum = e.which;
	}


	if(e.keyCode == 38)  naveEspacial.onTeclaDown(naveEspacial.TECLA_ARRIBA);      //flechaAbajo
	if(e.keyCode == 39)  naveEspacial.onTeclaDown(naveEspacial.TECLA_IZQUIERDA);  // flechaIzquierda
	if(e.keyCode == 37)  naveEspacial.onTeclaDown(naveEspacial.TECLA_DERECHA);  // flechaDerecha    
	if(e.keyCode == 69)  naveEspacial.onTeclaDown(naveEspacial.TECLA_GIRO_ANTIHORARIO);  // q
	if(e.keyCode == 81)  naveEspacial.onTeclaDown(naveEspacial.TECLA_GIRO_HORARIO);   // e
	if(e.keyCode ==61)  naveEspacial.onTeclaDown(naveEspacial.TECLA_MAS);      
	if(e.keyCode == 40)  naveEspacial.onTeclaDown(naveEspacial.TECLA_ABAJO);   //flechaArriba
	if(e.keyCode ==173)  naveEspacial.onTeclaDown(naveEspacial.TECLA_MENOS);
	 

	if (keynum==49){
		anguloRotacionAla+=Math.PI/128;
	}
	if (keynum==83){ //S
		right+=0.01;
	}
	if (keynum==87){ //W
		right-=0.01;
	}
	if (keynum==65){ //a
		caminarHorizontalmente-=0.01;
	}
	if (keynum==68){
		caminarHorizontalmente+=0.01;
	}
	else if (keynum==50){
		anguloRotacionAla-=Math.PI/128;                    
	}
   else if (keynum==51){
		anguloRotacionTurbina+=Math.PI/128;
	}
   else if (keynum==52){
		anguloRotacionTurbina-=Math.PI/128;
	}
   else if (keynum==53){
		factorTrenAterrizaje=0.5;
	}
   else if (keynum==54){
		factorTrenAterrizaje=1.0;
	}
   else if (keynum==97){
		camara = 1;
	}
   else if (keynum==98){
		camara = 2;
	}
	else if (keynum==99){
		camara = 3;
	}
	else if (keynum==100){
		camara = 4;
	}
   else if (keynum==55){
		anguloPaneles=Math.PI/2;
		if (nivelCierre > 0){
			nivelCierre -= 1;
		}
	}
   else if (keynum==56){
		if (nivelCierre > 3){
			anguloPaneles=0.0;
		}else{
			nivelCierre += 1;
		}
	}

}

function ruedita(e){
	if (e.wheelDelta==120)
		upDown+=0.1;
	else if (e.wheelDelta==-120)
		upDown-=0.1;
}

