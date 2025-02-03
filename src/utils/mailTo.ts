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
	window.location.href = `mailto:${recipient}?${subject}&${body}`
}
