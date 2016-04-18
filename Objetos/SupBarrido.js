function SupBarrido (_radio) {

	this.radio = _radio;
	this.grilla = new VertexGrid(20,20);
	
	this.puntosPolinomio = [];

	this.createUniformEsfera = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var altura=0;
		var u=0;
		
		var xPol=0.0;
		var yPol=0.0;
		var zPol=0.0;
		
	
		
		for (var j=0;j<this.grilla.rows;j++){
			
			altura+=(4)/this.grilla.rows;
			
			for (var i=0;i<this.grilla.cols;i++){
				
				
				xPol = this.puntosPolinomio[i+this.grilla.rows*j].getX();
				yPol = this.puntosPolinomio[i+this.grilla.rows*j].getY();
				zPol = this.puntosPolinomio[i+this.grilla.rows*j].getZ();
								
				u+=(2*Math.PI)/this.grilla.cols;                    											   	
				
				x = this.radio * Math.cos(u)+xPol;
				y = this.radio * Math.sin(u)+yPol;	
				
				this.grilla.position_buffer.push(x);								
				this.grilla.position_buffer.push(y);
				this.grilla.position_buffer.push(altura);	

				//Todos los vertices siempre blanco
				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
				
			}
		}	


	}

	this.draw = function(){
		this.grilla.draw();
	}              

	this.armarPolinomioBezier = function()
	{
	   punto1 = new Punto(-4.0,0.0,0.0);
	   punto2 = new Punto(-4.0,8.0,0.0);
	   punto3 = new Punto(2.0,8.0,0.0);
	   punto4 = new Punto(2.0,0.0,0.0);
	   puntos = [punto1,punto2,punto3,punto4];
	   bezier = new Bezier(puntos,this.grilla.rows*this.grilla.cols);
	   bezier.bezier();
	   
	   this.puntosPolinomio = bezier.getPuntosFinales();
	}

	this.inicializar = function()
	{
		this.armarPolinomioBezier();
		this.createUniformEsfera();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}
