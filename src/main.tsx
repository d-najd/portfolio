import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { ThemeProvider } from "@emotion/react"
import theme from "./theme/theme"

import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

const canvas = document.createElement('canvas')
canvas.width = 400
canvas.height = 400
document.body.appendChild(canvas)
const gl = canvas.getContext("webgl")!

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

// draw rectangle
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

/*
if (container) {
	const root = createRoot(container)

	root.render(
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</React.StrictMode>,
	)
} else {
	throw new Error(
		"Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
	)
}
 */