import "./App.css"
import wallpaperImg from "./resources/images/wallpaper-basic.png"
import { BottomPanel } from "./features/bottom-panel/BottomPanel"
import styled from "@emotion/styled"
import { WindowDrawer } from "./features/window-drawer/WindowDrawer"
import { DesktopIcons } from "./features/desktop-icons/DesktopIcons"
import {
	onProjectsWindowOpened,
	onSendMailWindowOpened,
	unfocus,
} from "./features/window/windowSlice"
import { useAppDispatch } from "@/app/hooks"

let openProjectsWindow = false
let openSendMailWindow = false

const App = () => {
	const dispatch = useAppDispatch()
	if (openProjectsWindow) {
		openProjectsWindow = false
		dispatch(onProjectsWindowOpened())
	}

	if (openSendMailWindow) {
		openSendMailWindow = false
		dispatch(onSendMailWindowOpened())
	}

	return (
		<Wallpaper
			onPointerDown={o => {
				if (o.target === o.currentTarget) {
					dispatch(unfocus())
					return
				}
			}}
		>
			<DesktopIcons />
			<WindowDrawer />
			<BottomPanel />
		</Wallpaper>
	)
}

const Wallpaper = styled.div`
	position: absolute;
	background: url(${wallpaperImg}) no-repeat center center fixed;
	background-size: cover;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	text-decoration-style: dotted;
`

export default App
