function EstacionEspacial (_radio) {

	this.radio = _radio;
	
	this.tubo = new CilindroGrid(0.09,4.0);
	this.tubo.inicializar();
	this.tubosCentral = new TubosEstacionEspacial(this.tubo);
	this.panelSolar = new PanelSolar(this.tubo);
	
	this.centroBaseEspacialInterno = new CentroBaseEspacialInterno();
	this.centroBaseEspacialExterno = new CentroBaseEspacialExterno();
	this.tapaPrincipal;
	this.tapaSecundaria;
	
	this.puntosTapas =[];
	
	this.draw = function(_matrizModeloVista){
		
		mat4.identity(mvMatrix);
		
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [1.0, 0.0, 0.0]);
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.centroBaseEspacialInterno.draw();
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.centroBaseEspacialExterno.draw();
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.tapaPrincipal.draw();
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.tapaSecundaria.draw();
		
		
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.translate(mvMatrix,mvMatrix,[0.0,1.0,0.0]);
		mat4.scale(mvMatrix,mvMatrix,[1.2,1.2,1.2]);
		this.tubosCentral.dibujar(_matrizModeloVista);
		
		this.dibujarPaneles(mvMatrix,_matrizModeloVista,1.5);
		this.dibujarPaneles(mvMatrix,_matrizModeloVista,-5.0);
		
	}              

	this.dibujarPaneles = function(mvMatrix,_matrizModeloVista,_yPosition)
	{
		matrizPanelSolar = mat4.create();
		mat4.identity(matrizPanelSolar);
		mat4.scale(matrizPanelSolar,mvMatrix,[0.5,0.5,0.5]);
		mat4.rotate(matrizPanelSolar,matrizPanelSolar,Math.PI/3,[0,1,0]);
		mat4.translate(matrizPanelSolar,matrizPanelSolar,[-0.1,_yPosition,-0.3]);
		
		for (var i =0;i<4;i++){
			mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,0.8,0.0]);
			this.panelSolar.dibujar(matrizPanelSolar,_matrizModeloVista);
		}
		
		mat4.identity(matrizPanelSolar);
		mat4.scale(matrizPanelSolar,mvMatrix,[0.5,0.5,0.5]);
		mat4.rotate(matrizPanelSolar,matrizPanelSolar,1.2*Math.PI,[0,1,0]);
		mat4.translate(matrizPanelSolar,matrizPanelSolar,[-0.1,_yPosition,-0.3]);
		
		for (var i =0;i<4;i++){
			mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,0.8,0.0]);
			this.panelSolar.dibujar(matrizPanelSolar,_matrizModeloVista);
		}
		
	}

	this.inicializar = function()
	{
		this.centroBaseEspacialInterno.inicializar();
		this.centroBaseEspacialExterno.inicializar();
		
		this.tapaPrincipal = new TapaCentroBaseEspacial(this.centroBaseEspacialInterno.getTapas(),this.centroBaseEspacialExterno.getTapas());
		this.tapaPrincipal.inicializar();
		
		this.tapaSecundaria = new TapaCentroBaseEspacial(this.centroBaseEspacialInterno.getTapas2(),this.centroBaseEspacialExterno.getTapas2());
		this.tapaSecundaria.inicializar();
	}
}

