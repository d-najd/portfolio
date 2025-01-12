// useScreenSize.js
import { useEffect, useState } from "react"

const useScreenSize = (): Transform => {
	const [screenSize, setScreenSize] = useState<Transform>({
		x: window.innerWidth,
		y: window.innerHeight
	})

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				x: window.innerWidth,
				y: window.innerHeight
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
