import type { DesktopIcon } from "../DesktopIconsSlice"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { Column } from "../../../components/Column"

interface DesktopIconTSXType {
	data: DesktopIcon
	onClick: () => void
}

export const DesktopIconTSX = (data: DesktopIconTSXType) => {
	const Container = styled(Column)`
		${Alignment(Alignments.VerticallyCentered)};
		width: 74px;
		height: 74px;
	`

	const Icon = styled.img`
		min-width: 42px;
		min-height: 42px;
		max-width: 42px;
		max-height: 42px;
		background-color: red;
	`

	const Text = styled.span`
		${Alignment(Alignments.HorizontallyCentered)};
		color: white;
		margin-top: 6px;
		font-size: small;
	`

	return (
		<Container>
			<Icon />
			<Text>{data.data.name}</Text>
		</Container>
	)
}
