import { useEffect, useRef, useState } from "react"

const useExternalHtml = (url: URL) => {
	const cache = useRef<Record<string, any>>({})
	const [data, setData] = useState<string>("")

	const href = url.href
	const origin = url.origin
	const proxyUrl = "https://corsproxy.io/?url="

	useEffect(() => {
		const fetchUrl = `${proxyUrl}${href}`

		const fetchData = async () => {
			if (cache.current[href]) {
				console.log("RETURNING")
				const data = cache.current[href]
				setData(data)
			} else {
				console.log("REFETCHING ")
				console.log(cache.current)
				const response = await fetch(fetchUrl)
				const data = parseData(await response.text(), origin)
				cache.current[href] = data
				setData(data)
			}
		}
		fetchData()
	}, [href, origin])

	return data
}

// This serves 2 purposes, raw html is being fetched meaning
// hrefs will use the current origin which is not what we want
// second if we were to re-fetch content for each page its likely
// that as pages go on there will be one that is eventually broken
// so instead if the user presses a link new window is opened
// with the link that the user pressed
const parseData = (data: string, origin: string) => {
	return data.replace(
		/((href)=["'])(\/[^"']*)/g,
		(_, prefix, attr, path) =>
			`onclick="const newTab = window.open('${origin}${path}'); if (newTab) { newTab.focus(); } return false;"`,
	)
}

export default useExternalHtml
