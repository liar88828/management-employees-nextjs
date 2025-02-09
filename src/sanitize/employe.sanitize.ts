export const employeeSanitize = (formData: FormData, imagePath: string) => {
	const form = formData.get('data')?.toString() ?? ''
	const json = JSON.parse(form);
	json.img = imagePath
	return json
}