function CurvasExternasCentroEstacionEspacial (_puntosBezier) {

	this.puntosCurva = []
	this.puntosBezierInternos = _puntosBezier;

	this.getPolinomio = function()
	{		
		this.arcoSuperiorExterno();
		this.arcoDerechoExterno();
		this.arcoInferiorExterno();
		this.arcoIzquierdoExterno();
		
		return this.puntosCurva;
	}

	this.arcoSuperiorExterno = function()
	{
	   punto1 = new Punto(0.8,-0.8,0.0);
	   punto2 = new Punto(0.8,-1.2,0.0);
	   punto3 = new Punto(0.08,-1.4,0.0);
	   punto4 = new Punto(0.08,-0.8,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}	

	this.arcoDerechoExterno = function()
	{
	   punto1 = new Punto(0.2,-0.95,0.0);
	   punto2 = new Punto(0.09,-0.7,0.0);
	   punto3 = new Punto(0.09,-0.6,0.0);
	   punto4 = new Punto(0.2,-0.3,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}

	this.arcoInferiorExterno = function()
	{
	   punto1 = new Punto(0.08,-0.4,0.0);
	   punto2 = new Punto(0.08,0.2,0.0);
	   punto3 = new Punto(0.8,0.0,0.0);
	   punto4 = new Punto(0.8,-0.4,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
		
	}


	this.arcoIzquierdoExterno = function()
	{
	    punto1 = new Punto(0.69,-0.3,0.0);
		punto2 = new Punto(0.8,-0.6,0.0);
		punto3 = new Punto(0.8,-0.7,0.0);
		punto4 = new Punto(0.69,-0.95,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	   
	}


}
