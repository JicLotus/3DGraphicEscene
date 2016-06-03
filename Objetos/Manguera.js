function Manguera () {
	
	this.puntosBSplineInternos = 30;
	this.cantidadBSplines =5;
	
	this.grilla = new VertexGrid(this.puntosBSplineInternos* this.cantidadBSplines,5);
	
	this.curvas = new CurvasManguera(this.puntosBSplineInternos);
	this.puntosPolinomio = [];
	
	
	
	this.crear = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer= [];
		this.grilla.normal_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var base= mat4.create();
		var posNew = [];
		var angle = 0.0;
		
		var angleYX = 0.0;
		var angleZX = 0.0;
			
		for (var h =0;h<this.cantidadBSplines;h++){
			for (var i=0;i<this.puntosBSplineInternos;i++){
				
				var SplineActual = this.puntosPolinomio[h];
				angle = 0.0;
				
				v = [SplineActual[i].punto.x,SplineActual[i].punto.y,SplineActual[i].punto.z];
				
				der = [SplineActual[i].puntoDerivado.x,SplineActual[i].puntoDerivado.y,SplineActual[i].puntoDerivado.z];
				
				angleYX = Math.atan(der[1]/der[0]);
				angleZX = Math.atan(der[2]/der[0]);
				
				
				for (var j=0;j<this.grilla.cols;j++){
					
					
					x = 0.1*Math.cos(angle);
					y = 0.1*Math.sin(angle);
					
					mat4.identity(base);
					mat4.translate(base,base,v);
					
					mat4.rotate(base, base, Math.PI/2 + angleYX, [0.0, 1.0, 0.0]);
					mat4.rotate(base, base, Math.PI/2 + angleZX, [0.0, 0.0, 1.0]);
					
					vec3.transformMat4(posNew,[x,y,0.0],base);
					

					
					this.grilla.position_buffer.push(posNew[0]);								
					this.grilla.position_buffer.push(posNew[1]);
					this.grilla.position_buffer.push(posNew[2]);
					
					this.grilla.color_buffer.push(1.0);
					this.grilla.color_buffer.push(1.0);
					this.grilla.color_buffer.push(1.0);	
					
					this.grilla.normal_buffer.push(posNew[0]);
					this.grilla.normal_buffer.push(posNew[1]);
					this.grilla.normal_buffer.push(posNew[2]);
					
					
					angle+= (Math.PI*2.23)/this.grilla.cols;
				}
				
			}	
		}
	
		
	}
	
	this.draw = function(modelMatrix){
		this.grilla.draw(modelMatrix);
	}
	
	this.inicializar = function()
	{
		this.puntosPolinomio = this.curvas.getPolinomio();
		this.crear();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
	
	
}
