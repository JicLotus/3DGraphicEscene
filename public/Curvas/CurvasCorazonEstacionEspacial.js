function CurvasCorazonEstacionEspacial () {

	this.puntosCurva = []
	this.puntosBezierInternos = 10;
	this.cantidadBeziers = 4;

	this.getPolinomio = function()
	{		
		this.arcoPrimero();
		this.paredSegunda();
		this.arcoTercero();
		this.paredCuarta();
		
		return this.puntosCurva;
	}

	this.getCantBeziers = function()
	{
		return this.cantidadBeziers;
	}

	this.getPuntosBezierInternos = function()
	{
		return this.puntosBezierInternos;
	}

	this.arcoPrimero = function()
	{
	   punto1 = new Punto(0.09,-0.95,0.0);
	   punto2 = new Punto(0.2,-0.6,0.0);
	   punto3 = new Punto(0.2,-0.5,0.0);
	   punto4 = new Punto(0.09,-0.3,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}
	
	this.paredSegunda = function()
	{
	   punto1 = new Punto(0.09,-0.3,0.0);
	   punto2 = new Punto(0.09,-0.1,0.0);
	   punto3 = new Punto(0.09,0.0,0.0);
	   punto4 = new Punto(0.09,0.2,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}
	
	this.arcoTercero = function()
	{
	   punto1 = new Punto(0.09,0.2,0.0);
	   punto2 = new Punto(0.2,0.3,0.0);
	   punto3 = new Punto(0.2,0.4,0.0);
	   punto4 = new Punto(0.09,0.5,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}
	
	this.paredCuarta = function()
	{
	   punto1 = new Punto(0.09,0.5,0.0);
	   punto2 = new Punto(0.09,0.6,0.0);
	   punto3 = new Punto(0.09,0.7,0.0);
	   punto4 = new Punto(0.09,0.8,0.0);
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bezier = new Bezier(puntos,this.puntosBezierInternos);
	   bezier.bezier();
	   
	   this.puntosCurva.push(bezier.getPuntosFinales());
	}
	

}
