function setMatrizLookAtAdentroEstacion(){

	var u_vista_matrix = gl.getUniformLocation(glProgram, "uVistaMatrix");
	//////////CAMARA
	////////////////////////////////////////////////////////////////
	mat4.identity(CameraMatrix);
	
	matrizTransformacion = estacionEspacial.getMatriz();                                
	// Y es el vector de arriba
	up = [0.0,1.0,0.0];

	var rotacion = mat4.create();
	mat4.identity(rotacion);

	//si hubo giro hacia izquierda/derecha hago la rotacion acorde
	if (mx!=leftAnterior){
		mat4.translate(rotacion, rotacion, [eyeEstacion[0],eyeEstacion[1],eyeEstacion[2]]);
		mat4.rotate(rotacion,rotacion,(leftAnterior-mx)/200, [0,0,1]);
		mat4.translate(rotacion, rotacion, [-eyeEstacion[0],-eyeEstacion[1],-eyeEstacion[2]]);

		vec3.transformMat4(centerEstacion,centerEstacion,rotacion);
	}

	if (my!=arribaAnterior){
		centerEstacion=[centerEstacion[0], centerEstacion[1], centerEstacion[2]+Math.sin((arribaAnterior-my)/100)];
	}

	if (right!=rightAnterior){
		var difX = centerEstacion[0]-eyeEstacion[0];
		var difY = centerEstacion[1]-eyeEstacion[1];
		eyeEstacion=[eyeEstacion[0]+(rightAnterior-right)*difX,
						eyeEstacion[1]+(rightAnterior-right)*difY, eyeEstacion[2]];
		centerEstacion=[centerEstacion[0]+(rightAnterior-right)*difX, centerEstacion[1]+(rightAnterior-right)*difY, centerEstacion[2]];
	} 

	if (caminarHorizontalmente != caminarHorizontalmenteAnterior){
		var diferenciaHorizontal = caminarHorizontalmenteAnterior-caminarHorizontalmente;
		var direccion = [centerEstacion[0]-eyeEstacion[0],centerEstacion[1]-eyeEstacion[1],centerEstacion[2]-eyeEstacion[2]];
		var direccionPerpendicular = [direccion[1], -direccion[0], direccion[2]];

		eyeEstacion = [eyeEstacion[0]+diferenciaHorizontal*direccionPerpendicular[0],
					   eyeEstacion[1]+diferenciaHorizontal*direccionPerpendicular[1], 
					   eyeEstacion[2]];
		centerEstacion = [centerEstacion[0]+diferenciaHorizontal*direccionPerpendicular[0], 
						  centerEstacion[1]+diferenciaHorizontal*direccionPerpendicular[1], 
						  centerEstacion[2]];
	}

	caminarHorizontalmenteAnterior = caminarHorizontalmente;
	rightAnterior = right;
	leftAnterior = mx;
	arribaAnterior = my;
	matrizPosicion = mat4.create();

	mat4.identity(matrizPosicion);

	mat4.translate(matrizTransformacion, matrizTransformacion, [2.0,0,-0.8]);
	vec3.transformMat4(eye,eyeEstacion,matrizTransformacion);
	vec3.transformMat4(center,centerEstacion,matrizTransformacion);

	mat4.lookAt(CameraMatrix, eye, center, up);
}

function setMatrizLookAtNavePiloto(){
	var u_vista_matrix = gl.getUniformLocation(glProgram, "uVistaMatrix");
	//////////CAMARA
	////////////////////////////////////////////////////////////////
	mat4.identity(CameraMatrix);
	
	matrizTransformacion = naveEspacial.getMatriz();
	
	
	vec3.transformMat4(eye,eyeCabina,matrizTransformacion);
	
	
	vec3.transformMat4(center,centerCabina,matrizTransformacion);
	
	up = [0.0,1.0,0.0];

	mat4.lookAt(CameraMatrix, eye, center, up);
}			

function setMatrizLookAtNaveAtras()
{
	
	var u_vista_matrix = gl.getUniformLocation(glProgram, "uVistaMatrix");
	//////////CAMARA
	////////////////////////////////////////////////////////////////
	mat4.identity(CameraMatrix);
					
	matrizTransformacion = naveEspacial.getMatriz();

	// Y es el vector de arriba
	
	vec3.transformMat4(eye,eyeNaveAtras,matrizTransformacion);
	
	vec3.transformMat4(center,centerNaveAtras,matrizTransformacion);
	
	up = [0.0,1.0,0.0];

	mat4.lookAt(CameraMatrix, eye, center, up);
	

	////////////////////////////////////////////////////////////////
}

function setMatrizLookAtVistaGeneral()
{
	
	var u_vista_matrix = gl.getUniformLocation(glProgram, "uVistaMatrix");
	//////////CAMARA
	////////////////////////////////////////////////////////////////
	mat4.identity(CameraMatrix);

	matrizTransformacion = estacionEspacial.getMatriz();
	
	// Y es el vector de arriba
	eye = [20.0-upDown,0.0,0.0]; // Posicion de la camara en el mundo
	
	mat4.rotate(matrizTransformacion, matrizTransformacion, rotacionHorizontal/100, [0.0, 0.0, 1.0]);
	mat4.rotate(matrizTransformacion, matrizTransformacion, rotacionVertical/100, [0.0,1.0,0.0]);
	
	vec3.transformMat4(eye,eye,matrizTransformacion);
	
	center = [0.0,0.0,0.0]; //Punto al cual mira la camara al mundo
	
	vec3.transformMat4(center,center,matrizTransformacion);
	
	up = [0.0,1.0,0.0];
	mat4.lookAt(CameraMatrix, eye, center, up);
	
	////////////////////////////////////////////////////////////////
}
