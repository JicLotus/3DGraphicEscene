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
	   punto3 = [20,35,0.0];
	   punto4 = [25,25,0.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();
	   
	   this.puntosCurva.push(bSpline.getPuntosFinales());

	   punto1 = [20,10,0.0];
	   punto2 = [20,35,0.0];
	   punto3 = [25,25,0.0];
	   punto4 = [10,25,-15.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();

	   this.puntosCurva.push(bSpline.getPuntosFinales());

	   punto1 = [20,35,0.0];
	   punto2 = [25,25,0.0];
	   punto3 = [10,25,-15.0];
	   punto4 = [25,30,-30.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();

	   this.puntosCurva.push(bSpline.getPuntosFinales());

	   punto1 = [25,25,0.0];
	   punto2 = [10,25,-15.0];
	   punto3 = [25,30,-30.0];
	   punto4 = [40,30,-30.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();

	   this.puntosCurva.push(bSpline.getPuntosFinales());

	   punto1 = [10,25,-15.0];
	   punto2 = [25,30,-30.0];
	   punto3 = [40,30,-30.0];
	   punto4 = [25,25,0.0];
	   
	   puntos = [punto1,punto2,punto3,punto4];
	   
	   bSpline = new BSpline(puntos,this.puntosBSplineInternos);
	   bSpline.setBases();
	   bSpline.armarCurvaCubica();

	   this.puntosCurva.push(bSpline.getPuntosFinales());



	}

	
	
	
}
