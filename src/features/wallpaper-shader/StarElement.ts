import type IGLSLStruct from "@/features/wallpaper-shader/IGLSLStruct"

export class StarElement implements IGLSLStruct {
	active: boolean
	positionX: number
	positionY: number

	gl: WebGLRenderingContext
	program: WebGLProgram
	uniformAttribName: string

	constructor(gl: WebGLRenderingContext = null, program: WebGLProgram = null, uniformAttribName: string = null, positionX: number = 0.5, positionY: number = 0.5, active: false) {
		this.init(positionX, positionY)
	}

	init(gl: WebGLRenderingContext = null, program: WebGLProgram = null, uniformAttribName: string = null, positionX: number = 0.5, positionY: number = 0.5, active: false) {
		this.positionX = positionX
		this.positionY = positionY
		this.gl = gl
		this.program = program
		this.uniformAttribName = uniformAttribName
	}

	uniformStruct(
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		uniformAttribName: string = this.uni,
	): void {
		gl.uniform2f(
			gl.getUniformLocation(program, uniformAttribName + ".position"),
			this.positionX,
			this.positionY,
		)
	}

	update(timePassed: number) {}

	dispose(): void {}
}
