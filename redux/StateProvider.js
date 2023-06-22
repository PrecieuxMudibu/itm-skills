const initialeState = {
	login_banque: { token: null },
	banque: { periodes: [], name: '', email: '' },
	rapports: [],
	allRapports: [],
	currentPeriode: '',
	fiche_periodes: [],
	fonctionnaires: [],
	currentFonctionnaire: { _id: null },
	territoires: [],
	currentTerritoireName: {
		banque: { name: '', _id: '' },
		periode: { name: '', _id: '' },
		type: { name: '', _id: '' },
		territoire: { name: '', _id: '' },
	},
	periodes: [],
	types: [],
	entites: [],
	provinces: [],
}

const StateProvider = (state = initialeState, { payload, type }) => {
	switch (type) {
		case LOGIN_BANQUE:
			return {
				...state,
				login_banque: payload,
			}
		case ADD_BANQUE:
			return {
				...state,
				banque: payload,
			}
		case ADD_RAPPORTS:
			return {
				...state,
				rapports: payload,
			}
		case ADD_CURRENT_PERIODE:
			return {
				...state,
				currentPeriode: payload,
			}
		case ADD_CURRENT_FONCTIONNAIRE:
			return {
				...state,
				currentFonctionnaire: payload,
			}
		case ADD_ALL_RAPPORTS:
			return {
				...state,
				allRapports: payload,
			}
		case ADD_FICHE_PERIODE:
			return {
				...state,
				fiche_periodes: payload,
			}
		case ADD_FONCTIONNAIRES:
			return {
				...state,
				fonctionnaires: payload,
			}
		case ADD_ALL_TERRITOIRES:
			return {
				...state,
				territoires: payload,
			}
		case ADD_CURRENT_TERRITOIRE:
			return {
				...state,
				currentTerritoireName: payload,
			}
		case ADD_PERIODES:
			return {
				...state,
				periodes: payload,
			}
		case ADD_TYPES:
			return {
				...state,
				types: payload,
			}
		case ADD_ENTITES:
			return {
				...state,
				entites: payload,
			}
		case ADD_PROVINCES:
			return {
				...state,
				provinces: payload,
			}

		default:
			return state
	}
}

export const ADD_BANQUE = 'ADD_BANQUE'
export const LOGIN_BANQUE = 'LOGIN_BANQUE'
export const ADD_RAPPORTS = 'ADD_RAPPORTS'
export const ADD_ALL_RAPPORTS = 'ADD_ALL_RAPPORTS'
export const ADD_CURRENT_PERIODE = 'ADD_CURRENT_PERIODE'
export const ADD_FICHE_PERIODE = 'ADD_FICHE_PERIODE'
export const ADD_FONCTIONNAIRES = 'ADD_FONCTIONNAIRES'
export const ADD_CURRENT_FONCTIONNAIRE = 'ADD_CURRENT_FONCTIONNAIRE'
export const ADD_ALL_TERRITOIRES = 'ADD_ALL_TERRITOIRES'
export const ADD_CURRENT_TERRITOIRE = 'ADD_CURRENT_TERRITOIRE'
export const ADD_PERIODES = 'ADD_PERIODES'
export const ADD_TYPES = 'ADD_TYPES'
export const ADD_ENTITES = 'ADD_ENTITES'
export const ADD_PROVINCES = 'ADD_PROVINCES'

export default StateProvider
