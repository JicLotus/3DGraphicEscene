function TubosEstacionEspacial (_radio) {

	this.radio = _radio;
	
	this.tuboCentral = new CilindroGrid(0.09,4.0);
	this.tuboCentral.inicializar();		

	this.dibujar = function(_matrizModeloVista){
		var angle = Math.PI*1.1;
		var mvMatrizTubo = mat4.create();
		
		for (var i=0;i<7;i++){
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrix, mvMatrizTubo, angle, [0.0, 1.0, 0.0]);
			mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-0.9]);
			
			angle+= (Math.PI*1.5)/7;
			gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
			this.tuboCentral.draw();
		}
		
		
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrix, mvMatrizTubo, Math.PI/2, [1.0, 0.0, 0.0]);
			mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-5.0]);
			mat4.scale(mvMatrix,mvMatrix,[0.1,0.1,3.0]);
			gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
			this.tuboCentral.draw();
			
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrix, mvMatrizTubo, Math.PI/2, [1.0, 0.0, 0.0]);
			mat4.translate(mvMatrix,mvMatrix,[0.05,0.0,-5.0]);
			mat4.scale(mvMatrix,mvMatrix,[0.1,0.1,3.0]);
			gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
			this.tuboCentral.draw();
		
		
	}
	
}
