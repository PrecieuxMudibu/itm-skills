import * as XLSX from 'xlsx'

export async function handle_file(e) {
	console.log('LOADING')
	const file = e.target.files[0]
	const data = await file?.arrayBuffer()
	const workbook = XLSX.read(data)
	console.log('workbook', workbook)

	const worksheet = workbook.Sheets[workbook.SheetNames[0]]
	console.log('worksheet', worksheet)

	const jsonData = XLSX.utils.sheet_to_json(worksheet)
	return jsonData
}

export const removeDuplicatedData = (data) => {
	return [...new Set(data)]
}

export function download(filename, text) {
	var element = document.createElement('a')
	element.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
	)
	element.setAttribute('download', filename)

	element.style.display = 'none'
	document.body.appendChild(element)

	element.click()

	document.body.removeChild(element)
}
export const itemValidation = (item) => {
	if (item.matricule) {
		return item.matricule.toString().length === 5
	}

	if (item.identifiant) {
		return item.identifiant.toString().length === 5
	}
	return false
}
