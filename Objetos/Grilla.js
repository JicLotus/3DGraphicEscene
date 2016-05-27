

function VertexGrid (_rows, _cols) {
                this.cols = _cols;
                this.rows = _rows;
                this.index_buffer = null;
                this.cantidadVertices=0;

                this.position_buffer = null;
                this.color_buffer = null;
                this.normal_buffer = null;
				this.texture_coord_buffer = null;

                this.webgl_position_buffer = null;
                this.webgl_normal_buffer = null;
                this.webgl_color_buffer = null;
                this.webgl_texture_coord_buffer = null;
                
                this.webgl_index_buffer = null;

				this.texture = null;


                this.createIndexBuffer = function(){
                	  
					this.index_buffer = [];  
							
							
					this.index_buffer.push(this.cols-1);
					this.index_buffer.push(this.cols-1);
					this.index_buffer.push(0);
							             
					var indice=0;                                          
                      for (var i=0;i<this.rows-1;i++)
                      {
					
								for(var j=0;j<this.cols;j++)
								{
									indice=i+j+(this.cols-1)*i;
									this.index_buffer.push(indice);
									indice=indice+this.cols;
									this.index_buffer.push(indice);
									
									if (j==this.cols-1 && i<this.rows-2){
										this.index_buffer.push(indice);
										this.index_buffer.push(indice-(this.cols-1));
									}
									
								}                      
                      }
                     
					this.index_buffer.push(this.cols*this.rows-1);
					this.index_buffer.push(this.cols*this.rows-1);
					this.index_buffer.push(this.cols*this.rows-this.cols);
					
					//this.cantidadVertices = (this.rows -1) * (this.cols-1) * 2 +6;
					this.cantidadVertices = this.cols*2*(this.rows-1)+ (this.rows-2)*2 +3+3;
                }
                        
                
                this.createUniformPlaneGrid = function(){
                    
                    this.position_buffer = [];
                    this.color_buffer = [];
                    this.normal_buffer = [];

                    var cte=((this.cols-1.0)/2.0); 
                    var x=0.0;
                    var y=0.0;
                     
                    for (var j=0;j<this.rows;j++){
                    		y=cte-j;	
                    		for (var i=0;i<this.cols;i++){
									x=cte+i;		  							
		  						
							this.position_buffer.push(x);
							this.position_buffer.push(y);
							this.position_buffer.push(0.0);		
  
							this.normal_buffer.push(x);
							this.normal_buffer.push(y);
							this.normal_buffer.push(0.0);
  
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
                    
                    
                    this.webgl_normal_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);    
                    
					/*
					this.webgl_texture_coord_buffer = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
					*/	

                    // Repetimos los pasos 1. 2. y 3. para la información de los índices
                    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
                    // Notar también que se usa un array de enteros en lugar de floats.
                    this.webgl_index_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);					
                }


                this.draw = function(modelMatrix){

                    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
                    gl.enableVertexAttribArray(vertexPositionAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
                    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

/*
					var vertexTextureAttribute = gl.getAttribLocation(glProgram, "aTextureCoord");
					gl.enableVertexAttribArray(vertexTextureAttribute);
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
                    gl.vertexAttribPointer(vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);
*/

                    var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
                    gl.enableVertexAttribArray(vertexColorAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
                    gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

					var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
                    gl.enableVertexAttribArray(vertexNormalAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
                    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);


					////////////////////////////////////////////////////////////
					
					var nMatrixUniform = gl.getUniformLocation(glProgram, "uNMatrix");
					var modelMatrix = mat4.create();
					var normalMatrix = mat3.create();
					var invertModelMatrix = mat4.create();

					mat4.invert(invertModelMatrix, modelMatrix);
					mat3.fromMat4(normalMatrix, invertModelMatrix);

					mat3.transpose(normalMatrix, normalMatrix);
					gl.uniformMatrix3fv(nMatrixUniform, false, normalMatrix);
					
					////////////////////////////////////////////////////////////
					
						
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

                    gl.drawElements(gl.TRIANGLE_STRIP, this.cantidadVertices, gl.UNSIGNED_SHORT, 0);
                }
                
                
				this.initTexture = function(texture_file){
					var aux_texture = gl.createTexture();
					this.texture = aux_texture;
					this.texture.image = new Image();

					this.texture.image.onload = function () {
						   handleLoadedTexture()
					}
					this.texture.image.src = texture_file;
				}
				
				this.getTexture = function()
				{
					return this.texture;
				}
				
                this.inicializar = function(){
					this.createUniformPlaneGrid();
              		this.createIndexBuffer();
					this.setupWebGLBuffers();                
                }
                
            }
