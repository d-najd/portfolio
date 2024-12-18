import styled from "@emotion/styled"
import { css, } from "@emotion/react"
import { CurTheme } from "../../theme/theme"

export const BottomPanel = () => {
	const Container = styled.div`
		position: relative;
		height: 100%;
	`
	
	const BottomBar = styled.div`
        background-color: ${CurTheme().colors.primaryBackground};
		position: absolute;
		bottom: 0.00000001%;
		height: 20px;
		padding-top: 15px;
		width: 100%;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 0.3vh;
            background-color: ${CurTheme().colors.primaryText};
		}
	`

	const VerticalCenter = styled.div`
		margin: 0;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	`

	const WindowsImage = styled.image`
		width: 2vh;
		height: 2vh;
	`

	const windowsImageStyle = css`
		width: 2vh;
		height: 2vh;
	`

	return (
		<>
			<Container>
				<BottomBar>
					<VerticalCenter>
						<button>
							<WindowsImage>
								<img
									css={windowsImageStyle}
									src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Logo_%281992-2001%29.svg"
									alt={"Windows 95 logo"}
								/>
							</WindowsImage>
						</button>
					</VerticalCenter>
				</BottomBar>
			</Container>
		</>
	)
}
