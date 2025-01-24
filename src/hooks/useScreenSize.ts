import { useEffect, useState } from "react"
import type { Size } from "@/ui/transforms"

const useScreenSize = (): Size => {
	const [screenSize, setScreenSize] = useState<Size>({
		width: window.innerWidth,
		height: window.innerHeight,
	})

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener("resize", handleResize)

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return screenSize
}

export default useScreenSize
