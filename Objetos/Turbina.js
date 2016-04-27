
function Turbina (){
	
	//El numero de filas 	
	this.grilla = new VertexGrid(30,30);

	this.puntosPolinomio = [];

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
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);	
				

			}
				/*Se incrementa el paso*/
				angle+= (2*Math.PI/this.grilla.rows);

		}

	}

	this.iniciarPuntosDelPolinomio = function(){
	  /*
	   punto1 = new Punto(1.0,1.0,0.0);
	   punto2 = new Punto(0.9,0.25,0.0);
	   punto3 = new Punto(0.8,0.5,0.0);
	   punto4 = new Punto(0.8,0.0,0.0);
	   punto5 = new Punto(0.8,-0.5,0.0);
	   punto6 = new Punto(0.9,-0.25,0.0);
	   punto7  = new Punto(1.0, 1.0, 0.0);
		*/

  	   //punto1 = new Punto(0.5,-1.0,0.0);
	   //punto2 = new Punto(1.0,-0.5,0.0);
	   //punto3 = new Punto(1.0, 0.5,0.0);
	   //punto4 = new Punto(0.5,1.0,0.0);

	   //punto4 = new Punto(0.8,0.0,0.0);
	  
		/*
		punto7  = new Punto(0.5, 0.0, 0.0);
		punto8  = new Punto(1.0, 0.0, 0.0);   
		
		punto9  = new Punto(1.0, 0.5, 0.0);
		punto10  = new Punto(0.5, 0.5, 0.0);   
		punto11  = new Punto(0.5, 0.0, 0.0);   
	  */
        
 	   punto6 = new Punto(0.35,0.90,0.0);
	   punto5 = new Punto(0.6,0.9,0.0);
	   punto4 = new Punto(0.50,0.80,0.0);
	   punto3 = new Punto(0.40,0.70,0.0);
       punto2 = new Punto(0.30,0.60,0.0);
       punto1 = new Punto(0.20, 0.50, 0,0);

	   puntos = [punto1,punto2,punto3,punto4, punto5, punto6];

	   bezier = new Bezier(puntos,30);
	   bezier.bezier();
	   
	   this.puntosPolinomio = bezier.getPuntosFinales();
/*
	  	this.puntosPolinomio.push(punto1);
	  	this.puntosPolinomio.push(punto2);
	  	this.puntosPolinomio.push(punto3);
	  	this.puntosPolinomio.push(punto4);
*/
//	  	this.puntosPolinomio.push(punto5);
//	  	this.puntosPolinomio.push(punto6);  
//	  	this.puntosPolinomio.push(punto7);  

//	   this.puntosPolinomio = puntos;
/*	  	this.puntosPolinomio.push(punto7);
	  	this.puntosPolinomio.push(punto8);  
	  	this.puntosPolinomio.push(punto9);
	  	this.puntosPolinomio.push(punto10);  
	  	this.puntosPolinomio.push(punto11);  

*/
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
