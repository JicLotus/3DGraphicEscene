
function CilindroGrid (_radio,_altura) {

	this.radio = _radio;
	this.altura = _altura;

	//el Numero de filas es la cantidad de caras que se repiten
	//el Numero de columnas es la cantidad de puntos por cara
	this.grilla = new VertexGrid(20,15);
	
	var r = 1.0;
	var g = 1.0;
	var b = 1.0;

	this.setColor = function(colorR, colorG, colorB){
		r = colorR/255.0;
		g = colorG/255.0;
		b = colorB/255.0;

	}

	this.createUniformCilindro = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		this.grilla.normal_buffer = [];
		this.grilla.texture_coord_buffer = [];
				this.grilla.biNormal_buffer = [];
        this.grilla.tangent_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		var alturaAux=0.0;
		var paso = this.altura/(this.grilla.rows-3);
		var u=0;

		//esta es la primer cara...		
		for (var i=0;i<this.grilla.cols;i++){
			
			this.grilla.texture_coord_buffer.push(0.0);
			this.grilla.texture_coord_buffer.push(0.0);
			
			this.grilla.normal_buffer.push(0);
			this.grilla.normal_buffer.push(0);
			this.grilla.normal_buffer.push(alturaAux);

			this.grilla.biNormal_buffer.push(1.0);
			this.grilla.biNormal_buffer.push(0.0);
			this.grilla.biNormal_buffer.push(0.0);
			
			this.grilla.tangent_buffer.push(0.0);
			this.grilla.tangent_buffer.push(1.0);
			this.grilla.tangent_buffer.push(0.0);


			this.grilla.color_buffer.push(r);
			this.grilla.color_buffer.push(g);
			this.grilla.color_buffer.push(b);	
			
			this.grilla.position_buffer.push(0);								
			this.grilla.position_buffer.push(0);
			this.grilla.position_buffer.push((alturaAux));
		
		}
		
		
		for (var j=0;j<this.grilla.rows-2;j++){
			
			
			for (var i=0;i<this.grilla.cols;i++){				
				                    											   	
				
				x = this.radio * Math.cos(u);
				y = this.radio * Math.sin(u);	
				
				this.grilla.texture_coord_buffer.push(0.0);
				this.grilla.texture_coord_buffer.push(0.0);
				
				this.grilla.normal_buffer.push(x);
				this.grilla.normal_buffer.push(y);
				this.grilla.normal_buffer.push(alturaAux);

				this.grilla.biNormal_buffer.push(1.0);
				this.grilla.biNormal_buffer.push(0.0);
				this.grilla.biNormal_buffer.push(0.0);
				
				this.grilla.tangent_buffer.push(0.0);
				this.grilla.tangent_buffer.push(1.0);
				this.grilla.tangent_buffer.push(0.0);
				
				//Todos los vertices siempre blanco
				this.grilla.color_buffer.push(r);
				this.grilla.color_buffer.push(g);
				this.grilla.color_buffer.push(b);
				
				this.grilla.position_buffer.push(x);								
				this.grilla.position_buffer.push(y);
				this.grilla.position_buffer.push(alturaAux);	
				
				u+=(2.23*Math.PI)/this.grilla.cols;
					
			}
			u=0;
			alturaAux+=paso;
	
		}	

		alturaAux=alturaAux-paso;

		for (var i=0;i<this.grilla.cols;i++){
			this.grilla.position_buffer.push(0.0);								
			this.grilla.position_buffer.push(0.0);
			this.grilla.position_buffer.push(alturaAux);				
			this.grilla.color_buffer.push(r);
			this.grilla.color_buffer.push(g);
			this.grilla.color_buffer.push(b);
			this.grilla.normal_buffer.push(0);
			this.grilla.normal_buffer.push(0);
			this.grilla.normal_buffer.push(alturaAux);	
			this.grilla.biNormal_buffer.push(1.0);
			this.grilla.biNormal_buffer.push(0.0);
			this.grilla.biNormal_buffer.push(0.0);
			
			this.grilla.tangent_buffer.push(0.0);
			this.grilla.tangent_buffer.push(1.0);
			this.grilla.tangent_buffer.push(0.0);
			
			this.grilla.texture_coord_buffer.push(0.0);
			this.grilla.texture_coord_buffer.push(0.0);
		}
		
	}

	this.initTexture = function(_path)
	{
		this.grilla.initTexture(_path);
	}

	this.draw = function(modelMatrix){
		this.grilla.draw(modelMatrix);
	}              

	this.setTexture = function(_fileName){
		this.grilla.initTexture(_fileName);
	}

	this.inicializar = function()
	{
		this.createUniformCilindro();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}
            
            
