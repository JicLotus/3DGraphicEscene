function TubosEstacionEspacial (_tubo) {

	this.tubo = _tubo;

	this.dibujar = function(){
		var angle = Math.PI*1.1;
		var mvMatrizTubo = mat4.create();
		
		for (var i=0;i<7;i++){
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrizTubo, mvMatrix, angle, [0.0, 1.0, 0.0]);
			mat4.translate(mvMatrizTubo,mvMatrizTubo,[0.0,0.0,0.0]);
			mat4.scale(mvMatrizTubo,mvMatrizTubo,[0.3,0.3,1.5]);
			
			angle+= (Math.PI*1.5)/7;
			this.tubo.draw(mvMatrizTubo);
		}
		
		for(var i=0;i<2;i++){
			mat4.identity(mvMatrizTubo);
			mat4.rotate(mvMatrizTubo,mvMatrix,  i*Math.PI + Math.PI/2, [1.0, 0.0, 0.0]);
			mat4.translate(mvMatrizTubo,mvMatrizTubo,[0,0.0,0.0]);
			mat4.scale(mvMatrizTubo,mvMatrizTubo,[0.02,0.02,2.4]);
			this.tubo.draw(mvMatrizTubo);
		}
		
	}
	
}
