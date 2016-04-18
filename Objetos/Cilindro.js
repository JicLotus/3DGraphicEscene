
function CilindroGrid (_radio) {

	this.radio = _radio;
	this.grilla = new VertexGrid(10,10);
	

	this.createUniformCilindro = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var altura=0;
		var u=0;
		
		for (var i=0;i<this.grilla.cols;i++){
			this.grilla.position_buffer.push(0);								
			this.grilla.position_buffer.push(0);
			this.grilla.position_buffer.push((4)/this.grilla.rows);
			
				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);	
		}
		
		
		for (var j=0;j<this.grilla.rows-2;j++){
			
			altura+=(4)/this.grilla.rows;
			
			for (var i=0;i<this.grilla.cols;i++){				
				u+=(2*Math.PI)/this.grilla.cols;                    											   	
				
				x = this.radio * Math.cos(u);
				y = this.radio * Math.sin(u);	
				
				this.grilla.position_buffer.push(x);								
				this.grilla.position_buffer.push(y);
				this.grilla.position_buffer.push(altura);	

				//Todos los vertices siempre blanco
				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
				
			}
		}	

		for (var i=0;i<this.grilla.cols;i++){
			this.grilla.position_buffer.push(0.0);								
			this.grilla.position_buffer.push(0.0);
			this.grilla.position_buffer.push(altura);	
			
							this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
		}
	
		
	}

	this.draw = function(){
		this.grilla.draw();
	}              

	this.inicializar = function()
	{
		this.createUniformCilindro();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}
            
            
