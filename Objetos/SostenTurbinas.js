
function SostenTurbinas(){
	
	//El numero de filas 	
	this.grilla = new VertexGrid(10,31);

	this.puntosPolinomio = [];

	this.crearSosten = function(){

		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];


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
			y = 0.2;
	
			mat4.identity(base);
			//Se traslada sobre el eje Z
			mat4.translate(base, base, [0.0, 0.0, paso]);

			//Se rota 90 grados respecto del eje X
//			mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
			
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
			this.grilla.color_buffer.push(1.0);
			this.grilla.color_buffer.push(1.0);
			this.grilla.color_buffer.push(1.0);	
			

		}
		/*Se incrementa el paso*/
		paso+= (0.10/this.grilla.rows);

		//Cada fila es una cara que se barre
		for (var j=1; j<this.grilla.rows; j++){
		
			//Cada columna es un punto del polinomio
			for (var i=0; i<this.grilla.cols; i++){
				x = this.puntosPolinomio[i].getX();
				y = this.puntosPolinomio[i].getY();
		
				mat4.identity(base);
				//Se traslada sobre el eje Z
				mat4.translate(base, base, [0.0, 0.0, paso]);

				//Se rota 90 grados respecto del eje X
//				mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
				
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
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);	
				

			}
				/*Se incrementa el paso*/
				paso+= (0.10/this.grilla.rows);
						

		}


	}

	this.iniciarPuntosDelPolinomio = function(){

		punto1 = new Punto(-0.50, 0.4, 0,0);
		punto2 = new Punto(0.0, 0.1, 0.0);
		punto3 = new Punto(0.50, 0.4, 0.0);
		
		puntos = [punto1,punto2,punto3];

		bezier = new Bezier(puntos,15);
		bezier.bezier();

		puntos = bezier.getPuntosFinales();
		var longitud = puntos.length;

		for (var i=0; i < longitud; i++) {
		    this.puntosPolinomio.push(puntos[i]);
		}

		punto4 = new Punto(0.50, 0.2,0.0);
		punto5 = new Punto(0.0, -0.1, 0.0);
		punto6 = new Punto(-0.50,0.2,0.0);

		
		puntos = [punto4, punto5, punto6];
		bezier = new Bezier(puntos,15);
		bezier.bezier();

		puntos = bezier.getPuntosFinales();
		longitud = puntos.length;
		for (var i=0; i < longitud; i++) {
		    this.puntosPolinomio.push(puntos[i]);
		}

		this.puntosPolinomio.push(punto1);
	}

	this.draw = function(){
		this.grilla.draw();
	}              



	this.inicializar = function()
	{
		this.iniciarPuntosDelPolinomio();
		this.crearSosten();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
