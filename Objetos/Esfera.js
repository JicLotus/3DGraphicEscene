
function EsferaGrid () {

	this.grilla = new VertexGrid(40,40);

	/*
		Este método crea los puntos que componen la esfera
	*/
	this.createUniformEsfera = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		
		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var v=-Math.PI/2;
		var u=-Math.PI;
		
		for (var j=0;j<this.grilla.rows;j++){
			
			//define los saltos en altura
			v+=(2*Math.PI)/this.grilla.rows;
			
			for (var i=0;i<this.grilla.cols;i++){				
				//define el paso	
				u+=(2*Math.PI)/this.grilla.cols;                    											   	
					
				x =  Math.cos(v) * Math.cos(u);
				y =  Math.cos(v) * Math.sin(u);  									
				z =  Math.sin(v);

				this.grilla.position_buffer.push(x);								
				this.grilla.position_buffer.push(y);
				this.grilla.position_buffer.push(z);		

				//Todos los vertices siempre blanco
				this.grilla.color_buffer.push(1.0);
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
		this.createUniformEsfera();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}
            
            
