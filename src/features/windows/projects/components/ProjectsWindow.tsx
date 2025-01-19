import { useAppSelector } from "@/app/hooks"
import { selectWindowProjectsList } from "../projectsSlice"
import styled from "@emotion/styled"
import { ProjectWindowItem } from "./ProjectWindowItem"
import { Alignment, Alignments } from "@/ui/alignment"
import React from "react"
import { WindowTopBarHeight } from "@/features/window-drawer/components/WindowDrawerTopBar.styles"

export const ProjectsWindow = React.memo(() => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	return (
		<Container>
			{listProjects.map((o, index) => {
				return <ProjectWindowItem project={o} key={index} />
			})}
		</Container>
	)
})

const Container = styled.div`
	${Alignment(Alignments.HorizontallyCentered)};
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	padding-top: 17px;
	padding-bottom: ${WindowTopBarHeight + 17}px;
	box-sizing: border-box;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: flex-start;
	overflow: scroll;
	gap: 17px;
`
