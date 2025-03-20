import type { defaultSliceStates } from "@/utils/sliceUtil"
import { createAppSlice } from "@/app/createAppSlice"
import { ProjectType } from "./projectsActions"
import githubIco from "@/resources/icons/GitHub_Invertocat_Light.svg"
import cytheroIco from "@/resources/icons/LogoCythero.png"
import bugtrackerVideo from "@/resources/videos/Bugtracker.webm"
import sandblastingVideo from "@/resources/videos/Sandblasting.webm"
import prijaviNasilstvoVideo from "@/resources/videos/Prijavi-Nasilstvo.webm"

export interface Project {
	id: number
	title: string
	description: string
	videoLink: string
	technologiesUsed: string
	projectLinks: ProjectLink[]
}

export interface ProjectLink {
	name: string
	link: string
	icon: string
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
			title: ProjectType.BugTracker,
			description:
				"Android app inspired by jira for project management, also features a spring backend and database for managing the data both of which are wrapped in docker containers. RBAC and OAuth are used for security",
			projectLinks: [
				{
					name: "Backend",
					link: "https://github.com/d-najd/Bugtracker-2.0-backend",
					icon: githubIco,
				},
				{
					name: "Frontend",
					link: "https://github.com/d-najd/Bugtracker-2.0-App",
					icon: githubIco,
				},
			],
			videoLink: bugtrackerVideo,
			technologiesUsed:
				"Android Studio, Spring Boot/Security, MySQL, Docker, OAuth, JWT",
		},
		{
			id: getNextProjectId(),
			title: ProjectType.Sandblasting,
			description:
				"Professional VR Sandblasting Simulator. The first project that I worked on when I joined Cythero VR. This was also my first time using unity, blender and many other tools. I worked on creating core systems, 3D models, grading systems and lessons.",
			projectLinks: [
				{
					name: "Website",
					link: "https://sprayverse.com/product/sandblasting-vr-app/",
					icon: cytheroIco,
				},
			],
			videoLink: sandblastingVideo,
			technologiesUsed: "Unity, Compute Shaders, Blender, Figma",
		},
		{
			id: getNextProjectId(),
			title: ProjectType.AntiViolence,
			description:
				"Android/IOS app created as a collage project in collaboration with humanitarian organization rotary. This app is made to reduce among peer and family violence, it works by students anonymously sending report to the school which can then be sent to the police. I created the android app and collaborated with others on the firebase backend and IOS app. This project is still under development so I can't provide any links.",
			projectLinks: [],
			videoLink: prijaviNasilstvoVideo,
			technologiesUsed: "Android Studio, Firebase, Jetpack Compose, MVVM",
		},
	],
	status: "idle",
}

export const projectsSlice = createAppSlice({
	name: "window-projects",
	initialState,
	reducers: () => ({}),
	selectors: {
		selectWindowProjectsList: state => state.projects,
	},
})

export const { selectWindowProjectsList } = projectsSlice.selectors
