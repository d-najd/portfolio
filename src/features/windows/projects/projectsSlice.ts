import type { defaultSliceStates } from "@/utils/sliceUtil"
import { createAppSlice } from "@/app/createAppSlice"
import { ProjectType } from "./projectsActions"

export interface Project {
	id: number
	title: string
	description: string
	repo: string
	videoLink: string
	technologiesUsed: string
}

export interface ProjectsState {
	/**
	 * This is planned to be immutable, but in case it doesn't end up being like
	 * that in the future this can easily be updated
	 */
	readonly projects: Project[]
	status: defaultSliceStates
}

export let projectIdCounter = -1

function getNextProjectId(): number {
	projectIdCounter++
	return projectIdCounter
}

const initialState: ProjectsState = {
	projects: [
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookstandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed:
				"React, Vue, Typescript, Styled Components, Redux, HLSL"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Portfolio,
			description: "Description",
			repo: "https://www.github.com",
			videoLink: ",",
			technologiesUsed: "React, Vue, Typescript, Styled Components, Redux"
		}
	],
	status: "idle"
}

export const projectsSlice = createAppSlice({
	name: "window-projects",
	initialState,
	reducers: () => ({}),
	selectors: {
		selectWindowProjectsList: state => state.projects
	}
})

export const { selectWindowProjectsList } = projectsSlice.selectors
