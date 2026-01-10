import type { IGLSLStruct } from "@/features/wallpaper-shader/IGLSLStruct"

export class glslHelper {
	static uniformStructs(gl: WebGLRenderingContext, program: WebGLProgram, uniformAttribName: string, structs: Iterable<IGLSLStruct>) {
		let index = 0;
		for (const curStruct of structs) {
			curStruct.uniformStruct(`[${index}]`)
			index++;
		}
	}

	static createBlankTexture(gl: WebGLRenderingContext, width: number, height: number): WebGLTexture {
		const currentTexture = gl.getParameter(gl.TEXTURE_BINDING_2D)

		const texture = gl.createTexture()
		gl.bindTexture(gl.TEXTURE_2D, texture)

		const blackData = new Uint8Array(width * height * 4)

		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			width,
			height,
			0,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			blackData
		)

		this.setTextureParameters(gl, texture)

		gl.bindTexture(gl.TEXTURE_2D, currentTexture)

		return texture
	}

	static setTextureParameters(gl: WebGLRenderingContext, texture: WebGLTexture) {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
	}
}