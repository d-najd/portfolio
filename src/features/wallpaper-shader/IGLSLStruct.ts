export abstract class IGLSLStruct {
	protected constructor(
		public gl: WebGLRenderingContext,
		public program: WebGLProgram,
		public uniformAttribName: string,
	) {}

	/**
	 * Initialises the struct as uniform struct
	 * @param uniformAttribNameExtra Extra string to be added to the main name, like the current index if there is an
	 * array
	 */
	abstract uniformStruct(uniformAttribNameExtra: string): void

	abstract update(timePassedSeconds: number): void

	abstract dispose(): void
}
