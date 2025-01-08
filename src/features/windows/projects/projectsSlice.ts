import { defaultSliceStates } from "../../../utils/sliceUtil"

export interface Project {
	title: string
	description: string
	repo: URL
	videoLink: string
	technologiesUsed: string
}

export interface ProjectsSlice {
	projects: Project[]
	status: defaultSliceStates
}
