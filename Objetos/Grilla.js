function VertexGrid (_rows, _cols) {
                this.cols = _cols;
                this.rows = _rows;
                this.index_buffer = null;

                this.position_buffer = null;
                this.color_buffer = null;

                this.webgl_position_buffer = null;
                this.webgl_color_buffer = null;
                this.webgl_index_buffer = null;

                this.createIndexBuffer = function(){
                	     
							this.index_buffer = [];                    
                             
                    /*
							//Completamos linea superior de pares
							var incremento=0;
							for(var i=0;i<this.cols/3;i++)
							{
								this.index_buffer.push(i*2+incremento);
								incremento+=2;
								this.index_buffer.push(i*2+incremento);
								incremento+=2;
								this.index_buffer.push(i*2+incremento);
							}
                    */ 
                    
                    var cantidadTriangulos = (this.rows*this.cols) / 3.0;      
							for (var i=0.0;i<cantidadTriangulos;i++)
							{
								var nodoPrimero=i*2+i;
								this.index_buffer.push(nodoPrimero);
								this.index_buffer.push(nodoPrimero+1);
								this.index_buffer.push(nodoPrimero+2);
							}
							/*
							var incremento=0;
							for(var i=0;i<this.cols/3;i++)
							{
								incremento+=1;
								this.index_buffer.push(i+incremento);
								incremento+=2;
								this.index_buffer.push(i+incremento);
								incremento+=2;
								this.index_buffer.push(i+incremento);
							}
							*/
							//this.index_buffer = [0,2,4,0, 1, 2, 3,4,5,1,3,5];
							
                }
                        
                
                this.createUniformPlaneGrid = function(){
                    
                    this.position_buffer = [];
                    this.color_buffer = [];

                    var cte=((this.cols-1.0)/4.0); 
                    var valor1=0.0;
                    var valor2=0.0;
                     
                    for (var j=0;j<this.cols;j++){
                    		for (var i=0;i<this.rows;i++){
  									
  									valor1=j-cte;
  									valor2=i-cte;
  									
  									this.position_buffer.push(valor1);
									this.position_buffer.push(valor2);
									this.position_buffer.push(0.0);		
  
		  							//Todos los vertices siempre blanco
      		              	this.color_buffer.push(1.0);
            		        	this.color_buffer.push(1.0);
                  		  	this.color_buffer.push(1.0);
                    		}
                    }
                }


                // Esta función crea e incializa los buffers dentro del pipeline para luego
                // utlizarlos a la hora de renderizar.
                this.setupWebGLBuffers = function(){

                    // 1. Creamos un buffer para las posicioens dentro del pipeline.
                    this.webgl_position_buffer = gl.createBuffer();
                    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
                    // hemos creado.
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
                    // 3. Cargamos datos de las posiciones en el buffer.
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

                    // Repetimos los pasos 1. 2. y 3. para la información del color
                    this.webgl_color_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);   

                    // Repetimos los pasos 1. 2. y 3. para la información de los índices
                    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
                    // Notar también que se usa un array de enteros en lugar de floats.
                    this.webgl_index_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
                }


                this.drawVertexGrid = function(){

                    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
                    gl.enableVertexAttribArray(vertexPositionAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
                    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

                    var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
                    gl.enableVertexAttribArray(vertexColorAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
                    gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

                    // Dibujamos.
                    
                    //this.rows*this.cols/2  = por las lineas q completan los pares
                    //this.rows*this.cols/2  = por las lineas q completan los impares
                    
                    gl.drawElements(gl.LINE_STRIP, this.rows*this.cols, gl.UNSIGNED_SHORT, 0);
                }
                
                this.inicializar = function(){
						this.createUniformPlaneGrid();
              		this.createIndexBuffer();
                  this.setupWebGLBuffers();                
                }
                
            }


//ANOTACIONES
/*
//rows=2
//cols=3
//cte=0.5
-0.5,-0.5 (0)
-0.5,0.5  (1)
j=1
0.5,-0.5	(2)
0.5,0.5	(3)
j=2
1.0,-0.5	(4)
1.0,0.5 	(5)*/