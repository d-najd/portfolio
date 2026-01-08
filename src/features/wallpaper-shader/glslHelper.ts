import type { IGLSLStruct } from "@/features/wallpaper-shader/IGLSLStruct"

export class glslHelper {
	static uniformStructs(gl: WebGLRenderingContext, program: WebGLProgram, uniformAttribName: string, structs: Iterable<IGLSLStruct>) {
		let index = 0;
		for (const curStruct of structs) {
			curStruct.uniformStruct(gl, program, uniformAttribName + `[${index}]`)
			index++;
		}
	}

	static copyTexture(
		gl: WebGLRenderingContext,
		srcTex: WebGLTexture,
		dstTex: WebGLTexture,
		width: number,
		height: number
	) {
		const fb = gl.createFramebuffer()!;
		gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dstTex, 0);

		if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
			throw new Error("Framebuffer not complete");
		}

		gl.viewport(0, 0, width, height);

		gl.useProgram(copyProgram);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, srcTex);
		gl.uniform1i(srcTexLocation, 0);

		gl.bindVertexArray(quadVAO);
		gl.drawArrays(gl.TRIANGLES, 0, 6);

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		gl.deleteFramebuffer(fb);
	}
}