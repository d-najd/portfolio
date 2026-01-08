export interface IGLSLStruct {

	uniformStruct(gl: WebGLRenderingContext, program: WebGLProgram, uniformAttribName: string): void
	dispose(): void
}