import "./App.css"
import wallpaperImg from "./resources/images/kolibri-os.png"
import { BottomPanel } from "./features/bottom-panel/BottomPanel"
import styled from "@emotion/styled"
import { WindowDrawer } from "./features/window-drawer/WindowDrawer"
import { DesktopIcons } from "./features/desktop-icons/DesktopIcons"

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
				<WindowDrawer />
				<DesktopIcons />
				<BottomPanel />
			</Wallpaper>
		</>
	)
}

export default App
