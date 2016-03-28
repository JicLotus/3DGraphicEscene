          //////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////
            //
            // OBJETO VERTEX-GRID
            // Definimos un constructor para el objeto VertexGrid
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

                    // ACTIVIDAD 1.
                    // Este index buffer está armado para renderizar dos los triangulos
                    // que se obervan como ejemplo.
                    // Modificar el método para que a partir de conocer las dimensiones
                    // de la grilla (que deberían estar en los atributos this.rows y this.cols)
                    // se genere el index buffer correspondiente para renderizar la grilla utilizando
                    // triangle-strip
                    //
                    this.index_buffer = [0, 1, 2, 1, 2, 3];
                }

                // Esta función inicializa el position_buffer y el color buffer de forma de 
                // crear un plano de color gris que se extiende sobre el plano XY, con Z=0
                // El plano se genera centrado en el origen.
                // El propósito de esta función es a modo de ejemplo de como inicializar y cargar
                // los buffers de las posiciones y el color para cada vértice.
                this.createUniformPlaneGrid = function(){

                    this.position_buffer = [];
                    this.color_buffer = [];

                    for (var i = 0.0; i < this.rows; i++) { 
                       for (var j = 0.0; j < this.cols; j++) {

                           // Para cada vértice definimos su posición
                           // como coordenada (x, y, z=0)
                           this.position_buffer.push(i-(this.rows-1.0)/2.0);
                           this.position_buffer.push(j-(this.rows-1)/2.0);
                           this.position_buffer.push(0);

                           // Para cada vértice definimos su color
                           this.color_buffer.push(1.0/this.rows * i);
                           this.color_buffer.push(0.2);
                           this.color_buffer.push(1.0/this.cols * j);
                                                  
                       };
                    };
                }

                // ACTIVIDAD 2.
                // Crear alguna otra función similar a la anterior createUniformPlaneGrid()
                // que cree una superficie en donde la altura ya no sea z=0 sino que tenga aluna forma
                // o partón en particular.


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


                // Esta función es la que se encarga de configurar todo lo necesario
                // para dibujar el VertexGrid.
                // En el caso del ejemplo puede observarse que la última línea del método
                // indica dibujar triángulos utilizando los 6 índices cargados en el Index_Buffer
                // ATIVIDAD 3.
                // Reemplazar dicha línea de código por la correspondiente para dibujar el strip
                // de triángulos utilizando el index buffer generado en la ACTIVIDAD 1.
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
                    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
                }
            }
            //
            //////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////
