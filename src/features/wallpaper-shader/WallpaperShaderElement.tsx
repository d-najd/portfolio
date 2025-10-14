import React, { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { WallpaperShaderLogic } from "@/features/wallpaper-shader/WallpaperShaderLogic"
import { useTimeSinceStartup } from "@/hooks/useTimeSinceStartup"

export const WallpaperShaderElement = React.memo(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const timeSinceStartup = useTimeSinceStartup(2)

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas == null) {
			return
		}
		console.log("INVOKED " + timeSinceStartup)

		const gl = canvas.getContext("webgl")!
		WallpaperShaderLogic(gl, timeSinceStartup)
	}, [timeSinceStartup])

	return (
		<div>
			<Canvas ref={canvasRef}/>
		</div>
	)
})

const Canvas = styled.canvas`
	width: 400px;
	height: 400px;
`