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
	   punto1 = [10,45,-200.0];
	   punto2 = [20,10,0.0];
	   punto3 = [60,10,0.0];
	   punto4 = [70,45,10.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();
	   
	   this.puntosCurva.push(bSpline.getPuntosFinales());
	}
	
	
}
