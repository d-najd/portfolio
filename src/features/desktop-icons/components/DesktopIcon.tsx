import type { DesktopIcon } from "../DesktopIconsSlice"
import styled from "@emotion/styled"
import { Alignment, Alignments } from "../../../components/common/CommonProps"
import { Column } from "../../../components/Column"

interface DesktopIconTSXType {
	data: DesktopIcon
}

export const DesktopIconTSX = (data: DesktopIconTSXType) => {
	const Container = styled(Column)`
		${Alignment(Alignments.VerticallyCentered)};
		width: 74px;
		height: 74px;
		text-align: center;
		user-select: all;
		cursor: pointer;
	`

	const Icon = styled.img`
		min-width: 42px;
		min-height: 42px;
		max-width: 42px;
		max-height: 42px;
		image-rendering: pixelated;
		user-select: none;
	`

	const Text = styled.span`
		${Alignment(Alignments.HorizontallyCentered)};
		color: white;
		margin-top: 6px;
		font-size: small;
		user-select: none;
	`
	
	return (
		<>
			<Container
				{...(data.data.action! instanceof URL
					? { href: data.data.action.href }
					: { onClick: data.data.action })}
			>
				<Icon src={data.data.iconUrl} />
				<Text>{data.data.name}</Text>
			</Container>
		</>
	)
}
