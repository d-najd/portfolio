import { IGLSLStruct } from "@/features/wallpaper-shader/IGLSLStruct"

export class StarElement extends IGLSLStruct {
	constructor(
		public positionX: number = 0.5,
		public positionY: number = 0.5,
		public timeForLoopSeconds: number = 5.0,
		public active: boolean,
	) {
		super()
	}

	uniformStruct(gl: WebGLRenderingContext, program: WebGLProgram, uniformAttribName: string): void {
		gl.uniform2f(
			gl.getUniformLocation(program, uniformAttribName + ".position"),
			this.positionX,
			this.positionY,
		)
	}

	/**
	 * Should update only on the cpu side
	 * @param timePassedSeconds amount of time passed
	 */
	updateCpu(timePassedSeconds: number): void {
		console.log("CURRENT " + this.positionX)
		this.positionX -= 0.01;
		// this.positionX = Math.max(0, this.positionX - (timePassedSeconds / this.timeForLoopSeconds));
	}

	dispose(): void {}
}
