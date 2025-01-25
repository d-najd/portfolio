import { useEffect, useState } from "react"

const proxyUrl = "https://corsproxy.io/?url="

/**
 * Websites like GitHub prohibit the use of iframes for viewing their content,
 * this works around that by fetching the content through proxy (workaround for
 * another measure to prevent fetching content).
 * @remarks some content may not be displayed correctly or may not work at all
 * @example <iframe srcDoc={useExternalHtmlContent}></iframe>
 */
const useExternalHtml = (url: URL) => {
	const [content, setContent] = useState("")
	const href = url.href
	const origin = url.origin

	useEffect(() => {
		const fetchUrl = `${proxyUrl}${href}`

		fetch(fetchUrl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				return response.text()
			})
			.then(html => {
				/*
					/((href|src)=["'])(\/[^"']*)/g,
					(_, prefix, attr, path) => `${prefix}${origin}${path}`,
				 */

				// This serves 2 purposes, raw html is being fetched meaning
				// hrefs will use the current origin which is not what we want
				// second if we were to re-fetch content for each page its likely
				// that as pages go on there will be one that is eventually broken
				// so instead if the user presses a link new window is opened
				// with the link that the user pressed
				const fixedHtml = html.replace(
					/((href)=["'])(\/[^"']*)/g,
					(_, prefix, attr, path) =>
						`onclick="const newTab = window.open('${origin}${path}'); if (newTab) { newTab.focus(); } return false;"`,
				)

				setContent(fixedHtml)
			})
			.catch(err => {
				console.error("Error fetching content:", err)
			})
	}, [href, origin])

	return content
}

export default useExternalHtml
