import {
	ADD_BANQUE,
	LOGIN_BANQUE,
	ADD_RAPPORTS,
	ADD_CURRENT_PERIODE,
	ADD_ALL_RAPPORTS,
	ADD_FICHE_PERIODE,
	ADD_FONCTIONNAIRES,
	ADD_CURRENT_FONCTIONNAIRE,
	ADD_ALL_TERRITOIRES,
	ADD_CURRENT_TERRITOIRE,
	ADD_PERIODES,
	ADD_TYPES,
	ADD_ENTITES,
	ADD_PROVINCES,
} from './StateProvider'

export const SET_BANQUE = (BANQUE) => ({
	type: ADD_BANQUE,
	payload: BANQUE,
})

export const SET_LOGIN_BANQUE = (LOGIN_DATA) => ({
	type: LOGIN_BANQUE,
	payload: LOGIN_DATA,
})

export const SET_RAPPORTS = (RAPPORTS) => ({
	type: ADD_RAPPORTS,
	payload: RAPPORTS,
})

export const SET_ALL_RAPPORTS = (ALL_RAPPORTS) => ({
	type: ADD_ALL_RAPPORTS,
	payload: ALL_RAPPORTS,
})

export const SET_CURRENT_PERIODE = (PERIODE) => ({
	type: ADD_CURRENT_PERIODE,
	payload: PERIODE,
})

export const SET_FICHE_PERIODE = (FICHES) => ({
	type: ADD_FICHE_PERIODE,
	payload: FICHES,
})

export const SET_FONCTIONNAIRES = (FONCTIONNAIRES) => ({
	type: ADD_FONCTIONNAIRES,
	payload: FONCTIONNAIRES,
})

export const SET_CURRENT_FONCTIONNAIRE = (FONCTIONNAIRE) => ({
	type: ADD_CURRENT_FONCTIONNAIRE,
	payload: FONCTIONNAIRE,
})
export const SET_TERRITOIRES = (TERRITOIRES) => ({
	type: ADD_ALL_TERRITOIRES,
	payload: TERRITOIRES,
})
export const SET_CURRENT_TERRITOIRE = (CURRENT) => ({
	type: ADD_CURRENT_TERRITOIRE,
	payload: CURRENT,
})

export const SET_PERIODES = (PERIODES) => ({
	type: ADD_PERIODES,
	payload: PERIODES,
})

export const SET_TYPES = (TYPES) => ({
	type: ADD_TYPES,
	payload: TYPES,
})

export const SET_ENTITES = (ENTITES) => ({
	type: ADD_ENTITES,
	payload: ENTITES,
})
export const SET_PROVINCES = (PROVINCES) => ({
	type: ADD_PROVINCES,
	payload: PROVINCES,
})
