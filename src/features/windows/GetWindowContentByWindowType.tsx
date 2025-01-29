import { ProjectsWindow } from "./projects/ProjectsWindow"
import type { ReactNode } from "react"
import React from "react"
import { WindowType } from "@/features/shared/windowType"
import { SendMailWindow } from "@/features/windows/send-mail/SendMailWindow"

interface Props {
	windowType: WindowType
}

/**
 * @see WindowContentContainer.tsx each content container must extend this style
 */
export const GetWindowContentByWindowType = React.memo(
	({ windowType }: Props): ReactNode => {
		switch (windowType) {
			case WindowType.SendMail:
				return <SendMailWindow />
			case WindowType.Projects:
				return <ProjectsWindow />
			default:
				return <>{windowType}</>
		}
	},
)
