function Tierra () {
	esfera = new EsferaGrid(8.0);
    esfera.inicializar();
    var mMatrixTierra = mat4.create();
	this.draw = function(_u_model_view_matrix){
		mat4.identity(mMatrixTierra);
		mat4.translate(mMatrixTierra, mMatrixTierra, [0.0, -14.0,0.0]);
		mat4.rotate(mMatrixTierra, mMatrixTierra, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.rotate(mMatrixTierra, mMatrixTierra, t, [0.0, 0.0, 1.0]);
		t = t + 0.001;

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mMatrixTierra);
	   
		esfera.draw();
	}
}
