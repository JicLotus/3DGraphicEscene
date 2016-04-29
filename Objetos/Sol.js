function Sol () {
	
	esfera = new EsferaGrid(10);
	esfera.inicializar();
	var mMatrixSol = mat4.create();
	
	this.draw = function(_u_model_view_matrix){
		mat4.identity(mMatrixSol);
		mat4.rotate(mMatrixSol, mMatrixSol, t, [0.0, 1.0, 0.0]);
		mat4.translate(mMatrixSol, mMatrixSol, [0.0, 0.0,-60.0]);
		mat4.rotate(mMatrixSol, mMatrixSol, Math.PI/2, [1.0, 0.0, 0.0]);

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mMatrixSol);
		
		esfera.draw();
	}
}
