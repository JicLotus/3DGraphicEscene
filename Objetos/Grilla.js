function VertexGrid (_rows, _cols) {
                this.cols = _cols;
                this.rows = _rows;
                this.index_buffer = null;
                this.cantidadVertices=0;

                this.position_buffer = null;
                this.color_buffer = null;
                
                this.normal_buffer = null;
                this.biNormal_buffer = null;
				this.tangent_buffer = null;
				
				this.texture_coord_buffer = null;

                this.webgl_position_buffer = null;
                
                this.webgl_normal_buffer = null;
                this.webgl_biNormal_buffer = null;
                this.webgl_tangent_buffer = null;
                
                this.webgl_color_buffer = null;
                this.webgl_texture_coord_buffer = null;
                
                this.webgl_index_buffer = null;

				this.texture = null;
				this.secondTexture = null;
				this.textureMapaNormal = null;
				
				this.multipleImages= false;
				this.itsNeil = false;

				this.initTexture = function(texture_file){
					
					var aux_texture = gl.createTexture();
					this.texture = aux_texture;
					this.texture.image = new Image();
					
					this.texture.image.onload = function () {
						   handleLoadedTexture(aux_texture)
					}
					this.texture.image.src = texture_file;
				}

				this.initSecondTexture = function(texture_file){
					
					var aux_texture = gl.createTexture();
					this.secondTexture = aux_texture;
					this.secondTexture.image = new Image();
					
					this.secondTexture.image.onload = function () {
						   handleLoadedTexture(aux_texture)
					}
					this.secondTexture.image.src = texture_file;
				}

				this.initNormalTexture = function(texture_file){
					
					var aux_texture = gl.createTexture();
					this.textureMapaNormal = aux_texture;
					this.textureMapaNormal.image = new Image();
					
					this.textureMapaNormal.image.onload = function () {
						   handleLoadedTexture(aux_texture)
					}
					this.textureMapaNormal.image.src = texture_file;
				}
                
                this.createUniformPlaneGrid = function(){
                    
                    this.position_buffer = [];
                    this.color_buffer = [];
                    
                    this.normal_buffer = [];
                    this.biNormal_buffer = [];
                    this.tangent_buffer = [];
                    
                    this.texture_coord_buffer = [];
	
                    var cte=((this.cols-1.0)/2.0); 
                    var x=0.0;
                    var y=0.0;
                    
                    var imgU;
                    var imgV;
                     
                    for (var j=0;j<this.rows;j++){
                    		y=cte-j;	
                    		for (var i=0;i<this.cols;i++){
								x=cte+i;		  							
		  						
		  						//imgU = 1.0 - i/this.cols;
		  						//imgV = 1.0 -j/this.rows;
		  						imgU = 1.0 * i *2;
		  						imgV = 1.0 * j *2;
								if (this.itsNeil){
									imgU = 1.0- i/(this.cols-1.0);
									imgV = 1.0- j/(this.rows-1.0);
								}
								
		  						this.texture_coord_buffer.push(imgU);
		  						this.texture_coord_buffer.push(imgV);
		  						
								this.normal_buffer.push(x);
								this.normal_buffer.push(y);
								this.normal_buffer.push(-1.0);
								
								this.biNormal_buffer.push(1.0);
								this.biNormal_buffer.push(0.0);
								this.biNormal_buffer.push(0.0);
								
								this.tangent_buffer.push(0.0);
								this.tangent_buffer.push(1.0);
								this.tangent_buffer.push(0.0);

								//Todos los vertices siempre blanco
								this.color_buffer.push(1.0);
								this.color_buffer.push(1.0);
								this.color_buffer.push(1.0);
		  						
								this.position_buffer.push(x);
								this.position_buffer.push(y);
								this.position_buffer.push(0.0);		
                  		  	
                    	}
                    }
                }

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

                this.setupWebGLBuffers = function(){

					
					this.webgl_texture_coord_buffer = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
					this.webgl_texture_coord_buffer.itemSize = 2;
					this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;
					


                    this.webgl_normal_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
                    
                    
					this.webgl_biNormal_buffer = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_biNormal_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.biNormal_buffer), gl.STATIC_DRAW);
					
					this.webgl_tangent_buffer = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);       
					
                    
                    this.webgl_color_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
                    
                    this.webgl_position_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

                    
                    this.webgl_index_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);					
                }


                this.draw = function(modelMatrix){

                    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
                    gl.enableVertexAttribArray(vertexPositionAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
                    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

                    var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
                    gl.enableVertexAttribArray(vertexColorAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
                    gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

					var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
                    gl.enableVertexAttribArray(vertexNormalAttribute);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
                    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);


					var vertexBiNormalAttribute = gl.getAttribLocation(glProgram, "aVertexBiNormal");
					gl.enableVertexAttribArray(vertexBiNormalAttribute);
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_biNormal_buffer);
					gl.vertexAttribPointer(vertexBiNormalAttribute, 3, gl.FLOAT, false, 0, 0);
				
					var vertexTangentAttribute = gl.getAttribLocation(glProgram, "aVertexTangent");
					gl.enableVertexAttribArray(vertexTangentAttribute);
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
					gl.vertexAttribPointer(vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);

						
					var vertexTextureAttribute = gl.getAttribLocation(glProgram, "aTextureCoord");
					gl.enableVertexAttribArray(vertexTextureAttribute);
					gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
					
					if (!this.multipleImages)
						gl.vertexAttribPointer(vertexTextureAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);
					else gl.vertexAttribPointer(vertexTextureAttribute, this.webgl_texture_coord_buffer.itemSize + 1, gl.FLOAT, false, 0, 0);
						
						
					if (this.texture != null || this.textureMapaNormal != null){	
						var sampler = gl.getUniformLocation(glProgram, "uSampler");
						gl.activeTexture(gl.TEXTURE0);
						gl.bindTexture(gl.TEXTURE_2D, this.texture);
						gl.uniform1i(sampler, 0);
					}
					

					if (this.textureMapaNormal != null){
						var normalSampler = gl.getUniformLocation(glProgram, "uNormalSampler");
						gl.activeTexture(gl.TEXTURE0 + 1);
						gl.bindTexture(gl.TEXTURE_2D, this.textureMapaNormal);
						gl.uniform1i(normalSampler, 1);
					}
					
					
					if (this.secondTexture != null){
						var normalSampler = gl.getUniformLocation(glProgram, "uSecondTexture");
						gl.activeTexture(gl.TEXTURE0 + 2);
						gl.bindTexture(gl.TEXTURE_2D, this.textureMapaNormal);
						gl.uniform1i(normalSampler, 2);
					}
					
					
					///////////////////////////////////////////////////////////////////////////
					var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");
					gl.uniformMatrix4fv(u_model_view_matrix, false, modelMatrix);
					
					var normalMatrix = mat3.create();
					var invertModelMatrix = mat4.create();
					mat4.invert(invertModelMatrix, modelMatrix);
					mat3.fromMat4(normalMatrix, invertModelMatrix);
					mat3.transpose(normalMatrix, normalMatrix);
					
					var nMatrixUniform = gl.getUniformLocation(glProgram, "uNMatrix");
					gl.uniformMatrix3fv(nMatrixUniform, false, normalMatrix);
					///////////////////////////////////////////////////////////////////////////
					
					
					if (this.texture != null) gl.bindTexture(gl.TEXTURE_2D, this.texture);
					if (this.textureMapaNormal != null) gl.bindTexture(gl.TEXTURE_2D, this.textureMapaNormal);
					if (this.secondTexture != null) gl.bindTexture(gl.TEXTURE_2D, this.secondTexture);
					
						
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
                    gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
                }
                
                
				
                this.inicializar = function(){
					this.createUniformPlaneGrid();
              		this.createIndexBuffer();
					this.setupWebGLBuffers();                
                }
                
            }
