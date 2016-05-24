function EstacionEspacial () {

	this.tubo = new CilindroGrid(0.5,1.0);
	this.tubo.inicializar();
	//Esto dibuja los tubos en forma de rayos de bicicleta
	this.tubosCentral = new TubosEstacionEspacial(this.tubo);


	this.panelSolar = new PanelSolar(this.tubo);
	
	this.centroBaseEspacialInterno = new CentroBaseEspacialInterno();
	this.centroBaseEspacialExterno = new CentroBaseEspacialExterno();
	
	this.curvasCorazonEstacionEspacial = new CurvasCorazonEstacionEspacial();
	this.corazonEstacionEspacial = new CorazonNaveEspacial(this.curvasCorazonEstacionEspacial);
	
	
    this.manguera = new Manguera();
    this.manguera.inicializar();
	
	this.tapaPrincipal;
	this.tapaSecundaria;
	
	this.puntosTapas =[];
	
	var matrizTransformacion = mat4.create();
	
	
	this.draw = function(_matrizModeloVista){
		
		mat4.identity(mvMatrix);

		mat4.rotate(mvMatrix, mvMatrix, t, [0.0, 1.0, 0.0]);
		mat4.translate(mvMatrix, mvMatrix, [40.0, 3.0,0.0]);
		mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.scale(mvMatrix,mvMatrix,[0.3,0.3,0.3]);
		
		mat4.copy(matrizTransformacion,mvMatrix);
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.centroBaseEspacialInterno.draw();
		
		
		m = mat4.create();
		mat4.identity(m);
		mat4.translate(m,mvMatrix,[-1.5,0.0,3.0]);
		mat4.scale(m,m,[0.1,0.1,0.1]);
		gl.uniformMatrix4fv(_matrizModeloVista, false, m);
		this.manguera.draw();
		
		
		m = mat4.create();
		mat4.identity(m);
		mat4.scale(m,mvMatrix,[4.0,4.0,0.8]);
		mat4.translate(m,m,[0.0,0.0,-1.2]);
		gl.uniformMatrix4fv(_matrizModeloVista, false, m);
		this.corazonEstacionEspacial.draw();
		
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		
		this.centroBaseEspacialExterno.draw();
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.tapaPrincipal.draw();
		
		gl.uniformMatrix4fv(_matrizModeloVista, false, mvMatrix);
		this.tapaSecundaria.draw();
		
		
		mat4.rotate(mvMatrix, mvMatrix, -Math.PI/2, [1.0, 0.0, 0.0]);
		mat4.translate(mvMatrix,mvMatrix,[0.0,1.0,0.0]);
		mat4.scale(mvMatrix,mvMatrix,[1.2,1.2,1.2]);		
		this.dibujarPaneles(mvMatrix,_matrizModeloVista,1.4);
		this.dibujarPaneles(mvMatrix,_matrizModeloVista,-1.4);

		this.tubosCentral.dibujar(_matrizModeloVista);
		
	}              

	this.dibujarPaneles = function(mvMatrix,_matrizModeloVista,_yPosition)
	{
		matrizPanelSolar = mat4.create();
		mat4.identity(matrizPanelSolar);
		mat4.scale(matrizPanelSolar,mvMatrix,[0.5,0.5,0.5]);
		mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,_yPosition,0.0]);
		
		var paso = _yPosition/2;		
	
		if (_yPosition > 0){
			paso = 0.8;
		}else{
			paso = -0.8;
		}

		for (var i =0;i<4;i++){

			if (i>window.nivelCierre){
				mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,paso/2,0.0]);
			}else{
				mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,paso,0.0]);
			}
			this.panelSolar.dibujar(matrizPanelSolar,_matrizModeloVista);
		}
		
		mat4.identity(matrizPanelSolar);
		mat4.scale(matrizPanelSolar,mvMatrix,[0.5,0.5,0.5]);
		mat4.rotate(matrizPanelSolar,matrizPanelSolar,Math.PI,[0,1,0]);
		mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,_yPosition,0.0]);
		
		for (var i =0;i<4;i++){
			if (i>window.nivelCierre){
				mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,paso/2,0.0]);
			}else{
				mat4.translate(matrizPanelSolar,matrizPanelSolar,[0.0,paso,0.0]);
			}
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
		
		this.corazonEstacionEspacial.inicializar();
	}
	
	this.getMatriz = function()
	{
		return matrizTransformacion;
	}
	
}

