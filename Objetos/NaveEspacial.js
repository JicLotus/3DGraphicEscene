function NaveEspacial () {

	
	cuerpoNave = new CuerpoNaveEspacial();
	cuerpoNave.inicializar();
	
	this.tubo = new CilindroGrid(0.2,3.5);
	this.tubo.inicializar();

	trompaNave = new TrompaNaveEspacial();
	trompaNave.inicializar();

	alaNave = new AlaNaveEspacial();

	var matrizNaveEspacial = mat4.create();
	
	this.draw = function(_u_model_view_matrix)
	{
		

		mat4.identity(matrizNaveEspacial);		
		mat4.translate(matrizNaveEspacial,matrizNaveEspacial,[60.0,0.0,1.0]);
		mat4.scale(matrizNaveEspacial,matrizNaveEspacial,[4.0,4.0,5.0]);
		
		//dibujo un tubo	
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-1.40, 0.0, 1.0]);
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [0.0,1.0,0.0]);
		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
	    this.tubo.draw();


		//dibujo un ala
		alaNave.inicializar();
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-0.5, 0.0, 1.0]);
		mat4.scale(mvMatrix, mvMatrix, [2.0, 2.0, 1.0]);
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [0.0,0.0,1.0]);
		mat4.rotate(mvMatrix, mvMatrix, 10*t, [0.0,1.0,0.0]);
		alaNave.draw(mvMatrix, _u_model_view_matrix);

		//dibujo el otro ala
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.5, 0.0, 1.0]);
		mat4.scale(mvMatrix, mvMatrix, [2.0, 2.0, 1.0]);
		mat4.rotate(mvMatrix, mvMatrix, 3*Math.PI/2, [0.0,0.0,1.0]);
		mat4.rotate(mvMatrix, mvMatrix, -10*t, [0.0,1.0,0.0]);
		alaNave.draw(mvMatrix, _u_model_view_matrix);


		//dibujo el cuerpo de la nave
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.0, 0.0, 0.0]);
//		mat4.rotate(mvMatrix, mvMatrix, 3*Math.PI/2, [1.0, 0.0, 0.0]); 
		mat4.scale(mvMatrix,mvMatrix,[1.0,1.0,2.0]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		cuerpoNave.draw();

		//dibuja la trompa	
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.0, 0.0, 1.90]);
//		mat4.rotate(mvMatrix, mvMatrix, 3*Math.PI/2, [1.0, 0.0, 0.0]); 
		mat4.scale(mvMatrix,mvMatrix,[1.0,1.0,1.0]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		trompaNave.draw();


	}
	
	this.getMatriz = function()
	{
		return matrizNaveEspacial;
	}
	
}
