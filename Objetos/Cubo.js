
function CuboGrid (_radioX,_radioY,_radioZ) {

	this.radioX = _radioX;
	this.radioY = _radioY;
	this.radioZ = _radioZ;
	this.grilla = new VertexGrid(10,10);
	

	this.createUniformCubo = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];

		var x=0;
		var y=0;
		var z=0;
		
		
		for (var j=0;j<this.grilla.rows;j++){
				
				x+=this.radioX/this.grilla.rows;
				y+=this.radioY/this.grilla.rows;
			for (var i=0;i<this.grilla.cols;i++){
				z+=this.radioZ/this.grilla.rows;
				
				this.grilla.position_buffer.push(x);								
				this.grilla.position_buffer.push(y);
				this.grilla.position_buffer.push(z);		

				//Todos los vertices siempre blanco
				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
				
			}
		}	
	}

	this.draw = function(){
		this.grilla.draw();
	}              

	this.inicializar = function()
	{
		this.createUniformCubo();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}
            
            
