import { useAppSelector } from "../../../app/hooks"
import { selectWindowProjectsList } from "./projectsSlice"
import styled from "@emotion/styled"
import type { MyWindow } from "../../window/windowSlice"
import { Alignment, Alignments } from "../../../components/common/CommonProps"

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
		${Alignment(Alignments.HorizontallyCentered)};
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

	const ContentContainer = styled.div`
		display: flex;
		background-color: red;
		width: 450px;
		height: 275px;
	`

	const Video = styled.a`
		background-color: red;
	`
	const Title = styled.span``
	const Description = styled.span``

	return (
		<Root>
			{listProjects.map((o, index) => {
				return (
					<ContentContainer>
						<Video></Video>
						<Title>{o.title}</Title>
					</ContentContainer>
				)
			})}
		</Root>
	)
}
