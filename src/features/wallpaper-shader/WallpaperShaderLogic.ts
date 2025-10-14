import vertexShader from '@/features/wallpaper-shader/vertex.glsl?raw'
import fragmentShader from '@/features/wallpaper-shader/fragment.glsl?raw'

export function WallpaperShaderLogic(gl: WebGLRenderingContext, timeElapsedSinceStartup: number) {
//Vertex coordinates and colors
	const vertices = [
		-0.5, 0.5, //first-pos
		0.75, 0.75, //second-pos
		0.0, -0.5, //t-pos
		-0.5, 1.0, //forth-pos
		0.75, 0.75, 0.5, 0.5,
		0.75, 0.75, 0.75, 0.5,
		-0.5, 0.75, 0.75, 0.75
	]

// Create a buffer object
	const vertexBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create shader function
	function createShader(gl: WebGLRenderingContext, type: number, source: string) {
		const shader = gl.createShader(type)!
		gl.shaderSource(shader, source)
		gl.compileShader(shader)
		return shader
	}

// Compile vertex and fragment shaders
	const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

// Create a shader program
	const program = gl.createProgram()
	gl.attachShader(program, vs)
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	gl.useProgram(program);

// Enable vertex attributes
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
// gl.uniform1f(test2, 0.1)
// gl.uniform2f(program, test2, 0.5)

// draw rectangle
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


/*
export const WallpaperShaderSetup = () => {

}
 */