import vertexShader from '@/features/wallpaper-shader/vertex.glsl?raw'
import fragmentShader from '@/features/wallpaper-shader/fragment.glsl?raw'
import wallpaperImage from "@/resources/images/UV_by_peterdackers.png"

export function WallpaperShaderLogic(gl: WebGLRenderingContext, timeElapsedSinceStartup: number) {
//Vertex coordinates and colors
	const vertices = [
		-0.5, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 1.0, 0.0, 0.0, 0.5, 0.5, 1.0, 0.0,
		0.0, 0.5, -0.5, 1.0, 0.0, 0.0
	]

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

	const a_position = gl.getAttribLocation(program, "a_position")
	gl.enableVertexAttribArray(a_position)
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 20, 0);

	const a_color = gl.getAttribLocation(program, "a_color")
	gl.enableVertexAttribArray(a_color)
	gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 20, 8);

	const test2 = gl.getUniformLocation(program, "test")!
	gl.uniform3fv(test2, [1.0, 0.0, 0.0])

	const u_time_since_startup = gl.getUniformLocation(program, "time_since_startup")!
	gl.uniform1f(u_time_since_startup, timeElapsedSinceStartup)

	setWallpaperTexture(gl)

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
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