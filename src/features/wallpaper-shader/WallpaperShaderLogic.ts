import vertexShader from '@/features/wallpaper-shader/vertex.glsl?raw'
import fragmentShader from '@/features/wallpaper-shader/fragment.glsl?raw'
import wallpaperImage from "@/resources/images/UV_by_peterdackers.png"

export function WallpaperShaderLogic(gl: WebGLRenderingContext, timeElapsedSinceStartup: number) {
	const image = new Image()
	image.src = wallpaperImage

	image.onload = () => {
		render(gl, image, timeElapsedSinceStartup)
	}
}

function render(gl: WebGLRenderingContext, image: HTMLImageElement, timeElapsedSinceStartup: number) {
	const program = createShaderProgram(gl)

	const positionLocation = gl.getAttribLocation(program, "a_position")
	const texcoordLocation = gl.getAttribLocation(program, "a_texCoord")
	const resolutionLocation = gl.getUniformLocation(program, "u_resolution")

	const positionBuffer = gl.createBuffer()

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	setRectangle(gl, 0, 0, image.width, image.height)

	const texcoordBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
		]),
		gl.STATIC_DRAW,
	)

	setTexture(gl, image)


	resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.useProgram(program)

	gl.enableVertexAttribArray(positionLocation)

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	gl.vertexAttribPointer(
		positionLocation,
		2,
		gl.FLOAT,
		false,
		0,
		0,
	)

	gl.enableVertexAttribArray(texcoordLocation)
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)

	gl.vertexAttribPointer(
		texcoordLocation,
		2,
		gl.FLOAT,
		false,
		0,
		0,
	)

	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
	gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function createShaderProgram(gl: WebGLRenderingContext) {
	const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

	const program = gl.createProgram()
	gl.attachShader(program, vs)
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	gl.useProgram(program);

	return program
}

function setTexture(gl: WebGLRenderingContext, image: HTMLImageElement) {
	const texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
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

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, multiplier: number = 1) {
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