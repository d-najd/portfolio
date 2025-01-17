import styled from "@emotion/styled"
import { Alignment, Alignments, AlignmentSelf } from "@/ui/alignment"
import theme from "@/theme/theme"
import { Row } from "@/components/Row"
import { Column } from "@/components/Column"
import type { Project } from "@/features/windows/projects/projectsSlice"
import githubIco from "@/resources/icons/GitHub_Invertocat_Light.svg"
import { MathExtensions } from "@/utils/mathExtensions"

export const containerWidth = 450
export const hoverContainerInitialHeight = 30
export const containerHeight = 272

const containerPaddingHorizontal = 12
const bottomBarHeight = 69

export const getHeight = (hoverProgress: number) => {
	// noinspection JSSuspiciousNameCombination
	return MathExtensions.lerp(
		hoverContainerInitialHeight,
		containerHeight,
		hoverProgress
	)
}

const Title = styled.span`
	position: absolute;
	${Alignment(Alignments.Centered)}
	color: ${theme.colors.primaryTextInverted};
	height: ${hoverContainerInitialHeight}px;
	width: 100%;
`

const HoverContentContainer = styled.div<{ height: number }>`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: ${o => o.height}px;
`

const Description = styled.span<{ height: number }>`
	position: absolute;
	box-sizing: border-box;
	padding-top: 16px;
	overflow: hidden;
	text-overflow: clip;
	font-size: 0.9em;
	max-height: ${o => o.height}px;
	width: ${containerWidth}px;
	color: ${theme.colors.primaryTextInverted};
	margin-bottom: 100px;
	padding-left: ${containerPaddingHorizontal}px;
	padding-right: ${containerPaddingHorizontal}px;
`

const HoverBottomBarContainer = styled.div`
	position: absolute;
	${Alignment(Alignments.BottomStart)};
	width: 100%;
	height: 100%;
`

const HoverBottomBar = styled(Row)<{ height: number }>`
	width: 100%;
	height: ${o => o.height}px;
	padding-left: ${containerPaddingHorizontal}px;
	padding-right: ${containerPaddingHorizontal}px;
	box-sizing: border-box;
`

const TechUsed = styled(Column)`
	${Alignment(Alignments.TopStart)};
	height: 100%;
	width: 100%;
	overflow: hidden;
	color: ${theme.colors.primaryTextInverted};
`

const TechUsedTitle = styled.b`
	margin-top: 8px;
	${AlignmentSelf(Alignments.TopStart)}
	width: 100%;
	overflow: hidden;
	font-weight: bold;
	user-select: none;
`

const TechUsedText = styled.span`
	${AlignmentSelf(Alignments.HorizontallyCentered)};
	font-size: 0.825em;
	padding-top: 10px;
	overflow: hidden;
`

const HoverBottomIconHolder = styled(Column)`
	height: 100%;
	width: 42px;
	margin-right: 4px;
	gap: 6px;
	${AlignmentSelf(Alignments.End)};
	${Alignment(Alignments.Centered)}
`

const HoverBottomIcon = styled.img`
	width: 34px;
	height: 34px;
	user-select: none;
`

const HoverBottomIconText = styled.span`
	color: ${theme.colors.primaryTextInverted};
	font-size: 0.8em;
	font-weight: 500;
	user-select: none;
`

interface HoverContentProps {
	project: Project
	hoverProgress: number
}

export const HoverContent = ({ project, hoverProgress }: HoverContentProps) => {
	if (hoverProgress === 0) {
		return <Title>{project.title}</Title>
	}

	const height = getHeight(hoverProgress)
	const descriptionHeight = Math.max(0, height - bottomBarHeight)

	const bottomBarHeightCalculated = Math.max(
		bottomBarHeight,
		Math.max(bottomBarHeight, 0)
	)

	return (
		<HoverContentContainer height={height}>
			<Description height={descriptionHeight}>
				{project.description}
			</Description>
			<HoverBottomBarContainer>
				<HoverBottomBar height={bottomBarHeightCalculated}>
					<TechUsed>
						<TechUsedTitle>Technologies used:</TechUsedTitle>
						<TechUsedText>{project.technologiesUsed}</TechUsedText>
					</TechUsed>
					<HoverBottomIconHolder>
						<HoverBottomIcon src={githubIco} />
						<HoverBottomIconText>Repo</HoverBottomIconText>
					</HoverBottomIconHolder>
				</HoverBottomBar>
			</HoverBottomBarContainer>
		</HoverContentContainer>
	)
}
