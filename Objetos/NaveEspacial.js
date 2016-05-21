function NaveEspacial () {

	
	cuerpoNave = new CuerpoNaveEspacial();
	cuerpoNave.inicializar();
	
	pata = new PataNave();

	this.tubo = new CilindroGrid(0.2,1.2);
	this.tubo.setColor(102,51,0);
	this.tubo.inicializar();

	trompaNave = new TrompaNaveEspacial();
	trompaNave.inicializar();

	alaNave = new AlaNaveEspacial();
	alaNave.inicializar();

	turbina = new Turbina();
	turbina.inicializar();

	var matrizNaveEspacial = mat4.create();
	var anguloRotacionTurbina = 0.0;
	var anguloRotacionAla = Math.PI/2;
	var factorTrenAterrizaje = 1.0;
	
	this.setParametros = function(anguloTurbina, anguloAla, factorTren){
		this.anguloRotacionTurbina = anguloTurbina;
		this.anguloRotacionAla = anguloAla;
		factorTrenAterrizaje = factorTren;
	}

	this.draw = function(_u_model_view_matrix)
	{
		


		mat4.identity(matrizNaveEspacial);		
		mat4.translate(matrizNaveEspacial,matrizNaveEspacial,[20.0,0.0,0.0]);
		mat4.scale(matrizNaveEspacial,matrizNaveEspacial,[1.0,1.0,1.0]);
		
		//dibujo un tubo	
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-0.6, 0.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [0.0,1.0,0.0]);
		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
	    this.tubo.draw();


		//dibujo un ala
		alaNave.setAnguloRotacionTurbina(this.anguloRotacionTurbina);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-0.5, 0.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [0.0,0.0,1.0]);
		mat4.rotate(mvMatrix, mvMatrix, -this.anguloRotacionAla, [0.0,1.0,0.0]);
		alaNave.draw(mvMatrix, _u_model_view_matrix);

		//dibujo el otro ala
		alaNave.setAnguloRotacionTurbina(-this.anguloRotacionTurbina);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.5, 0.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, 3*Math.PI/2, [0.0,0.0,1.0]);
		mat4.rotate(mvMatrix, mvMatrix, this.anguloRotacionAla, [0.0,1.0,0.0]);
		alaNave.draw(mvMatrix, _u_model_view_matrix);

		//dibujo el cuerpo de la nave
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.0, 0.0, -1.0]);
		mat4.scale(mvMatrix,mvMatrix,[1.0,1.0,2.0]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		cuerpoNave.draw();

		//dibuja la trompa	
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.0, 0.0, 0.90]);
		mat4.scale(mvMatrix,mvMatrix,[1.0,1.0,1.0]);				

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		trompaNave.draw();


		//dibujo una pata
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.2, -0.5*factorTrenAterrizaje, 0.2]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/4, [0.0,1.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0,0.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, 2*Math.PI/2, [0.0,0.0,1.0]);
		pata.draw(mvMatrix, _u_model_view_matrix);

		//dibujo una pata
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [0.2, -0.5*factorTrenAterrizaje, -0.2]);
		mat4.rotate(mvMatrix, mvMatrix, +Math.PI/4, [0.0,1.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0,0.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, 2*Math.PI/2, [0.0,0.0,1.0]);
		pata.draw(mvMatrix, _u_model_view_matrix);

		//dibujo una pata
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-0.2, -0.5*factorTrenAterrizaje, 0.2]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI+Math.PI/4, [0.0,1.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0,0.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, 2*Math.PI/2, [0.0,0.0,1.0]);
		pata.draw(mvMatrix, _u_model_view_matrix);

		//dibujo una pata
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-0.2, -0.5*factorTrenAterrizaje, -0.2]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI-Math.PI/4, [0.0,1.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0,0.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, 2*Math.PI/2, [0.0,0.0,1.0]);
		pata.draw(mvMatrix, _u_model_view_matrix);


	}
	
	this.getMatriz = function()
	{
		return matrizNaveEspacial;
	}
	
}
