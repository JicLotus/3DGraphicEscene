function CentroBaseEspacialInterno () {

	this.puntosBezierInternos = 70;
	this.cantidadBeziers =4;
	
	//El numero de columnas es el numero de puntos que tenga el perfil
	this.grilla = new VertexGrid(50,this.puntosBezierInternos*this.cantidadBeziers);
	
	this.puntosPolinomio = [];
	
	this.curvas = new CurvasInternasCentroEstacionEspacial(this.puntosBezierInternos);
	
	this.puntosTapas = [];
	this.puntosTapas2 = [];
	
	this.puntosLuces = [];

	this.crearEstacionEspacial = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		this.grilla.normal_buffer = [];
		this.grilla.texture_coord_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var u=0;
		var base= mat4.create();
		var posNew = [];
		var angle = 0.0;
		
		for (var j=0;j<this.grilla.rows;j++){
			
			v = [1.5*Math.cos(angle), 1.5*Math.sin(angle), 0];
			
			angle+= (Math.PI*1.5)/this.grilla.rows;
			u=0.0;
			//angle=0.0;
			
			for (var h =0;h<this.cantidadBeziers;h++){
				for (var i=0;i<this.puntosBezierInternos;i++){
					
					var beizerActual = this.puntosPolinomio[h];
					
					x = beizerActual[i].getX();
					y = beizerActual[i].getY();
			
					mat4.identity(base);
					mat4.translate(base,base,v);
					
					mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
					mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
					
					mat4.scale(base,base,[0.8,0.8,0.8]);
					mat4.translate(base,base,[0.4,-1.0,0.0]);
					
					vec3.transformMat4(posNew,[x,y,0.0],base);
					
					if (j==0){
						this.puntosTapas.push([posNew[0],posNew[1],posNew[2]]);
					}
					else if (j==this.grilla.rows-1){
						this.puntosTapas2.push([posNew[0],posNew[1],posNew[2]]);
					}
					
					this.grilla.texture_coord_buffer.push(0.0);
					this.grilla.texture_coord_buffer.push(0.0);
					
					this.grilla.normal_buffer.push(posNew[0]);
					this.grilla.normal_buffer.push(posNew[1]);
					this.grilla.normal_buffer.push(posNew[2]);

					this.grilla.color_buffer.push(92/255);
					this.grilla.color_buffer.push(46/255);
					this.grilla.color_buffer.push(109/255);						
					
					this.grilla.position_buffer.push(posNew[0]);								
					this.grilla.position_buffer.push(posNew[1]);
					this.grilla.position_buffer.push(posNew[2]);	

				}
			}
			
			if (j==1)
				this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
			else if (j==5)
				this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
			else if (j==this.grilla.rows-1)
				this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
				
			
		}
	}


	this.draw = function(modelMatrix){
		
		var luz = [this.puntosLuces[0][0],this.puntosLuces[0][1],this.puntosLuces[0][2]];
		var luz2 = [this.puntosLuces[1][0],this.puntosLuces[1][1],this.puntosLuces[1][2]];
		var luz3 = [this.puntosLuces[2][0],this.puntosLuces[2][1],this.puntosLuces[2][2]];
		
		vec3.transformMat4(luz,luz,modelMatrix);
		vec3.transformMat4(luz2,luz2,modelMatrix);
		vec3.transformMat4(luz3,luz3,modelMatrix);
		
		var lucesExternas = gl.getUniformLocation(glProgram, "lucesExternas");
		var l1 = gl.getUniformLocation(glProgram, "l1Position");
		var l2 = gl.getUniformLocation(glProgram, "l2Position");
		var l3 = gl.getUniformLocation(glProgram, "l3Position");
		
		gl.uniform3fv(l1, luz);
		gl.uniform3fv(l2, luz2);
		gl.uniform3fv(l3, luz3);
		
		
		gl.uniform1i(lucesExternas, false);
		this.grilla.draw(modelMatrix);
		gl.uniform1i(lucesExternas, true);
	}

	this.getTapas = function(){
		return this.puntosTapas;
	}
	
	this.getTapas2 = function(){
		return this.puntosTapas2;
	}

	this.inicializar = function()
	{
		this.puntosPolinomio = this.curvas.getPolinomio();
		this.crearEstacionEspacial();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
