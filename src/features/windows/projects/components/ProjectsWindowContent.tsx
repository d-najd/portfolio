import { useAppSelector } from "@/app/hooks"
import { selectWindowProjectsList } from "../projectsSlice"
import styled from "@emotion/styled"
import { ProjectWindowContentItem } from "./ProjectWindowContentItem"
import type { Size } from "@/ui/transforms"
import { Alignment, Alignments } from "@/ui/alignment"

const Root = styled.div<Size>`
	${Alignment(Alignments.HorizontallyCentered)};
	box-sizing: border-box;
	position: absolute;
	width: ${o => o.width}px;
	height: ${o => o.height}px;
	padding-top: 17px;
	overflow: hidden;
	display: flex;
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
