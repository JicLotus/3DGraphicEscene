function CorazonNaveEspacial (_puntosPolinomio){
	
	this.puntosPolinomio = _puntosPolinomio.getPolinomio();

	this.cantBeziers = _puntosPolinomio.getCantBeziers();
	this.cantPuntosBeziers = _puntosPolinomio.getPuntosBezierInternos();
	
	this.grilla = new VertexGrid(10,this.cantBeziers*this.cantPuntosBeziers);



	this.crearRevolucion = function(){

		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		this.grilla.normal_buffer = [];
		
		var x=0.0;
		var y=0.0;
		var z=0.0;
		var angle=0.0;
		var posNew = [];
		var base= mat4.create();


		for (var j=0; j<this.grilla.rows; j++){
		
			for (var h=0;h<this.cantBeziers;h++){
				for (var i=0; i<this.cantPuntosBeziers; i++){
					
					var beizerActual = this.puntosPolinomio[h];
					
					x = beizerActual[i].getX();
					y = beizerActual[i].getY();
			
			
					mat4.identity(base);			
					mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
					mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
				
					vec3.transformMat4(posNew,[x,y,0.0],base);
					
					this.grilla.position_buffer.push(posNew[0]);								
					this.grilla.position_buffer.push(posNew[1]);
					this.grilla.position_buffer.push(posNew[2]);	

					this.grilla.color_buffer.push(0.2);
					this.grilla.color_buffer.push(0.2);
					this.grilla.color_buffer.push(0.2);	
					
					this.grilla.normal_buffer.push(posNew[0]);
					this.grilla.normal_buffer.push(posNew[1]);
					this.grilla.normal_buffer.push(posNew[2]);
				}
			}
			angle+= (2.23*Math.PI/this.grilla.rows);
			//angle=0.0;
		}

	}

	this.draw = function(modelMatrix){
		this.grilla.draw(modelMatrix);
	}              

	this.inicializar = function()
	{
		this.crearRevolucion();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
