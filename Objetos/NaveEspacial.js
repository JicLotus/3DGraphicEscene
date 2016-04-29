function NaveEspacial () {
	turbina = new Turbina();
    turbina.inicializar();  
	
	this.draw = function(_u_model_view_matrix)
	{
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, mvMatrix, [4.0, 0.0, 0.0])
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [0.0, 1.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, t*10, [0.0, 0.0, 1.0]);
	   
		mat4.scale(mvMatrix,mvMatrix,[0.5,0.5,1.5]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		turbina.draw();

		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, mvMatrix, [4.0, 0.0, 0.0])
		mat4.rotate(mvMatrix, mvMatrix, Math.PI, [0.0, 1.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, t*10, [0.0, 0.0, 1.0]);
		
		mat4.scale(mvMatrix,mvMatrix,[0.5,0.5,1.5]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		turbina.draw();

		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, mvMatrix, [4.0, 0.0, 0.0])
		mat4.rotate(mvMatrix, mvMatrix, 3*Math.PI/2, [0.0, 1.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, t*10, [0.0, 0.0, 1.0]);
	   
		mat4.scale(mvMatrix,mvMatrix,[0.5,0.5,1.5]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		turbina.draw();

		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, mvMatrix, [4.0, 0.0, 0.0])
		mat4.rotate(mvMatrix, mvMatrix, 2*Math.PI, [0.0, 1.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, t*10, [0.0, 0.0, 1.0]);
		
		mat4.scale(mvMatrix,mvMatrix,[0.5,0.5,1.5]);
		

		gl.uniformMatrix4fv(_u_model_view_matrix, false, mvMatrix);
				   
		turbina.draw();
	}
	
}
