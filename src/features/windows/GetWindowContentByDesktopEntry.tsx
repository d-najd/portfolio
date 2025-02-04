import { ProjectsWindow } from "./projects/ProjectsWindow"
import type { ReactNode } from "react"
import React from "react"
import { SendMailWindow } from "@/features/windows/send-mail/SendMailWindow"
import { DesktopEntryType } from "@/features/shared/desktopEntry"

interface Props {
	desktopEntry: DesktopEntryType
}

/**
 * @see WindowContentContainer.tsx each content container must extend this style
 */
export const GetWindowContentByDesktopEntry = React.memo(
	({ desktopEntry }: Props): ReactNode => {
		switch (desktopEntry) {
			case DesktopEntryType.SendMail:
				return <SendMailWindow />
			case DesktopEntryType.Projects:
				return <ProjectsWindow />
			default:
				return <>{desktopEntry}</>
		}
	},
)
