import vertexShader from '@/features/wallpaper-shader/vertex.glsl?raw'
import fragmentShader from '@/features/wallpaper-shader/fragment.glsl?raw'
import wallpaperImage from "@/resources/images/UV_by_peterdackers.png"

export function WallpaperShaderLogic(gl: WebGLRenderingContext, timeElapsedSinceStartup: number) {
	const texture = gl.createTexture()
	const image = new Image()
	image.src = wallpaperImage

	image.onload = () => {
		render(gl, image)
	}

	// render(gl, )

	/*
	const vertices = new Float32Array([
		-1, -1,  0, 1,
		1, -1,  1, 1,
		-1,  1,  0, 0,
		1,  1,  1, 0,
	]);

	const vertexBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

	const program = gl.createProgram()
	gl.attachShader(program, vs)
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	gl.useProgram(program);

	const aPosition = gl.getAttribLocation(program, 'aPosition');
	const aTexCoord = gl.getAttribLocation(program, 'aTexCoord');

	gl.enableVertexAttribArray(aPosition);
	gl.enableVertexAttribArray(aTexCoord);

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
	gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 16, 8);

	/*
	const test2 = gl.getUniformLocation(program, "test")!
	gl.uniform3fv(test2, [1.0, 0.0, 0.0])

	const u_time_since_startup = gl.getUniformLocation(program, "time_since_startup")!
	gl.uniform1f(u_time_since_startup, timeElapsedSinceStartup)
	 */

	// setWallpaperTexture(gl)

	/*
	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 6;
	gl.drawArrays(primitiveType, offset, count);
	 */

	// gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function setWallpaperTexture(gl: WebGLRenderingContext) {
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

	const texture = gl.createTexture()
	const image = new Image()
	image.src = wallpaperImage

	image.onload = () => {
		gl.bindTexture(gl.TEXTURE_2D, texture)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.generateMipmap(gl.TEXTURE_2D);

		// gl.clearColor(0, 0, 0, 1);
		// gl.clear(gl.COLOR_BUFFER_BIT);
	}
}


function render(gl: WebGLRenderingContext, image: any) {
	const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

	const program = gl.createProgram()
	gl.attachShader(program, vs)
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	gl.useProgram(program);

	// look up where the vertex data needs to go.
	const positionLocation = gl.getAttribLocation(program, "a_position")
	const texcoordLocation = gl.getAttribLocation(program, "a_texCoord")

	// Create a buffer to put three 2d clip space points in
	const positionBuffer = gl.createBuffer()

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	// Set a rectangle the same size as the image.
	setRectangle(gl, 0, 0, image.width, image.height)

	// provide texture coordinates for the rectangle.
	const texcoordBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
		]),
		gl.STATIC_DRAW,
	)

	// Create a texture.
	const texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Set the parameters so we can render any size image.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

	// Upload the image into the texture.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

	// lookup uniforms
	const resolutionLocation = gl.getUniformLocation(program, "u_resolution")

	resizeCanvasToDisplaySize(gl.canvas, undefined)

	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	// Clear the canvas
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT)

	// Tell it to use our program (pair of shaders)
	gl.useProgram(program)

	// Turn on the position attribute
	gl.enableVertexAttribArray(positionLocation)

	// Bind the position buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	let size = 2 // 2 components per iteration
	let type = gl.FLOAT  // the data is 32bit floats
	let normalize = false  // don't normalize the data
	let stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
	let offset = 0 // start at the beginning of the buffer
	gl.vertexAttribPointer(
		positionLocation,
		size,
		type,
		normalize,
		stride,
		offset,
	)

	// Turn on the texcoord attribute
	gl.enableVertexAttribArray(texcoordLocation)

	// bind the texcoord buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)

	// Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
	size = 2 // 2 components per iteration
	type = gl.FLOAT  // the data is 32bit floats
	normalize = false  // don't normalize the data
	stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
	offset = 0 // start at the beginning of the buffer
	gl.vertexAttribPointer(
		texcoordLocation,
		size,
		type,
		normalize,
		stride,
		offset,
	)

	// set the resolution
	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)

	// Draw the rectangle.
	const primitiveType = gl.TRIANGLES
	offset = 0
	const count = 6
	gl.drawArrays(primitiveType, offset, count)
}

function setRectangle(gl: any, x: any, y: any, width: any, height: any) {
	const x1 = x
	const x2 = x + width
	const y1 = y
	const y2 = y + height
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
		gl.STATIC_DRAW,
	)
}

function resizeCanvasToDisplaySize(canvas: any, multiplier: any) {
	multiplier = multiplier || 1;
	const width  = canvas.clientWidth  * multiplier | 0;
	const height = canvas.clientHeight * multiplier | 0;
	if (canvas.width !== width ||  canvas.height !== height) {
		canvas.width  = width;
		canvas.height = height;
		return true;
	}
	return false;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type)!
	gl.shaderSource(shader, source)
	gl.compileShader(shader)
	return shader
}


/*
export const WallpaperShaderSetup = () => {

}
 */