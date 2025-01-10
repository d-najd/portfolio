import { useAppSelector } from "../../../app/hooks"
import { selectWindowProjectsList } from "./projectsSlice"
import styled from "@emotion/styled"
import type { MyWindow } from "../../window/windowSlice"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { transparentize } from "polished"

interface ProjectsWindowContentProps {
	myWindow: MyWindow
	/** px */
	contentWidth: number
	/** px */
	contentHeight: number
}

export const ProjectsWindowContent = ({
	myWindow,
	contentWidth,
	contentHeight
}: ProjectsWindowContentProps) => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	const Root = styled.div`
		${Alignment(Alignments.HorizontallyCentered)}
		position: absolute;
		width: ${contentWidth}px;
		height: ${contentHeight}px;
		padding-top: 17px;
		overflow: hidden;
		display: flex;
		background-color: yellow;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 17px;
	`

	const Container = styled.div`
		display: flex;
		background-color: red;
		min-height: 275px;
		max-height: 275px;
		max-width: 450px;
		min-width: 450px;

		&:hover > .movable {
			transform: translateY(-250px);
			transition: all 0.4s;
		}
	`

	const ContentContainer = styled.div`
		position: absolute;
		width: 100%;
		height: 100%;
	`

	const Video = styled.a`
		background-color: red;
		height: 100%;
		width: 100%;
	`

	const HoverAppear = styled.div`
		position: absolute;
		transform: translateY(50px);
		width: 450px;
		height: 275px;
		background-color: ${transparentize(0.5, "black")};
	`

	const Title = styled.span``
	const Description = styled.span``

	return (
		<Root>
			{listProjects.map((o, index) => {
				return (
					<Container>
						<ContentContainer>
							<Video></Video>
							<Title>{o.title}</Title>
						</ContentContainer>
						<HoverAppear className="movable" />
					</Container>
				)
			})}
		</Root>
	)
}
