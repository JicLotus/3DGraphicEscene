function Sol () {
	
	esfera = new EsferaGrid();
	esfera.inicializar();
	var mMatrixSol = mat4.create();
	
	this.draw = function(_u_model_view_matrix){
		mat4.identity(mMatrixSol);
		mat4.rotate(mMatrixSol, mMatrixSol, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.scale(mMatrixSol,mMatrixSol,[10.0,10.0,10.0]);
		
		gl.uniformMatrix4fv(_u_model_view_matrix, false, mMatrixSol);
		
		esfera.draw(mMatrixSol);
	}
	
	
	this.getTexture = function()
	{
		return esfera.getTexture();
	}
	
	this.getMatriz = function()
	{
		return mMatrixSol;
	}
}
