export const openAndFocusTab = (url: string) => {
	const newTab = window.open('https://www.linkedin.com/in/dimitar-najdovski/', '_blank');
	if (newTab) {
		newTab.focus(); // This ensures the new tab is focused (selected)
	}
	window.location.href = ""
}