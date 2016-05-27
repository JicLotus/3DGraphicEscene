
function CuerpoNaveEspacial(){
	
	//El numero de filas 	
	this.grilla = new VertexGrid(30,7);

	this.puntosPolinomio = [];

	//variables que definen el color... el 0 es 0 y el 1 es 255
	var r = 255.0/255.0;
	var g = 255.0/255.0;
	var b = 255.0/255.0;

	this.crearCuerpo = function(){

		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		this.grilla.normal_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		var paso=0.0;
		var cantidad = 0;
		var posNew = [];
		var base= mat4.create();


		//la primer cara es cerrada

		//Cada columna es un punto del polinomio
		for (var i=0; i<this.grilla.cols; i++){
			x = 0.0;
			y = 0.0;
	
			mat4.identity(base);
			//Se traslada sobre el eje Z
			mat4.translate(base, base, [0.0, 0.0, paso]);

			//se aplica la rotacion y traslacion
			vec3.transformMat4(posNew,[x,y,0.0],base);
			
			/*
			Se insertan las coordenadas en la grilla
			*/

			this.grilla.position_buffer.push(posNew[0]);								
			this.grilla.position_buffer.push(posNew[1]);
			this.grilla.position_buffer.push(posNew[2]);	

			/*
				Se inserta el color
			*/
			this.grilla.color_buffer.push(r);
			this.grilla.color_buffer.push(g);
			this.grilla.color_buffer.push(b);	
			
			this.grilla.normal_buffer.push(posNew[0]);
			this.grilla.normal_buffer.push(posNew[1]);
			this.grilla.normal_buffer.push(posNew[2]);
			

		}
		/*Se incrementa el paso*/
		paso+= (1.0/this.grilla.rows);

		//Cada fila es una cara que se barre
		for (var j=1; j<this.grilla.rows; j++){
		
			//Cada columna es un punto del polinomio
			for (var i=0; i<this.grilla.cols; i++){
				x = this.puntosPolinomio[i].getX();
				y = this.puntosPolinomio[i].getY();
		
				mat4.identity(base);
				//Se traslada sobre el eje Z
				mat4.translate(base, base, [0.0, 0.0, paso]);

				//se aplica la rotacion y traslacion
				vec3.transformMat4(posNew,[x,y,0.0],base);
				
				/*
				Se insertan las coordenadas en la grilla
				*/

				this.grilla.position_buffer.push(posNew[0]);								
				this.grilla.position_buffer.push(posNew[1]);
				this.grilla.position_buffer.push(posNew[2]);	

				/*
					Se inserta el color
				*/
				this.grilla.color_buffer.push(r);
				this.grilla.color_buffer.push(g);
				this.grilla.color_buffer.push(b);	
				
				this.grilla.normal_buffer.push(posNew[0]);
				this.grilla.normal_buffer.push(posNew[1]);
				this.grilla.normal_buffer.push(posNew[2]);
				

			}
				/*Se incrementa el paso*/
				paso+= (1.0/this.grilla.rows);
						

		}

	}

	this.iniciarPuntosDelPolinomio = function(){
        
/*	punto1 = new Punto(0.0, 0.0, 0,0);
	punto2 = new Punto(1.0, 0.0, 0.0);
	punto3 = new Punto(1.0, 0.8, 0.0);
	punto4 = new Punto(0.8, 1.0, 0.0);
	punto5 = new Punto(0.2, 1.0, 0.0);
	punto6 = new Punto(0.0, 0.8, 0.0);
	punto7 = new Punto(0.0, 0.0, 0.0);
	   
*/
	punto1 = new Punto(-0.5, -0.5, 0,0);
	punto2 = new Punto(0.5, -0.5, 0.0);
	punto3 = new Punto(0.5, 0.3, 0.0);
	punto4 = new Punto(0.3, 0.5, 0.0);
	punto5 = new Punto(-0.3, 0.5, 0.0);
	punto6 = new Punto(-0.5, 0.3, 0.0);
	punto7 = new Punto(-0.5, -0.5, 0.0);

	puntos = [punto1,punto2,punto3,punto4, punto5, punto6, punto7];

	this.puntosPolinomio = puntos;
	}


	this.draw = function(modelMatrix){
		this.grilla.draw(modelMatrix);
	}              



	this.inicializar = function()
	{
		this.iniciarPuntosDelPolinomio();
		this.crearCuerpo();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
