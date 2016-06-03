function TapaCentroBaseEspacial (_puntosTapasInternas,_puntosTapasExternas) {

	this.grilla = new VertexGrid(2,40);
	this.puntosTapasInternas = _puntosTapasInternas;
	this.puntosTapasExternas = _puntosTapasExternas;
	
	this.crearEstacionEspacial = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		this.grilla.normal_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		this.puntosTapasTemp = this.puntosTapasExternas;

		for (var j=0;j<this.grilla.rows;j++){
			if (j==1) this.puntosTapasTemp= this.puntosTapasInternas;
			for (var i=0;i<this.grilla.cols;i++){
				
					x=this.puntosTapasTemp[i][0];
					y=this.puntosTapasTemp[i][1];
					z=this.puntosTapasTemp[i][2];
				
					this.grilla.position_buffer.push(x);
					this.grilla.position_buffer.push(y);
					this.grilla.position_buffer.push(z);	

					this.grilla.color_buffer.push(88/255);
					this.grilla.color_buffer.push(88/255);
					this.grilla.color_buffer.push(88/255);	
					
					this.grilla.normal_buffer.push(x);
					this.grilla.normal_buffer.push(y);
					this.grilla.normal_buffer.push(z);
		
			}
		}
		
		
	}
	
	this.draw = function(modelMatrix){
		this.grilla.draw(modelMatrix);
	}
	
	this.inicializar = function()
	{
		this.crearEstacionEspacial();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
	
	
}
