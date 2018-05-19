function BSpline (_puntos,_posicionesPixel) {
	
	this.puntosIniciales = _puntos;
	this.posicionesPixel = _posicionesPixel;
	this.puntosFinales = [];

	
	this.getPuntosFinales  = function(){
		return this.puntosFinales;
	}

	this.setBases = function()
	{
		 Base0=function(u) { return (1-3*u+3*u*u-u*u*u)*1/6;}  // (1 -3u +3u2 -u3)/6
		 Base1=function(u) { return (4-6*u*u+3*u*u*u)*1/6; }  // (4  -6u2 +3u3)/6
		 Base2=function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6} // (1 -3u +3u2 -3u3)/6
		 Base3=function(u) { return (u*u*u)*1/6; }  //    u3/6

		 Base0der=function(u) { return (-3 +6*u -3*u*u)/6 }  // (-3 +6u -3u2)/6
		 Base1der=function(u) { return (-12*u+9*u*u)/6 }   // (-12u +9u2)  /6
		 Base2der=function(u) { return (3+6*u-9*u*u)/6;}	// (-3 +6u -9u2)/6
		 Base3der=function(u) { return (3*u*u)*1/6; }	
		
	}
	
	this.curvaCubica=function (u,puntosDeControl){

		var p0=puntosDeControl[0];
		var p1=puntosDeControl[1];
		var p2=puntosDeControl[2];
		var p3=puntosDeControl[3];

		var punto=new Object();

		punto.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
		punto.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];
		punto.z=Base0(u)*p0[2]+Base1(u)*p1[2]+Base2(u)*p2[2]+Base3(u)*p3[2];

		return punto;
	}

	this.curvaCubicaDerivadaPrimera=function (u,puntosDeControl){

		var p0=puntosDeControl[0];
		var p1=puntosDeControl[1];
		var p2=puntosDeControl[2];
		var p3=puntosDeControl[3];

		var punto=new Object();

		punto.x=Base0der(u)*p0[0]+Base1der(u)*p1[0]+Base2der(u)*p2[0]+Base3der(u)*p3[0];
		punto.y=Base0der(u)*p0[1]+Base1der(u)*p1[1]+Base2der(u)*p2[1]+Base3der(u)*p3[1];
		punto.z=Base0der(u)*p0[2]+Base1der(u)*p1[2]+Base2der(u)*p2[2]+Base3der(u)*p3[2];

		return punto;
	}
	
	this.armarCurvaCubica = function (){
		// es el paso de avance sobre la curva cuanto mas chico mayor es el detalle
		// u=0.05 son 20 segmentos (0.05=1/20)
		var deltaU=1/this.posicionesPixel; 
			
		for (u=0;u<=1.001;u=u+deltaU){
			// Tengo que calcular la posicion del punto c(u)
			var punto=this.curvaCubica(u,this.puntosIniciales);
			var puntoDerivado=this.curvaCubicaDerivadaPrimera(u,this.puntosIniciales);
			
			var contenedorPunto = new ContenedorPunto(punto,puntoDerivado);
			
			this.puntosFinales.push(contenedorPunto);
			
			
		}
		
		
	}
	
}
	
	

