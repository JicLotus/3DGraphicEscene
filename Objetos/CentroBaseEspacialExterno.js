function CentroBaseEspacialExterno () {

	this.puntosBezierInternos = 50;
	this.cantidadBeziers =4;
	
	//El numero de columnas es el numero de puntos que tenga el perfil
	this.grilla = new VertexGrid(20,this.puntosBezierInternos*this.cantidadBeziers);
	this.grilla.initTexture("Resources/shiphull.jpg");
	this.grilla.initSecondTexture("Resources/ventanal.jpg");
	this.grilla.initNormalTexture("Resources/shiphull_normalmap.jpg");
	
	
	this.grilla.multipleImages = true;
	
	this.puntosPolinomio = [];
	
	this.curvas = new CurvasExternasCentroEstacionEspacial(this.puntosBezierInternos);
	this.puntosTapas = [];
	this.puntosTapas2 = [];

	this.crearEstacionEspacial = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		
		this.grilla.normal_buffer = [];
		this.grilla.biNormal_buffer = [];
        this.grilla.tangent_buffer = [];
		
		this.grilla.texture_coord_buffer = [];
		
		var tanX=0.0;
		var tanY=0.0;
		var normal = [];
		var tangent = [];
		var binormal = [];
		var normalTransformada = vec3.create();
		var tangenteTransformada = vec3.create();
		var binormalTransformada = vec3.create();
		
		var normalMatrix = mat3.create();
		var invertModelMatrix = mat4.create();
					
		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var u=0;
		var base= mat4.create();
		var posNew = [];
		var angle = 0.0;
		var imgU;
		var imgV;
		
		
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
				
					if (i<this.grilla.cols-1){
						tanX = beizerActual[i+1].getX() - x;
						tanY = beizerActual[i+1].getY() - y;
						tangent = [tanX, tanY, 0];				
						binormal = 	[0,0,1];
						normal = bezier.cross(binormal, tangent);
					}			
				
					
					mat4.identity(base);
					mat4.translate(base,base,v);
					
					mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
					mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
					
					mat4.scale(base,base,[1.5,1.5,1.5]);
				
					//transformo las normales, evitando el traslado y el escalado
					mat4.invert(invertModelMatrix, base);
					mat3.fromMat4(normalMatrix, invertModelMatrix);
					mat3.transpose(normalMatrix, normalMatrix);
				
					normalTransformada = vec3.fromValues(normal[0],normal[1],normal[2]);
					vec3.normalize(normalTransformada, normalTransformada);					
					vec3.transformMat3(normalTransformada, normalTransformada, normalMatrix);

					///////TANGENTE	
					tangenteTransformada = vec3.fromValues(tangent[0],tangent[1],tangent[2]);
					vec3.normalize(tangenteTransformada, tangenteTransformada);					
					vec3.transformMat3(tangenteTransformada, tangenteTransformada, normalMatrix);
					//////

					///// Binormal
					binormalTransformada = vec3.fromValues(binormal[0],binormal[1],binormal[2]);
					vec3.normalize(binormalTransformada, binormalTransformada);					
					vec3.transformMat3(binormalTransformada, binormalTransformada, normalMatrix);
					/////


					vec3.transformMat4(posNew,[x,y,0.0],base);
					
					
					if(j==0) this.puntosTapas.push([posNew[0],posNew[1],posNew[2]]);
					if(j==this.grilla.rows-1) this.puntosTapas2.push([posNew[0],posNew[1],posNew[2]]);
					
					
					imgU = j/ this.puntosBezierInternos *10.0;
					imgV = i /this.grilla.rows / 2.2;
					
					this.grilla.texture_coord_buffer.push(imgU);
					this.grilla.texture_coord_buffer.push(imgV);
					this.grilla.texture_coord_buffer.push(h);
					
					this.grilla.normal_buffer.push(normalTransformada[0]);
					this.grilla.normal_buffer.push(normalTransformada[1]);
					this.grilla.normal_buffer.push(normalTransformada[2]);
					
					this.grilla.biNormal_buffer.push(binormalTransformada[0]);
					this.grilla.biNormal_buffer.push(binormalTransformada[0]);
					this.grilla.biNormal_buffer.push(binormalTransformada[0]);
					
					this.grilla.tangent_buffer.push(tangenteTransformada[0]);
					this.grilla.tangent_buffer.push(tangenteTransformada[1]);
					this.grilla.tangent_buffer.push(tangenteTransformada[2]);
					
					this.grilla.color_buffer.push(88/255);
					this.grilla.color_buffer.push(88/255);
					this.grilla.color_buffer.push(88/255);
					
					this.grilla.position_buffer.push(posNew[0]);								
					this.grilla.position_buffer.push(posNew[1]);
					this.grilla.position_buffer.push(posNew[2]);	
					
					
				}
			}	
		}
	}

	this.getTapas = function(){
		return this.puntosTapas;
	}
		

	this.cross = function(A, B){
		return [ A[1]* B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0] ];
	}
	
	this.getTapas2 = function(){
		return this.puntosTapas2;
	}

	this.draw = function(modelMatrix){
		var normalMap = gl.getUniformLocation(glProgram, "uNormalMap");
		gl.uniform1i(normalMap, true);
        var uUsarImagen = gl.getUniformLocation(glProgram, "uUsarImagen");		
		var usarImagen= true;
		gl.uniform1i(uUsarImagen, usarImagen);
		
		this.grilla.draw(modelMatrix);
		
		usarImagen= false;
		gl.uniform1i(normalMap, false);
		gl.uniform1i(uUsarImagen, usarImagen);
	}

	this.inicializar = function()
	{
		this.puntosPolinomio = this.curvas.getPolinomio();
		this.crearEstacionEspacial();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
