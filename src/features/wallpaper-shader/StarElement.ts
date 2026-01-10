import { IGLSLStruct } from "@/features/wallpaper-shader/IGLSLStruct"

export class StarElement extends IGLSLStruct {
	constructor(
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		uniformAttribName: string,
		public positionX: number = 0.5,
		public positionY: number = 0.5,
		public active: false,
	) {
		super(gl, program, uniformAttribName)
	}

	uniformStruct(uniformAttribNameExtra: string = ""): void {
		const finalUniformAttribName = this.uniformAttribName + uniformAttribNameExtra

		this.gl.uniform2f(
			this.gl.getUniformLocation(this.program, finalUniformAttribName + ".position"),
			this.positionX,
			this.positionY,
		)
	}

	update(timePassed: number) {

	}

	dispose(): void {}
}
