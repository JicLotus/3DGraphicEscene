function Manguera () {
	
	this.puntosBSplineInternos = 20;
	this.cantidadBSplines =1;
	
	this.grilla = new VertexGrid(this.puntosBSplineInternos*this.cantidadBSpline,20);
	
	this.curvas = new CurvasManguera(this.puntosBSplineInternos);
	this.puntosPolinomio = [];
	
	var matrizTransformacion = mat4.create();
	
	this.crear = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer= [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var base= mat4.create();
		var posNew = [];
		var angle = 0.0;
		

			
		for (var h =0;h<this.cantidadBSplines;h++){
			for (var i=0;i<this.puntosBSplineInternos;i++){
				
				var SplineActual = this.puntosPolinomio[h];
				angle = 0.0;
				
				
				v = [SplineActual[i].punto.x,SplineActual[i].punto.y,SplineActual[i].punto.z];
				console.log(v);
				
				for (var j=0;j<this.grilla.cols;j++){
					
					
					x =Math.cos(angle);
					y = Math.sin(angle);
			
			/*
					mat4.identity(base);
					mat4.translate(base,base,v);
					
					mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
					//mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
					
					vec3.transformMat4(posNew,[x,y,0.0],base);
					
					
					this.grilla.position_buffer.push(posNew[0]);								
					this.grilla.position_buffer.push(posNew[1]);
					this.grilla.position_buffer.push(posNew[2]);*/


					this.grilla.position_buffer.push(x);								
					this.grilla.position_buffer.push(y);
					this.grilla.position_buffer.push(0.0);
					
					
					this.grilla.color_buffer.push(1.0);
					this.grilla.color_buffer.push(1.0);
					this.grilla.color_buffer.push(1.0);	
					
					angle+= (Math.PI*2)/this.grilla.cols;	
				}
				
			}	
		}
	}
	
	
	
	this.getMatriz = function()
	{
		return matrizTransformacion;
	}
	
	
	this.draw = function(){
		this.grilla.draw();
	}
	
	this.inicializar = function()
	{
		this.puntosPolinomio = this.curvas.getPolinomio();
		this.crear();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
	
	
}
