export const downloadUrl = (url: string) => {
	const link = document.createElement("a")
	link.href = url
	link.download = url
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
