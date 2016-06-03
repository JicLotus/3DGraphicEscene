function Sol () {
	
	this.esfera = new EsferaGrid();
	this.esfera.setTexture("sun.jpg");
	this.esfera.inicializar();
	
	
	var mMatrixSol = mat4.create();
	
	this.draw = function(){
		mat4.identity(mMatrixSol);
		mat4.rotate(mMatrixSol, mMatrixSol, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.scale(mMatrixSol,mMatrixSol,[10.0,10.0,10.0]);
		
		this.esfera.draw(mMatrixSol);
	}
	
	
	this.getMatriz = function()
	{
		return mMatrixSol;
	}
}
