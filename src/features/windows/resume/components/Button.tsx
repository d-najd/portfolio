import styled from "@emotion/styled"
import { WindowsButton } from "@/components/WindowsButton"
import { Alignment, Alignments } from "@/ui/alignment"

interface Props {
	src: string
	onClick: () => void
	children: string
}

export const Button = ({ src, onClick, children }: Props) => {
	return (
		<Container onClick={() => onClick()}>
			<Image src={src} />
			<Text>{children}</Text>
		</Container>
	)
}

const Container = styled(WindowsButton)`
	${Alignment(Alignments.CenteredStart)};
	padding: 4px 4px;
	// overflow: hidden;
`

const Image = styled.img`
	height: 24px;
	image-rendering: pixelated;
`

const Text = styled.span`
	margin-left: 5px;
	overflow: hidden;
	text-overflow: ellipsis;
`
