import "./App.css"
import wallpaperImg from "./resources/images/kolibri-os.png"
import { BottomPanel } from "./features/bottom-panel/BottomPanel"
import styled from "@emotion/styled"
import { WindowManager } from "./features/window-manager/WindowManager"

const App = () => {
	const Wallpaper = styled.div`
		background: url(${wallpaperImg}) no-repeat center center fixed;
		background-size: cover;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		position: absolute;
	`

	return (
		<>
			<Wallpaper>
				<WindowManager />
				<BottomPanel />
			</Wallpaper>
		</>
	)
}

export default App
