function AlaNaveEspacial() {

	//Cada Ala de la nave tendrá dos turbinas
	turbina = new Turbina();

	//y tambien tendra el ala que sostiene ambas turbinas
	sostenTurbinas = new SostenTurbinas();

	var matrizDelAla = mat4.create();

	this.draw = function(matrizNaveEspacial, _u_model_view_matrix){

		mat4.identity(matrizDelAla);
		mat4.translate(matrizDelAla, matrizNaveEspacial, [0.0, 0.0, 0.0]);
		mat4.scale(matrizDelAla,matrizDelAla,[1.0,1.0,1.0]);
		gl.uniformMatrix4fv(_u_model_view_matrix, false, matrizDelAla);
   		sostenTurbinas.draw();

		mat4.identity(matrizDelAla);
		mat4.translate(matrizDelAla, matrizNaveEspacial, [0.7, 0.4, -1.9]);
		mat4.rotate(matrizDelAla, matrizDelAla, t*100, [0.0, 0.0, 1.0]);
		mat4.scale(matrizDelAla,matrizDelAla,[0.5,0.5,2.5]);
		gl.uniformMatrix4fv(_u_model_view_matrix, false, matrizDelAla);			   
		turbina.draw();

		mat4.identity(matrizDelAla);
		mat4.translate(matrizDelAla, matrizNaveEspacial, [-0.7, 0.4, -1.9])
		mat4.rotate(matrizDelAla, matrizDelAla, t*100, [0.0, 0.0, 1.0]);
		mat4.scale(matrizDelAla,matrizDelAla,[0.5,0.5,2.5]);
		gl.uniformMatrix4fv(_u_model_view_matrix, false, matrizDelAla);
		turbina.draw();


	}


	this.inicializar = function(){
		turbina.inicializar();  
		sostenTurbinas.inicializar();
	
	}
}
