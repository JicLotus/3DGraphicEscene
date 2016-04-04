
            function EsferaGrid (_radio) {

						this.radio = _radio;
						this.grilla = new VertexGrid(5,5);

               this.createUniformEsfera = function(){
                    
                    this.grilla.position_buffer = [];
                    this.grilla.color_buffer = [];

                    var cte=((this.grilla.cols-1.0)/4.0); 
                    var valor1=0.0;
                    var valor2=0.0;
                     
                    for (var j=0;j<this.grilla.cols;j++){
                    		for (var i=0;i<this.grilla.rows;i++){
  									
  									valor1=j-cte;
  									valor2=i-cte;
  									
  									this.grilla.position_buffer.push(valor1);
									this.grilla.position_buffer.push(valor2);
									this.grilla.position_buffer.push(0.0);		
  
		  							//Todos los vertices siempre blanco
      		              	this.grilla.color_buffer.push(1.0);
            		        	this.grilla.color_buffer.push(1.0);
                  		  	this.grilla.color_buffer.push(1.0);
                    		}
                    }
                    
                }
                
					this.drawVertexEsfera = function(){
						this.grilla.drawVertexGrid();
					}              
                
                this.inicializar = function()
                {
						this.createUniformEsfera();
              		this.grilla.createIndexBuffer();
                  this.grilla.setupWebGLBuffers();                   
                }
                
                
            }
            
            