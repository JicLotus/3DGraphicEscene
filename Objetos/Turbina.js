
function Turbina (){
	
	//El numero de filas 	
	this.grilla = new VertexGrid(10,33);

	this.puntosPolinomio = [];

	//variables que definen el color... el 0 es 0 y el 1 es 255
	var r = 255.0/255.0;
	var g = 255.0/255.0;
	var b = 255.0/255.0;


	this.crearRevolucion = function(){

		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];


		var x=0.0;
		var y=0.0;
		var z=0.0;
		var paso=0.0;
		var angle=0.0;
		var posNew = [];
		var base= mat4.create();

		/*
		Definir Angulo de rotacion
		Para cada punto del polinomio
			Copiar Puntos
			Rotar Puntos
			Unir Puntos

		*/

		//Defino el angulo (paso) de rotacion para el barrido
		paso = 0.0;

		for (var j=0; j<this.grilla.rows; j++){
		
			for (var i=0; i<this.grilla.cols; i++){
				x = this.puntosPolinomio[i].getX();
				y = this.puntosPolinomio[i].getY();
		
				mat4.identity(base);
				mat4.rotate(base, base, angle, [0.0, 0.0, 1.0]);
				mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
			
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
				

			}
				/*Se incrementa el paso*/
				angle+= (2.2*Math.PI/this.grilla.rows);

		}

	}

	this.iniciarPuntosDelPolinomio = function(){
		puntoInicial = new Punto(0.0, -0.20, 0.0);
/*
		punto1 = new Punto(0.20, 0.50, 0,0);
		punto2 = new Punto(0.30,0.60,0.0);
		punto3 = new Punto(0.40,0.70,0.0);
		punto4 = new Punto(0.50,0.80,0.0);
		punto5 = new Punto(0.6,0.9,0.0);
		punto6 = new Punto(0.35,0.90,0.0);
*/
		punto1 = new Punto(0.20, -0.20, 0.0);
		punto2 = new Punto(0.30, -0.10, 0.0);
		punto3 = new Punto(0.40, 0.00, 0.0);
		punto4 = new Punto(0.50, 0.10, 0.0);
		punto5 = new Punto(0.60, 0.20, 0.0);
		punto6 = new Punto(0.35, 0.20, 0.0);

		puntoFinal = new Punto(0.0, 0.20, 0.0);
		
		puntos = [punto1,punto2,punto3,punto4, punto5, punto6];

		bezier = new Bezier(puntos,30);
		bezier.bezier();

		this.puntosPolinomio = bezier.getPuntosFinales();
		this.puntosPolinomio.unshift(puntoInicial);
		this.puntosPolinomio.push(puntoFinal);
	}

	this.draw = function(){
		this.grilla.draw();
	}              



	this.inicializar = function()
	{
		this.iniciarPuntosDelPolinomio();
		this.crearRevolucion();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
