function SupBarrido (_radio) {

	this.radio = _radio;
	this.grilla = new VertexGrid(20,20);
	
	this.puntosPolinomio = [];
	
	this.cantidadTapas=50;

	this.createUniformEsfera = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var altura=0;
		var u=0;
		
		for (var j=0;j<this.grilla.rows;j++){
			for (var i=0;i<this.grilla.cols;i++){
					
				u+=(2*Math.PI)/this.grilla.cols;                    											   	
				x = this.radio * Math.cos(u);
				y = this.radio * Math.sin(u);
				
				this.grilla.position_buffer.push(x);								
				this.grilla.position_buffer.push(y);
				this.grilla.position_buffer.push(altura);	

				this.grilla.color_buffer.push(0.0);
				this.grilla.color_buffer.push(1.0);
				this.grilla.color_buffer.push(1.0);
				
			}
		}	

	}


	this.formarSupBarrido = function(_mvMatrix,_matrizModeloVista){
		
		var base= mat4.create();
		var xPol=0.0;
		var yPol=0.0;
		var zPol=0.0;
		
		var antY=0.0;
		var antX=0.0;
		var antZ=0.0;
		var angle=0.0;
		var angle2=0.0;
		
		var dirY =0.0;
		var dirX= 0.0;
		var dirZ= 0.0;
		var hip = 0.0;
		
		var possCurva=0;
		var angulorot=0;
		
		for (var i=0;i<this.cantidadTapas;i++){		
		
			xPol = this.puntosPolinomio[possCurva].getX();
			yPol = this.puntosPolinomio[possCurva].getY();
			zPol = this.puntosPolinomio[possCurva].getZ();
			
			v = [xPol, yPol, zPol];
			vec3.normalize(v,v);
			
			possCurva += Math.round(this.puntosPolinomio.length/this.cantidadTapas);
		
			dirX = v[0] - antX;
			dirY = v[1] - antY;
			dirZ = v[2] - antZ;
				
			antX = v[0];
			antY = v[1];
			antZ = v[2];
			
			angle = Math.atan(dirY/dirX);
			hip = Math.hypot(dirX,dirY);
			angle2 = Math.atan(dirZ/hip);
			
			mat4.identity(base);
			mat4.translate(base,mvMatrix,v);
			
			mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
		
			//mat4.rotate(base, base, angulo2, [0.0, 1.0, 0.0]);
			angulorot+=(2.0*Math.PI)/this.cantidadTapas;
			
			gl.uniformMatrix4fv(_matrizModeloVista, false, base);
			this.grilla.draw();

		}
	
	}

	this.draw = function(_matrizModeloVista){
		mat4.identity(mvMatrix);
		
		mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0,0.0]);
        mat4.rotate(mvMatrix, mvMatrix, Math.PI/2, [1.0, 0.0, 0.0]);
        //mat4.rotate(mvMatrix, mvMatrix, t, [0.0, 0.0, 1.0]);
        
        this.formarSupBarrido(mvMatrix,_matrizModeloVista);
        
	}              

	this.armarPolinomioBezier = function()
	{
	   var c = 0.551915024494;
	
	/*
	   punto1 = new Punto(-40.0,-40.0,0.0);
	   punto2 = new Punto(-10.0,200.0,0.0);	
	   punto3 = new Punto(10.0,-200.0,0.0);
	   punto4 = new Punto(40.0,40.0,0.0);
	   puntos = [punto1,punto2,punto3,punto4];
		*/
	   
	   
	   punto1 = new Punto(0.0,1.0,0.0);
	   punto2 = new Punto(c,1.0,0.0);
	   punto3 = new Punto(1.0,c,0.0);
	   punto4 = new Punto(1.0,0.0,0.0);
	   
	   punto5 = new Punto(1.0,0.0,0.0);
	   punto6 = new Punto(1.0,-1.0*c,0.0);
	   punto7 = new Punto(c,-1.0,0.0);
	   punto8 = new Punto(0.0,-1.0,0.0);
	   
	   punto9 = new Punto(0.0,-1.0,0.0);
	   punto10 = new Punto(-1.0*c,-1.0,0.0);
	   punto11 = new Punto(-1.0,-1.0*c,0.0);
	   punto12 = new Punto(-1.0,0.0,0.0);
	   
	   /*
	   punto13 = new Punto(-1.0,0.0,0.0);
	   punto14 = new Punto(-1.0,c,0.0);
	   punto15 = new Punto(-1.0*c,1.0,0.0);
	   punto16 = new Punto(0.0,1.0,0.0);*/
	   
	   puntos = [punto1,punto2,punto3,punto4,punto5,punto6,punto7,punto8,punto9,punto10,punto11,punto12];//,punto13,punto14,punto15,punto16];
	   
	   bezier = new Bezier(puntos,200);
	   bezier.bezier();
	   
	   this.puntosPolinomio = bezier.getPuntosFinales();
	}

	this.inicializar = function()
	{
		this.armarPolinomioBezier();
		this.createUniformEsfera();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}
}


			
			
			
			/*
			mat4.identity(base);
			
			//
			//
			mat4.rotate(base,base,angle,[1.0, 1.0, 1.0]);
			//mat4.rotate(base,base,angle2,[1.0, 1.0, 1.0]);
			
			vec4.normalize([base[0],base[1],base[2],base[3]],[base[0],base[1],base[2],base[3]]);
			vec4.normalize([base[4],base[5],base[6],base[7]],[base[4],base[5],base[6],base[7]]);
			vec4.normalize([base[8],base[9],base[10],base[11]],[base[8],base[9],base[10],base[11]]);
			vec4.normalize([base[12],base[13],base[14],base[15]],[base[12],base[13],base[14],base[15]]);
			
			v[0] = base[0] * v[0] + base[4] * v[1] + base[8] * v[2];
			v[1] = base[1] * v[0] + base[5] * v[1] + base[9] * v[2];
			v[2] = base[2] * v[0] + base[6] * v[1] + base[10] * v[2];*/
