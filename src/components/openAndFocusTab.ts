export const openAndFocusTab = (url: string) => {
	const newTab = window.open(url)
	if (newTab) {
		newTab.focus()
	}
}
