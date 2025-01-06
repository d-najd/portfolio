import styled from "@emotion/styled"

export const DesktopIcons = () => {
	const Container = styled.div`
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 16px;
	`

	const Item = styled.div`
		max-width: 100px; /* Prevents the item from growing too large */
		max-height: 100px;
		min-width: 100px; /* Prevents the item from growing too large */
		min-height: 100px;
		box-sizing: border-box; /* Ensures padding and border are included in width */
		background: #f0f0f0;
		border: 1px solid #ddd;
		padding: 16px;
		text-align: center;
	`

	return (
		<>
			<Container>
				<Item>ITEM1</Item>
				<Item>ITEM2</Item>
				<Item>ITEM3</Item>
				<Item>ITEM4</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
				<Item>ITEM5</Item>
			</Container>
		</>
	)
}

const Icon = (name: string, imageUrl: string) => {}
