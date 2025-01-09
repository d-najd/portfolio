import { useAppSelector } from "../../../app/hooks"
import { selectWindowProjectsList } from "./projectsSlice"
import styled from "@emotion/styled"

export const ProjectsWindowContent = () => {
	const listProjects = useAppSelector(selectWindowProjectsList)

	const Container = styled.div`
		position: absolute;
		width: 333px;
		height: 200px;
	`

	const Video = styled.a`
		background-color: red;
	`
	const Title = styled.span``
	const Description = styled.span``

	return (
		<>
			{listProjects.map(o => {
				return (
					<Container>
						<Video />
						<Title>{o.title}</Title>
					</Container>
				)
			})}
		</>
	)
}
