//BEZIER PAPA! By Joe
function Bezier (_puntos,_posicionesPixel) {
	
	//P(u) = Sum0an(pk * BezKN(u))  0=<u=<1
	//BezKN(u) = C(n,k) * u^k * (1-u)^(n-k)

	this.puntosIniciales = _puntos;
	this.posicionesPixel = _posicionesPixel;
	this.puntosFinales = [];
	this.normales = [];
	
	//Coeficientes Binomiales = C(n,k)= n! / (k!*(n-k)!)
	this.C = [];
	this.numeroPuntos = _puntos.length;


	this.getPuntosFinales  = function(){
		return this.puntosFinales;
	}
	
	/* Suponemos que la curva esta contenida en el plano XY */
	this.getNormales = function(){
		var normal = [];
		var tanX = 0.0;
		var tanY = 0.0;
		
		if (this.normales.length == 0){
			for (var i=0; i < puntosFinales.length-1; i++) {
				tanX = this.puntosFinales[i+1].getX() - x;
				tanY = this.puntosFinales[i+1].getY() - y;					
				normal = this.cross([tanX, tanY, 0],  [0,0,1]);
				this.normales.push(new Punto(normal[0],normal[1],normal[2]));					
			}
			this.normales.push(new Punto(normal[0],normal[1],normal[2]));
		}
		return normales;
		
	}
	
	this.cross = function(A, B){
		return [ A[1]* B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0] ];
	}


	this.bezier  = function(){
		var k,u;
		
		this.binomialsCoeffs();
		
		for(k=0;k<=this.posicionesPixel;k++)
		{
			u = k / this.posicionesPixel;
			this.computeBezPt(u);
			
		}
		
	}

	//En la mayoria de los casos una curva de Bezier es un pol de un grado
	//menos que el numero de puntos de control designados
	//Calcula los coeficientes binomiales C para un valor dado de n
	this.binomialsCoeffs = function(){
		var k,j;
		var n = this.numeroPuntos-1;
		
		for (k=0;k<=n;k++)
		{
			this.C[k]=1;
			
			for(j=n;j >= k+1; j--)
				this.C[k] *= j; 
			for(j=n-k;j>=2;j--)
				this.C[k] /= j;
			
		}
		
	}

	// Se calculan las coordenadas a lo largo de la trayectoria de la curva
	this.computeBezPt  = function(_u){
		var k;
		var n = this.numeroPuntos-1;
		var bezBlendFcn;
		var x=0.0,y=0.0,z=0.0;
		
		//Calcula las funciones de combinacion y los puntos de control de combinacion
		for(k=0;k<this.numeroPuntos;k++)
		{
			bezBlendFcn = this.C[k] * Math.pow(_u,k) * Math.pow(1-_u,n - k);
			x += this.puntosIniciales[k].getX() * bezBlendFcn;
			y += this.puntosIniciales[k].getY() * bezBlendFcn;
			z += this.puntosIniciales[k].getZ() * bezBlendFcn;

		}
				
		punto = new Punto(x,y,z);
		this.puntosFinales.push(punto);

	}

}
