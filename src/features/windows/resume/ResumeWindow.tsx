import styled from "@emotion/styled"
import { Row } from "@/components/Row"
import { Alignment, Alignments } from "@/ui/alignment"
import resume from "@/resources/documents/resume.pdf"
import downloadIcon from "@/resources/windows_95_icons/Sheets/Move document.ico"
import openInNewTabIcon from "@/resources/windows_95_icons/Sheets/Web-document.ico"
import { Button } from "@/features/windows/resume/components/Button"
import { openAndFocusTab } from "@/utils/openAndFocusTab"
import { downloadUrl } from "@/utils/downloadUrl"

export const ResumeWindow = () => {
	return (
		<Container>
			<TopBar>
				<Button src={downloadIcon} onClick={() => downloadUrl(resume)}>
					Download
				</Button>
				<Button
					src={openInNewTabIcon}
					onClick={() => openAndFocusTab(resume)}
				>
					Open In New Tab
				</Button>
			</TopBar>
			<PDFReader src={resume} />
		</Container>
	)
}

/*
const downloadUrl(url: string) => {
	window.open(url, '_self');
}
 */

const Container = styled(Row)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

const TopBar = styled.div`
	${Alignment(Alignments.CenteredStart)};
	margin-left: 8px;
	margin-top: 2px;
	margin-bottom: 2px;
	gap: 8px;
	flex: 0 1 40px;
	// height: 28px;
`
const PDFReader = styled.iframe`
	flex: 1 1 auto;
`
