function NaveEspacial () {

	var posicion=vec3.fromValues(0,0,0);

	this.TECLA_ARRIBA=0;
	this.TECLA_ABAJO=1;
	this.TECLA_IZQUIERDA=2;
	this.TECLA_DERECHA=3;
	this.TECLA_MAS=4;
	this.TECLA_MENOS=5;
	this.TECLA_GIRO_HORARIO=6;
	this.TECLA_GIRO_ANTIHORARIO=7;

	var estadoTeclas=[false,false,false,false,false,false];
	var rotacion=mat4.create();
	mat4.identity(rotacion);

	var momento=vec3.fromValues(0,0,0);
	var potenciaMotor=0.01;

	var velocidad=0;
	var angCabezeo=0; // Z
	var angRolido=0; // respecto del X de la Nave
	var angVirada=0;

	
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

		mat4.translate(matrizNaveEspacial,matrizNaveEspacial,[50.0,3.0,0.0]);
		mat4.rotate(matrizNaveEspacial, matrizNaveEspacial, -Math.PI/2, [0,1,0]);
		mat4.translate(matrizNaveEspacial,matrizNaveEspacial,posicion);
		mat4.multiply(matrizNaveEspacial,matrizNaveEspacial,rotacion);
		mat4.scale(matrizNaveEspacial,matrizNaveEspacial,[0.2,0.2,0.2]);
		
		//dibujo un tubo	
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, matrizNaveEspacial, [-0.6, 0.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [0.0,1.0,0.0]);
		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
	    this.tubo.draw(mvMatrix);


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

		var m=mat4.create();
		mat4.translate(m,matrizNaveEspacial,posicion);
		mat4.multiply(m,m,rotacion);

		return matrizNaveEspacial;

	}
	

	this.step=function(){

		angCabezeo=0;
		angCabezeo=(estadoTeclas[this.TECLA_ARRIBA])? -0.005:angCabezeo;
		angCabezeo=(estadoTeclas[this.TECLA_ABAJO])?   0.005:angCabezeo;		

		
		angRolido=0;
		angRolido=(estadoTeclas[this.TECLA_GIRO_HORARIO])? -0.005:angRolido;
		angRolido=(estadoTeclas[this.TECLA_GIRO_ANTIHORARIO])?   0.005:angRolido;


		angVirada=0;
		angVirada=(estadoTeclas[this.TECLA_IZQUIERDA])? -0.005:angVirada;
		angVirada=(estadoTeclas[this.TECLA_DERECHA])?   0.005:angVirada;

		angRolido=(estadoTeclas[this.TECLA_DERECHA])? -0.001:angRolido;
		angRolido=(estadoTeclas[this.TECLA_IZQUIERDA])?   0.001:angRolido;


		var impulso=0;
		impulso=(estadoTeclas[this.TECLA_MAS])? 0.1:impulso;
		impulso=(estadoTeclas[this.TECLA_MENOS])? -0.1:impulso;

		velocidad+=impulso;

		var ejeX=vec3.fromValues(1,0,0);

		var ejeZ=vec3.fromValues(0,0,1);

		var ejeY=vec3.fromValues(0,1,0);

		mat4.rotate(rotacion,rotacion,angRolido,ejeZ);
		mat4.rotate(rotacion,rotacion,angCabezeo,ejeX);
		mat4.rotate(rotacion,rotacion,angVirada,ejeY);


		var direccion=vec3.fromValues(0,0,Math.max(0,velocidad));
		vec3.transformMat4(direccion,direccion,rotacion);

		var inercia=0.99;
		momento[0]=momento[0]*inercia+direccion[0]*0.0001;
		momento[1]=momento[1]*inercia+direccion[1]*0.0001;
		momento[2]=momento[2]*inercia+direccion[2]*0.0001;

		vec3.add(posicion,posicion,momento);

	};

	this.onTeclaDown=function(tecla){
		//console.log("onTeclaDown "+tecla);
		var n=parseInt(tecla);
		if (!isNaN(n)) estadoTeclas[n]=true;
	}

	this.onTeclaUp=function(tecla){
		//console.log("onTeclaUp "+tecla);
		var n=parseInt(tecla);
		if (!isNaN(n)) estadoTeclas[n]=false;
			
	}

	this.getVelocidad=function(){
		return velocidad;
	}


}
