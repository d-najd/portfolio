/**
 * Sends mail using "mailto:"
 * @param recipient who this mail should be sent to, ex somebody@fakemail.com
 * @param subject subject of the mail
 * @param body body of the mail
 */
export const mailto = (
	recipient: string,
	subject: string = "",
	body: string = "",
) => {
	let mailtoUrl = `mailto:${recipient}`

	const queryParams: string[] = []
	if (subject) {
		queryParams.push(`subject=${encodeURIComponent(subject)}`)
	}

	if (body) {
		queryParams.push(`body=${encodeURIComponent(body)}`)
	}

	if (queryParams.length) {
		mailtoUrl += `?${queryParams.join("&")}`
	}

	window.location.href = mailtoUrl
}
