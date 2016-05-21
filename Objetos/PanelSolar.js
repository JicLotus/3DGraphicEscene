function PanelSolar (_tubo) {

	this.tubo = _tubo;
	this.panel = new VertexGrid(2,2);
	this.panel.inicializar();
	this.mvMatrizTubo = mat4.create();
	matrizPanelSolarRotada = mat4.create();		
	

	this.dibujar = function(matrizPanelSolar,_matrizModeloVista){

		mat4.rotate(matrizPanelSolarRotada, matrizPanelSolar, window.anguloPaneles, [0,0,1]);
		this.dibujarPanel(matrizPanelSolarRotada,_matrizModeloVista);
		this.dibujarTuboChiquito(matrizPanelSolarRotada,_matrizModeloVista);
		this.dibujarTuboLargo(matrizPanelSolarRotada,_matrizModeloVista);

	}
	
	this.dibujarPanel = function(matrizPanelSolar,_matrizModeloVista)
	{

		for (var i=0;i<2;i++){


			mat4.identity(this.mvMatrizTubo);

			mat4.rotate(this.mvMatrizTubo,matrizPanelSolar, Math.PI/2, [0.0, 1.0, 0.0]);
//			mat4.rotate(this.mvMatrizTubo,this.mvMatrizTubo, window.anguloPaneles, [1.0, 0.0, 0.0]);
			mat4.translate(this.mvMatrizTubo,this.mvMatrizTubo,[-2.2,0.18-i*0.36,0.0]);
			mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[1.0,0.25,1.0]);
		
			gl.uniformMatrix4fv(_matrizModeloVista, false, this.mvMatrizTubo);
			this.panel.draw();
		}
	}
	
	this.dibujarTuboChiquito = function(matrizPanelSolar,_matrizModeloVista)
	{		
		mat4.identity(this.mvMatrizTubo);
		mat4.rotate(this.mvMatrizTubo, matrizPanelSolar, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.translate(this.mvMatrizTubo,this.mvMatrizTubo,[0.0,1.2,-0.18]);
		mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[0.02,0.02,0.36]);
		gl.uniformMatrix4fv(_matrizModeloVista, false, this.mvMatrizTubo);
		this.tubo.draw();
	}
	
	this.dibujarTuboLargo = function(matrizPanelSolar,_matrizModeloVista)
	{
		mat4.identity(this.mvMatrizTubo);
		mat4.translate(this.mvMatrizTubo,matrizPanelSolar,[0.0,0.0,0.0]);
		mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[0.02,0.02,1.2]);
		gl.uniformMatrix4fv(_matrizModeloVista, false, this.mvMatrizTubo);
		this.tubo.draw();
	}

	
	
}

 