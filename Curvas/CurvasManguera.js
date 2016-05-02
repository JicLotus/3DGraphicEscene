function CurvasManguera (_puntosBSpline) {
	
	this.puntosCurva = []
	this.puntosBSplineInternos = _puntosBSpline;

	this.getPolinomio = function()
	{
		this.arcoPrimero();
		
		return this.puntosCurva;
	}	

	this.arcoPrimero = function()
	{
	   punto1 = [0.8,-0.3,0.0];
	   punto2 = [0.8,-0.6,0.0];
	   punto3 = [0.1,-0.6,0.0];
	   punto4 = [0.1,-0.3,0.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();
	   
	   this.puntosCurva.push(bSpline.getPuntosFinales());
	}
	
	
}
