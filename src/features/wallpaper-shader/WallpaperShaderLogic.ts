import vertexShader from '@/features/wallpaper-shader/vertex.glsl?raw'
import fragmentShader from '@/features/wallpaper-shader/fragment.glsl?raw'
import updateFragmentShader from '@/features/wallpaper-shader/updateFragment.glsl?raw'
import wallpaperImage from "@/resources/images/kolibri-os-1.png"
import { StarElement } from "@/features/wallpaper-shader/StarElement"
import { glslHelper } from "@/features/wallpaper-shader/glslHelper"

let mainTexture: WebGLTexture = null

export function WallpaperShaderLogic(gl: WebGLRenderingContext, timeElapsedSinceStartup: number) {
	const image = new Image()
	image.src = wallpaperImage

	image.onload = () => {
		mainTexture = createTextureFromImage(gl, image)
		render(gl, image, timeElapsedSinceStartup)
	}
}

function render(gl: WebGLRenderingContext, image: HTMLImageElement, curTime: number) {
	const mainProgram = createMainShaderProgram(gl)
	boilerplateSetup(gl, image, mainProgram, curTime)

	const updateProgram = createUpdateShaderProgram(gl)
	boilerplateSetup(gl, image, updateProgram, curTime)

	gl.useProgram(updateProgram);

	const framebuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, mainTexture, 0);

	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.useProgram(mainProgram);


	/*
	 */


	gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function boilerplateSetup(gl: WebGLRenderingContext, image: HTMLImageElement, program: WebGLProgram, curTime: number) {
	const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
	const positionLocation = gl.getAttribLocation(program, "a_position")
	const texcoordLocation = gl.getAttribLocation(program, "a_texCoord")

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

	resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT)

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

	gl.uniform1f(gl.getUniformLocation(program, "u_curTimeLocation"), curTime)

	// unorm
	const backgroundColor = new Float32Array([0.094117647, 0.125490196, 0.156862745, 1])
	gl.uniform4fv(gl.getUniformLocation(program, "u_backgroundColor"), backgroundColor)

	// in pixels
	// const islandCenterPx = new Int32Array([339, 241]);
	// gl.uniform2iv(gl.getUniformLocation(program, "u_islandCenterPx"), islandCenterPx)
	gl.uniform2f(gl.getUniformLocation(program, "u_islandCenter"), 0.1765625, 0.223148148)

	let starElementArr = new Array<StarElement>(30);
	for (let i = 0; i < starElementArr.length; i++) {
		starElementArr[i] = new StarElement(gl, program, "starElements", 0.3, 0.3, false)
	}
}

function createMainShaderProgram(gl: WebGLRenderingContext) {
	const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

	const program = gl.createProgram()
	gl.attachShader(program, vs)
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	gl.useProgram(program);

	return program
}

function createUpdateShaderProgram(gl: WebGLRenderingContext) {
	const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
	const fs = createShader(gl, gl.FRAGMENT_SHADER, updateFragmentShader)

	const program = gl.createProgram()
	gl.attachShader(program, vs)
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	gl.useProgram(program);

	return program
}

function createTextureFromImage(gl: WebGLRenderingContext, image: HTMLImageElement) {
	const texture = gl.createTexture()
	gl.activeTexture(gl.TEXTURE0)
	gl.bindTexture(gl.TEXTURE_2D, texture)

	glslHelper.setTextureParameters(gl, texture)

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

	return texture
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