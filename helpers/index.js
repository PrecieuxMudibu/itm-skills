import excelJS from 'exceljs'
import MenuItem from '@mui/material/MenuItem'
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

	// set_candidates([...jsonData]);
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

export const transformObjectInArray = (obj) => {
	const array = []
	for (let key in obj) {
		array.push(obj[key])
	}
	return array
}
export const replaceAllSpecialChar = (str) => {
	return +`${str}`.replace(/[^\d,]/g, '').replace(/,/g, '.')
}
export const someItemDifferentToNull = (array) => {
	return array.some((item) => item !== null)
}

export const allItemDifferentOfNull = (items) => {
	return items.every((item) => item !== null)
}
export const allItemEqualsToNull = (items) => {
	return items.every((item) => item === null)
}
export function Traitement(
	{
		data,
		fond_alouer,
		libelle,
		periode,
		banque,
		territoire,
		province,
		type,
		entite,
	},
	addTodo
) {
	try {
		//filtrer les donnees valides
		const dataFiltered = data.filter(
			(item) =>
				someItemDifferentToNull(transformObjectInArray(item)) &&
				item['IDENTIFIANT'] &&
				item['SALAIREBRUTE'] &&
				item['NETAPAYER'] &&
				item['FTC'] &&
				item['PRENOM'] &&
				item['NOMPOSTNOM'] &&
				item['ETABLISSEMENT']
		)
		const TOSEND = dataFiltered.map((item) => {
			return {
				CODEAFD: 'null',
				SALAIREBRUTE: item['SALAIREBRUTE']
					? callBack(() => replaceAllSpecialChar(item['SALAIREBRUTE']))
					: callBack(() => {
							throw 'le champ SALAIRE BRUTE est requis mais manquante !!!'
					  }),
				NETAPAYER: item['NETAPAYER']
					? callBack(() => replaceAllSpecialChar(item['NETAPAYER']))
					: callBack(() => {
							throw 'le champ NETAPAYER est requis mais manquante !!!'
					  }),
				PERIODE: periode,
				INDICE: 'null',
				FTC: item['FTC']
					? callBack
					: callBack(() => replaceAllSpecialChar(item['FTC']))(() => {
							throw 'le champ FTC est requis mais manquante !!!'
					  }),
				PRENOM: item['PRENOM'] && item['PRENOM'],
				NAME: item['NOMPOSTNOM'] && item['NOMPOSTNOM'],
				MATRICULE: item['MATRICULE'] ? item['MATRICULE'] : Math.random(),
				IDENTIFIANT: item['IDENTIFIANT'],
				PROVINCE: province,
				ETABLISSEMENT: item['ETABLISSEMENT'],
				BANQUE: banque,
				NCOMPTE: item['NCOMPTE'] ? item['NCOMPTE'] : '',
				TERRITOIRE: territoire,
				SEXE: item['SEXE'] ? item['SEXE'] : 'null',
				GRADE: item['GRADE'] ? item['GRADE'] : 'null',
				TYPE: type,
				ENTITE: entite,
			}
		})
		if (TOSEND.length === 0)
			throw 'fichier invalide car aucun des champs requis existe !!!'
		return addTodo({
			variables: {
				data: TOSEND,
				fond_alouer,
				periode,
				banque,
				territoire,
				province,
				type,
				libelle,
				entite,
			},
		})
	} catch (erreur) {
		return new Promise((resolve, reject) => reject(erreur))
	}
}
export const MONTH_OF_YEAR = [
	'JANVIER',
	'FEVRIER',
	'MARS',
	'AVRIL',
	'MAI',
	'JUIN',
	'JUILLET',
	'AOUT',
	'SEPTEMBRE',
	'OCTOBRE',
	'NOVEMBRE',
	'DECEMBRE',
]

export const ALL_PROVINCES = [
	<MenuItem value={'Bas-Uele'} key={'Bas-Uele'}>
		Bas-Uele
	</MenuItem>,
	<MenuItem key={'Équateur'} value={'Équateur'}>
		Équateur
	</MenuItem>,
	<MenuItem key={'Haut-Katanga'} value={'Haut-Katanga'}>
		Haut-Katanga
	</MenuItem>,
	<MenuItem value={'Haut-Lomami'} key={'Haut-Lomami'}>
		Haut-Lomami
	</MenuItem>,
	<MenuItem key={'Haut-Uele'} value={'Haut-Uele'}>
		Haut-Uele
	</MenuItem>,
	<MenuItem value={'Ituri'} key={'Ituri'}>
		{' '}
		Ituri
	</MenuItem>,
	<MenuItem value={'Kasaï'} key={'Kasaï'}>
		Kasaï
	</MenuItem>,
	<MenuItem key={'Kasaï-central'} value={'Kasaï-central'}>
		Kasaï central
	</MenuItem>,
	<MenuItem value={'Kasaï oriental'} key={'Kasaï oriental'}>
		Kasaï oriental
	</MenuItem>,
	<MenuItem value={'Kinshasa'} key={'Kinshasa'}>
		Kinshasa
	</MenuItem>,
	<MenuItem value={'Kongo-Central'} key={'Kongo-Central'}>
		Kongo-Central
	</MenuItem>,
	<MenuItem value={'Kwango'} key={'Kwango'}>
		Kwango
	</MenuItem>,
	<MenuItem key={'Kwilu'} value={'Kwilu'}>
		Kwilu
	</MenuItem>,
	<MenuItem key={'Lomami'} value={'Lomami'}>
		Lomami
	</MenuItem>,
	<MenuItem value={'Lualaba'} key={'Lualaba'}>
		Lualaba
	</MenuItem>,
	<MenuItem value={'Mai-Ndombe'} key={'Mai-Ndombe'}>
		Mai-Ndombe
	</MenuItem>,
	<MenuItem key={'Maniema'} value={'Maniema'}>
		Maniema
	</MenuItem>,
	<MenuItem value={'Mongala'} key={'Mongala'}>
		Mongala
	</MenuItem>,
	<MenuItem key={'Nord-Kivu'} value={'Nord-Kivu'}>
		Nord-Kivu
	</MenuItem>,
	<MenuItem key={'Nord-Ubangi'} value={'Nord-Ubangi'}>
		Nord-Ubangi
	</MenuItem>,
	<MenuItem value={'Sankuru'} key={'Sankuru'}>
		Sankuru
	</MenuItem>,
	<MenuItem value={'Sud-Kivu'} key={'Sud-Kivu'}>
		Sud-Kivu
	</MenuItem>,
	<MenuItem value={'Sud-Ubangi'} key={'Sud-Ubangi'}>
		Sud-Ubangi
	</MenuItem>,
	<MenuItem value={'Tanganyika'} key={'Tanganyika'}>
		Tanganyika
	</MenuItem>,
	<MenuItem value={'Tshopo'} key={'Tshopo'}>
		Tshopo
	</MenuItem>,
	<MenuItem value={'Tshuapa'} key={'Tshuapa'}>
		Tshuapa
	</MenuItem>,
]

export const TypeOfRemumeration = [
	<MenuItem value={'Salaire'} key={'Salaire'}>
		Salaire
	</MenuItem>,
	<MenuItem value={'Prime'} key={'Prime'}>
		Prime
	</MenuItem>,
]
export const TypeOfService = [
	<MenuItem value={'SECOPE'} key={'SECOPE'}>
		SECOPE
	</MenuItem>,
	<MenuItem value={'FARDC'} key={'FARDC'}>
		FARDC
	</MenuItem>,
]
