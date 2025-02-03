import { useAppSelector } from "@/app/hooks"
import { selectWindowProjectsList } from "./projectsSlice"
import styled from "@emotion/styled"
import { ProjectWindowItem } from "./components/ProjectWindowItem"
import { Alignment, Alignments } from "@/ui/alignment"
import React from "react"

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
	position: relative;
	//display: flex;
	padding-top: 17px;
	height: calc(100% - 17px);
	// padding-bottom: 17px;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: flex-start;
	gap: 17px;
	background-color: red;
	overflow: hidden;
	// position: absolute;
	width: 100%;
	// overflow: scroll;
	scrollbar-width: none;
`
/*
padding-bottom: ${o =>
	o.paddingBottom === undefined
		? WindowTopBarHeight
		: o.paddingBottom + WindowTopBarHeight}px;
				*/
