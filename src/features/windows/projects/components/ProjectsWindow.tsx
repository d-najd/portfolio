import { useAppSelector } from "@/app/hooks"
import { selectWindowProjectsList } from "../projectsSlice"
import styled from "@emotion/styled"
import { ProjectWindowItem } from "./ProjectWindowItem"
import { Alignment, Alignments } from "@/ui/alignment"
import React from "react"
import { WindowContentContainer } from "@/components/WindowContentContainer"

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

const Container = styled(WindowContentContainer)`
	${Alignment(Alignments.HorizontallyCentered)};
	display: flex;
	padding-top: 17px;
	padding-bottom: 17px;
	box-sizing: border-box;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: flex-start;
	gap: 17px;
`
