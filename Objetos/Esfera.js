
            function EsferaGrid (_radio) {

						this.radio = _radio;
						this.grilla = new VertexGrid(15,15);

               this.createUniformEsfera = function(){
                    
                    this.grilla.position_buffer = [];
                    this.grilla.color_buffer = [];

                    var cte=((this.grilla.cols-1.0)/4.0); 
                    var x=0.0;
                    var y=0.0;
                    var z=0.0;
                    var phi=0.0;
                    var thita=0.0;
                     
                    for (var j=0;j<this.grilla.cols;j++){
                    		for (var i=0;i<this.grilla.rows;i++){
  									
  									//x=j-cte;
  									//y=i-cte;
  									thita+=400.0;
  									phi+=400.0;
									
  									x = this.radio * Math.cos(phi) * Math.cos(thita);
  									y = this.radio * Math.cos(phi) * Math.sin(thita);
  									z = this.radio * Math.sin(phi);
  									
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
            
            