import React, { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { WallpaperShaderLogic } from "@/features/wallpaper-shader/WallpaperShaderLogic"
import { useTimeSinceStartup } from "@/hooks/useTimeSinceStartup"

export const WallpaperShaderElement = React.memo(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const timeSinceStartup = useTimeSinceStartup(50)

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas == null) {
			return
		}
		// console.log("INVOKED " + timeSinceStartup)

		const gl = canvas.getContext("webgl")!

		WallpaperShaderLogic(gl, timeSinceStartup)
	}, [timeSinceStartup])

	return (
			<Canvas ref={canvasRef}/>
	)
})

const Canvas = styled.canvas`
	width: 100%;
	height: 100%;
	background-color: #011627;
`