function CurvasInternasCentroEstacionEspacial (_puntosBezier) {

	this.puntosCurva = []
	this.puntosBezierInternos = _puntosBezier;

	this.getPolinomio = function()
	{
		this.arcoSuperiorInterno();
		this.paredDerechaInterno();
		this.paredInferiorInterno();
		this.paredIzquierdaInterno();
		
		return this.puntosCurva;
	}	

	this.arcoSuperiorInterno = function()
	{
	   punto1 = new Punto(0.8,-0.3,0.0);
	   punto2 = new Punto(0.8,-0.6,0.0);
	   punto3 = new Punto(0.1,-0.6,0.0);
	   punto4 = new Punto(0.1,-0.3,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}
	
	this.paredDerechaInterno = function()
	{
	   punto1 = new Punto(0.1,-0.38,0.0);
	   punto2 = new Punto(0.1,-0.1,0.0);
	   punto3 = new Punto(0.1,0.0,0.0);
	   punto4 = new Punto(0.1,0.1,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	 }
	
	this.paredInferiorInterno = function()
	{
	   punto1 = new Punto(0.1,0.1,0.0);
	   punto2 = new Punto(0.2,0.1,0.0);
	   punto3 = new Punto(0.5,0.1,0.0);
	   punto4 = new Punto(0.8,0.1,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}
	
	this.paredIzquierdaInterno = function()
	{
	   punto1 = new Punto(0.8,0.1,0.0);
	   punto2 = new Punto(0.8,0.0,0.0);
	   punto3 = new Punto(0.8,-0.1,0.0);
	   punto4 = new Punto(0.8,-0.38,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}

}
