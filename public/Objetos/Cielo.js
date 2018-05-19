function Cielo () {
	
	this.esfera = new EsferaGrid();
	this.esfera.setTexture("Resources/sky.jpg");
	this.esfera.inicializar();
	
	
	var mMatrixCielo = mat4.create();
	
	this.draw = function(){
		mat4.identity(mMatrixCielo);
		mat4.rotate(mMatrixCielo, mMatrixCielo, Math.PI/2, [1,0,0]);
		mat4.scale(mMatrixCielo,mMatrixCielo,[50.0,50.0,50.0]);
		
		this.esfera.draw(mMatrixCielo);
	}
	
	
	this.getMatriz = function()
	{
		return mMatrixCielo;
	}
}
