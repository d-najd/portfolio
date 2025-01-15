import type { ReactNode } from "react"
import type { SerializedStyles } from "@emotion/react"
import { css } from "@emotion/react"

/**
 * Default props, to avoid boiler-plate code
 */
export type DefaultProps = {
	className?: string
	children: ReactNode
}

export enum Alignments {
	Top = "top",
	Bottom = "bottom",
	Start = "start",
	End = "end",
	VerticallyCentered = "vertically-centered",
	HorizontallyCentered = "horizontally-centered",
	Centered = "centered",
	TopStart = "top-start",
	TopEnd = "top-end",
	CenteredStart = "centered-start",
	CenteredEnd = "centered-end",
	BottomStart = "bottom-start",
	BottomEnd = "bottom-end"
}

const justifyContentMap: Record<Alignments, string> = {
	[Alignments.Top]: "initial",
	[Alignments.Bottom]: "initial",
	[Alignments.Start]: "flex-start",
	[Alignments.End]: "flex-end",
	[Alignments.VerticallyCentered]: "initial",
	[Alignments.HorizontallyCentered]: "center",
	[Alignments.Centered]: "center",
	[Alignments.TopStart]: "flex-start",
	[Alignments.TopEnd]: "flex-end",
	[Alignments.CenteredStart]: "flex-start",
	[Alignments.CenteredEnd]: "flex-end",
	[Alignments.BottomStart]: "flex-start",
	[Alignments.BottomEnd]: "flex-end"
}

const alignItemsMap: Record<Alignments, string> = {
	[Alignments.Top]: "flex-start",
	[Alignments.Bottom]: "flex-end",
	[Alignments.Start]: "initial",
	[Alignments.End]: "initial",
	[Alignments.VerticallyCentered]: "center",
	[Alignments.HorizontallyCentered]: "initial",
	[Alignments.Centered]: "center",
	[Alignments.TopStart]: "flex-start",
	[Alignments.TopEnd]: "flex-start",
	[Alignments.CenteredStart]: "center",
	[Alignments.CenteredEnd]: "center",
	[Alignments.BottomStart]: "flex-end",
	[Alignments.BottomEnd]: "flex-end"
}

export const Alignment = (alignment: Alignments): SerializedStyles => {
	return css`
		display: flex;
		justify-content: ${justifyContentMap[alignment]};
		align-items: ${alignItemsMap[alignment]};
		text-align: ${alignItemsMap[alignment]};
	`
}

export const AlignmentSelf = (alignment: Alignments): SerializedStyles => {
	return css`
		display: flex;
		justify-self: ${justifyContentMap[alignment]};
		align-self: ${alignItemsMap[alignment]};
		text-align: ${alignItemsMap[alignment]};
	`
}
