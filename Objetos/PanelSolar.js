function PanelSolar (_tubo) {

	this.tubo = _tubo;
	this.panel = new VertexGrid(19,19);
	this.panel.initTexture("Resources/panelsolar-bump.gif");
	this.panel.initNormalTexture("Resources/panelsolar-normalMap.jpg");
	
	
	this.panel.inicializar();
	
	this.mvMatrizTubo = mat4.create();
	matrizPanelSolarRotada = mat4.create();		
	

	this.dibujar = function(matrizPanelSolar){

		mat4.rotate(matrizPanelSolarRotada, matrizPanelSolar, window.anguloPaneles, [0,0,1]);
		this.dibujarPanel(matrizPanelSolarRotada);
		this.dibujarTuboChiquito(matrizPanelSolarRotada);
		this.dibujarTuboLargo(matrizPanelSolarRotada);

	}
	
	this.dibujarPanel = function(matrizPanelSolar)
	{
		var normalMap = gl.getUniformLocation(glProgram, "uNormalMap");
		gl.uniform1i(normalMap, true);
        var uUsarImagen = gl.getUniformLocation(glProgram, "uUsarImagen");		
		var usarImagen= true;
		gl.uniform1i(uUsarImagen, usarImagen);
		
		for (var i=0;i<2;i++){

			mat4.identity(this.mvMatrizTubo);

			mat4.rotate(this.mvMatrizTubo,matrizPanelSolar, Math.PI/2, [0.0, 1.0, 0.0]);
			mat4.translate(this.mvMatrizTubo,this.mvMatrizTubo,[-2.2,0.18-i*0.36,0.0]);
			mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[0.05,0.017,1.0]);
			//mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[1.0,0.25,1.0]);

			this.panel.draw(this.mvMatrizTubo);
		}
		
		usarImagen= false;
		gl.uniform1i(normalMap, false);
		gl.uniform1i(uUsarImagen, usarImagen);
		
	}
	
	this.dibujarTuboChiquito = function(matrizPanelSolar)
	{		
		mat4.identity(this.mvMatrizTubo);
		mat4.rotate(this.mvMatrizTubo, matrizPanelSolar, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.translate(this.mvMatrizTubo,this.mvMatrizTubo,[0.0,1.2,-0.18]);
		mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[0.02,0.02,0.36]);
		this.tubo.draw(this.mvMatrizTubo);
	}
	
	this.dibujarTuboLargo = function(matrizPanelSolar)
	{
		mat4.identity(this.mvMatrizTubo);
		mat4.translate(this.mvMatrizTubo,matrizPanelSolar,[0.0,0.0,0.0]);
		mat4.scale(this.mvMatrizTubo,this.mvMatrizTubo,[0.02,0.02,1.2]);
		this.tubo.draw(this.mvMatrizTubo);
	}

	
	
}

 
