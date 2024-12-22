import "./App.css"
import wallpaperImg from "./resources/kolibri-os.png"
import { BottomPanel } from "./features/bottom-panel/BottomPanel"
import styled from "@emotion/styled"
import { WindowDrawer } from "./features/window-drawer/WindowDrawer"

const App = () => {
	const Wallpaper = styled.div`
		background: url(${wallpaperImg}) no-repeat center center fixed;
		background-size: cover;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		position: absolute;
	`

	// Top level components here should always be position: absolute
	return (
		<>
			<Wallpaper>
				<BottomPanel />
				<WindowDrawer />
			</Wallpaper>
		</>
	)

	/*
			<BottomPanel />
		<div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<div style={{ flex: 1, position: "relative" }}>
				<img
					src={wallpaper}
					alt="example"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "contain", // Ensures the image fits within the container
						objectPosition: "top left" // Aligns the image to the top-left
					}}
				/>
			</div>
		</div>
	 */

	/*
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<Counter />
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
			<WindowManager />
			<Quotes />
			<span>
				<span>Learn </span>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					React
				</a>
				<span>, </span>
				<a
					className="App-link"
					href="https://redux.js.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Redux
				</a>
				<span>, </span>
				<a
					className="App-link"
					href="https://redux-toolkit.js.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Redux Toolkit
				</a>
				<span>, </span>
				<a
					className="App-link"
					href="https://react-redux.js.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					React Redux
				</a>
				,<span> and </span>
				<a
					className="App-link"
					href="https://reselect.js.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Reselect
				</a>
			</span>
		</header>
	</div>
	*/
}

export default App
