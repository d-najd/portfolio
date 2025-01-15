import { useAppSelector } from "@/app/hooks"
import { selectWindowProjectsList } from "../projectsSlice"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "@/components/common/CommonProps"
import { ProjectWindowContentItem } from "./ProjectWindowContentItem"
import type { Size } from "@/components/transforms"

const Root = styled.div<Size>`
	${Alignment(Alignments.HorizontallyCentered)};
	box-sizing: border-box;
	position: absolute;
	width: ${o => o.width}px;
	height: ${o => o.height}px;
	padding-top: 17px;
	overflow: hidden;
	display: flex;
	background-color: yellow;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: flex-start;
	gap: 17px;
`

interface ProjectsWindowContentProps extends Size {
	/** px */
	width: number
	/** px */
	height: number
}

export const ProjectsWindowContent = ({
	width,
	height
}: ProjectsWindowContentProps) => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	return (
		<Root width={width} height={height}>
			{listProjects.map((o, index) => {
				return <ProjectWindowContentItem project={o} key={index} />
			})}
		</Root>
	)
}
