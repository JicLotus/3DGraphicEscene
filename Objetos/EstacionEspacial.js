function EstacionEspacial (_radio) {

	this.radio = _radio;
	
	//El numero de columnas es el numero de puntos que tenga el perfil
	this.grilla = new VertexGrid(50,52);
	this.tubo = new CilindroGrid(0.09,4.0);
	this.tubo.inicializar();
	this.tubosCentral = new TubosEstacionEspacial(this.tubo);
	this.panelSolar = new PanelSolar(this.tubo);
	
	this.puntosPolinomio = [];
	
	this.crearEstacionEspacial = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var u=0;
		var base= mat4.create();
		var posNew = [];
		var angle = 0.0;
		
		for (var j=0;j<this.grilla.rows;j++){
			
			v = [1.5*Math.cos(angle), 1.5*Math.sin(angle), 0];
			//vec3.normalize(v,v);
			angle+= (Math.PI*1.5)/this.grilla.rows;
			u=0.0;
	
			for (var i=0;i<this.grilla.cols-2;i++){
				
				u+=(2.23*Math.PI)/this.grilla.cols;                    											   	
				x = this.radio * Math.cos(u);
				y = this.radio * Math.sin(u);
				
				x = this.puntosPolinomio[i].getX();
				y = this.puntosPolinomio[i].getY();
		
				mat4.identity(base);
				mat4.translate(base,base,v);
				mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
				mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
			
				vec3.transformMat4(posNew,[x,y,0.0],base);
				
				this.grilla.position_buffer.push(posNew[0]);								
				this.grilla.position_buffer.push(posNew[1]);
				this.grilla.position_buffer.push(posNew[2]);	

				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);	
			}
			
				y+=0.5;
				mat4.identity(base);
				mat4.translate(base,base,v);
				mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
				mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
			
				vec3.transformMat4(posNew,[x,y,0.0],base);
				
				this.grilla.position_buffer.push(posNew[0]);								
				this.grilla.position_buffer.push(posNew[1]);
				this.grilla.position_buffer.push(posNew[2]);	

				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);	
				
				x+=0.5;
				mat4.identity(base);
				mat4.translate(base,base,v);
				mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
				mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
			
				vec3.transformMat4(posNew,[x,y,0.0],base);
				
				this.grilla.position_buffer.push(posNew[0]);								
				this.grilla.position_buffer.push(posNew[1]);
				this.grilla.position_buffer.push(posNew[2]);	

				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);	
			
		}	

	}


	this.draw = function(_matrizModeloVista){
		
		mat4.identity(mvMatrix);
		
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [1.0, 0.0, 0.0]);
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.grilla.draw();
		
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0, 0.0, 0.0]);
		this.tubosCentral.dibujar(_matrizModeloVista);
		
		this.dibujarPaneles(mvMatrix,_matrizModeloVista,1.5);
		this.dibujarPaneles(mvMatrix,_matrizModeloVista,-5.0);
		
		
	}              



	this.dibujarPaneles = function(mvMatrix,_matrizModeloVista,_yPosition)
	{
		matrizPanelSolar = mat4.create();
		mat4.identity(matrizPanelSolar);
		mat4.scale(matrizPanelSolar,mvMatrix,[0.5,0.5,0.5]);
		mat4.rotate(matrizPanelSolar,matrizPanelSolar,Math.PI/3,[0,1,0]);
		mat4.translate(matrizPanelSolar,matrizPanelSolar,[-0.1,_yPosition,-0.3]);
		
		for (var i =0;i<4;i++){
			mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,0.8,0.0]);
			this.panelSolar.dibujar(matrizPanelSolar,_matrizModeloVista);
		}
		
		
		mat4.identity(matrizPanelSolar);
		mat4.scale(matrizPanelSolar,mvMatrix,[0.5,0.5,0.5]);
		mat4.rotate(matrizPanelSolar,matrizPanelSolar,1.2*Math.PI,[0,1,0]);
		mat4.translate(matrizPanelSolar,matrizPanelSolar,[-0.1,_yPosition,-0.3]);
		
		for (var i =0;i<4;i++){
			mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,0.8,0.0]);
			this.panelSolar.dibujar(matrizPanelSolar,_matrizModeloVista);
		}
		
	}



	this.armarPolinomioBezier = function()
	{
	   //Siempre pasar de a pocos puntos
	   punto1 = new Punto(0.8,-0.3,0.0);
	   punto2 = new Punto(0.8,-0.6,0.0);
	   punto3 = new Punto(0.1,-0.6,0.0);
	   punto4 = new Punto(0.1,-0.3,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,50);
	   bezier.bezier();
	   
	   this.puntosPolinomio = bezier.getPuntosFinales();
	}

	this.inicializar = function()
	{
		this.armarPolinomioBezier();
		this.crearEstacionEspacial();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}

