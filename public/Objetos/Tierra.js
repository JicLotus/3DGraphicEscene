function Tierra () {
	
	this.esfera = new EsferaGrid();
	this.esfera.setTexture("Resources/earth.jpg");
    this.esfera.inicializar();
    
    
    
    var mMatrixTierra = mat4.create();
	this.draw = function(){
		
		mat4.identity(mMatrixTierra);
		mat4.rotate(mMatrixTierra, mMatrixTierra, t, [0.0, 1.0, 0.0]);
		mat4.translate(mMatrixTierra, mMatrixTierra, [40.0, -3.0,0.0]);
		mat4.rotate(mMatrixTierra, mMatrixTierra, -t, [0.0, 1.0, 0.0]);
		mat4.rotate(mMatrixTierra, mMatrixTierra, t*5, [0.0, 1.0, 0.0]);
		mat4.rotate(mMatrixTierra, mMatrixTierra, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.scale(mMatrixTierra,mMatrixTierra,[5.0,5.0,5.0]);
		
		t = t + 0.001;

		this.esfera.draw(mMatrixTierra);
	}
	
	
	this.getMatriz = function()
	{
		return mMatrixTierra;
	}
}
