import { useAppSelector } from "@/app/hooks"
import { selectWindowProjectsList } from "../projectsSlice"
import styled from "@emotion/styled"
import { ProjectWindowItem } from "./ProjectWindowItem"
import type { Size } from "@/ui/transforms"
import { Alignment, Alignments } from "@/ui/alignment"

interface Props extends Size {
	/** px */
	width: number
	/** px */
	height: number
}

export const ProjectsWindow = ({ width, height }: Props) => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	return (
		<Container width={width} height={height}>
			{listProjects.map((o, index) => {
				return <ProjectWindowItem project={o} key={index} />
			})}
		</Container>
	)
}

const Container = styled.div<Size>`
	${Alignment(Alignments.HorizontallyCentered)};
	position: absolute;
	display: flex;
	width: ${o => o.width}px;
	height: ${o => o.height}px;
	padding-top: 17px;
	box-sizing: border-box;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: flex-start;
	overflow: hidden;
	gap: 17px;
`
