export abstract class IGLSLStruct {
	abstract uniformStruct(gl: WebGLRenderingContext, program: WebGLProgram, uniformAttribName: string): void

	abstract dispose(): void
}
