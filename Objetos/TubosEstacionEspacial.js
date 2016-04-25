function TubosEstacionEspacial (_tubo) {

	this.tubo = _tubo;

	this.dibujar = function(_matrizModeloVista){
		var angle = Math.PI*1.1;
		var mvMatrizTubo = mat4.create();
		
		for (var i=0;i<7;i++){
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrizTubo, mvMatrix, angle, [0.0, 1.0, 0.0]);
			mat4.translate(mvMatrizTubo,mvMatrizTubo,[0.0,0.0,-0.9]);
			
			angle+= (Math.PI*1.5)/7;
			gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrizTubo);
			this.tubo.draw();
		}
		
		for(var i=0;i<2;i++){
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrizTubo,mvMatrix, Math.PI/2, [1.0, 0.0, 0.0]);
			mat4.translate(mvMatrizTubo,mvMatrizTubo,[i*0.05,0.0,-5.0]);
			mat4.scale(mvMatrizTubo,mvMatrizTubo,[0.1,0.1,3.0]);
			gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrizTubo);
			this.tubo.draw();
		}
		
	}
	
}
