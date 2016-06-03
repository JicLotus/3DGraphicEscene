function AlaNaveEspacial() {

	//Cada Ala de la nave tendrá dos turbinas
	turbina = new Turbina();

	//y tambien tendra el ala que sostiene ambas turbinas
	sostenTurbinas = new SostenTurbinas();

	var matrizDelAla = mat4.create();
	var anguloRotacionTurbina = 0.0;

	this.setAnguloRotacionTurbina = function(anguloTurbina){
		this.anguloRotacionTurbina = anguloTurbina;
	}

	this.draw = function(matrizNaveEspacial){

		mat4.identity(matrizDelAla);
		mat4.translate(matrizDelAla, matrizNaveEspacial, [0.0, 0.0, 0.0]);
		mat4.scale(matrizDelAla, matrizDelAla, [2.0,2.0,2.0]);

   		sostenTurbinas.draw(matrizDelAla);

		mat4.identity(matrizDelAla);
		mat4.translate(matrizDelAla, matrizNaveEspacial, [1.0, 0.8, 0.0]);
		mat4.rotate(matrizDelAla, matrizDelAla, this.anguloRotacionTurbina, [0.0, 1.0, 0.0]);
		mat4.scale(matrizDelAla,matrizDelAla,[0.5,0.5,1.5]);

		turbina.draw(matrizDelAla);

		mat4.identity(matrizDelAla);
		mat4.translate(matrizDelAla, matrizNaveEspacial, [-1.0, 0.8, 0.0])
		mat4.rotate(matrizDelAla, matrizDelAla, this.anguloRotacionTurbina, [0.0, 1.0, 0.0]);
		mat4.scale(matrizDelAla,matrizDelAla,[0.5,0.5,1.5]);

		turbina.draw(matrizDelAla);

	}


	this.inicializar = function(){
		turbina.inicializar();  
		sostenTurbinas.inicializar();
	
	}
}
