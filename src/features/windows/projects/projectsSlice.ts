import type { defaultSliceStates } from "../../../utils/sliceUtil"
import { createAppSlice } from "../../../app/createAppSlice"
import { ProjectType } from "./projectsActions"

export interface Project {
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

const initialState: ProjectsState = {
	projects: [
		{
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
