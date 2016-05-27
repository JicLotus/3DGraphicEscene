var gl = null,
	canvas = null,
	glProgram = null,
	fragmentShader = null,
	vertexShader = null,
	left=0.0;
	right=0.0;
	leftAnterior=0.0;
	rightAnterior=0.0;
	upDown=0.0;
	t = 0.0;
	xe=0.0;
	fovy=45;
	aspect=640.0/480.0;
	near= 0.1;
	far= 100.0;
	my_grid = null;
	anguloRotacionTurbina = Math.PI;
	anguloRotacionAla = Math.PI;
	factorTrenAterrizaje = 1.0;
	anguloPaneles = 0.0;
	camara = 1;
	caminarHorizontalmente=0.0;
	caminarHorizontalmenteAnterior=0.0;
	anguloCaminando = 0.0;
	normaDireccionNueva = 0.0;
	normaDireccionVieja = 0.0;
	rotacionVertical = 0.0;
	rotacionHorizontal = 0.0;
	x=0;
	xAnt = 0;
	yAnt = 0;
	xAnt2 = 0;
	arribaAnterior = 0;
	yAnt2 = 0;
	y=0;
	mx=0;
	my=0;
	viejaX = 0.0;
	viejoY = 0.0;


	nivelCierre = 4;
	clickPresionado = false;


var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var matrizTransformacion = mat4.create();

//centro y ojo que se le pasan a la funcion de Look At
var eye = [0.0,0.0,0.0];
var center = [0.0,0.0,0.0];

//variables auxiliares para la vista dentro de la estacion
var eyeAnterior = [0.0,0.0,0.0];
var centerAnterior = [0.0,0.0,0.0];

//centro y ojo si se estuviera dentro de la estacion
var eyeEstacion =    [0.4,0.0,0.0];
var centerEstacion = [0.4,5.0,0.0];

//centro y ojo si se estuviera dentro de la cabina
var eyeCabina = [0.0,0.7,1.0];
var centerCabina = [0.0,0.7,1.5];

//centro y ojo de la camara si se estuviera viendo desde atras
var centerNaveAtras = [0.0,1.0,0.0];
var eyeNaveAtras = [0.0, 1.0, -3.0];



function getShader(gl, id) {
	var shaderScript, src, currentChild, shader;

	// Obtenemos el elemento <script> que contiene el código fuente del shader.
	shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	// Extraemos el contenido de texto del <script>.
	src = "";
	currentChild = shaderScript.firstChild;
	while(currentChild) {
		if (currentChild.nodeType == currentChild.TEXT_NODE) {
			src += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	// Creamos un shader WebGL según el atributo type del <script>.
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	// Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
	gl.shaderSource(shader, src);

	// Compilamos el shader.
	gl.compileShader(shader);  
	  
	// Chequeamos y reportamos si hubo algún error.
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
	  alert("An error occurred compiling the shaders: " + 
			gl.getShaderInfoLog(shader));  
	  return null;  
	}
	  
	return shader;
}


function initWebGL()
{
	canvas = document.getElementById("my-canvas");  
	try{
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");                    
	}catch(e){
	}
					
	if(gl)
	{
		setupWebGL();
		initShaders();
		setupBuffers();
		setInterval(drawScene, 10);  
	}else{    
		alert(  "Error: Your browser does not appear to support WebGL.");
	}
}

function setupWebGL()
{
	//set the clear color
	gl.clearColor(0.0, 0.0, 0.0, 1.0);     
	gl.enable(gl.DEPTH_TEST);                              
	gl.depthFunc(gl.LEQUAL); 
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	
	gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders()
{
	// Obtenemos los shaders ya compilados
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	// Creamos un programa de shaders de WebGL.
	glProgram = gl.createProgram();

	// Asociamos cada shader compilado al programa.
	gl.attachShader(glProgram, vertexShader);
	gl.attachShader(glProgram, fragmentShader);

	// Linkeamos los shaders para generar el programa ejecutable.
	gl.linkProgram(glProgram);

	// Chequeamos y reportamos si hubo algún error.
	if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
	  alert("Unable to initialize the shader program: " + 
			gl.getProgramInfoLog(glProgram));
	  return null;
	}

	// Le decimos a WebGL que de aquí en adelante use el programa generado.
	gl.useProgram(glProgram);
}

function makeShader(src, type)
{
	//compile the vertex shader
	var shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
	}
	return shader;
}

function setupBuffers()
{
   tierra = new Tierra();
   sol = new Sol();
   estacionEspacial = new EstacionEspacial();
   estacionEspacial.inicializar();
   naveEspacial = new NaveEspacial();
}

function handleLoadedTexture() {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, sol.getTexture());
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sol.getTexture().image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);
}
