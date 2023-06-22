import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import { useQuery, useLazyQuery } from '@apollo/client'
import useRedux from '../../../hooks/useRedux'
import Pagination from '../../Pagination'
import style from './style.module.css'
import Loader from '../../Loader'
import { IO } from '../../../socket'
import EmptyTab from '../../Card/Empty'
import {
	RapportsByBanqueQuery,
	RapportsBanqueperiodeQuery,
	RapportsBanqueTerritoireQuery,
	RapportsBanqueTypeQuery,
	RapportsBanqueEntiteQuery,
} from '../../../gql/Query'
import TableHeader from '../Card/HeaderFile'
import TableBodyRow from '../Card/RowFile'

import CircularProgress from '@mui/material/CircularProgress'
import RefreshIcon from '@mui/icons-material/Refresh'
import { removeDuplicatedData } from '../../../helpers'
import SelectInput from '../../SelectInput'

const AllFiles = () => {
	const { allRapports, SetAllRapports, banque } = useRedux()
	const [state, setState] = useState({ page: 1, pages: 1 })
	const [counter, setCounter] = useState({
		periode: true,
		territoire: true,
		type: true,
		entite: true,
	})
	const [periodes, setPeriodes] = useState([])
	const [periode, setPeriode] = useState('')
	const [territoires, setTerritoires] = useState([])
	const [territoire, setTerritoire] = useState('')
	const [types, setTypes] = useState([])
	const [type, setType] = useState('')
	const [entites, setEntites] = useState([])
	const [entite, setEntite] = useState('')

	const { loading, refetch, networkStatus } = useQuery(
		RapportsByBanqueQuery,
		{
			variables: {
				banque: banque._id,
				page: state.page,
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ rapport_by_banque }) => {
				if (rapport_by_banque.length > 0) {
					SetAllRapports(rapport_by_banque)
					setState({ page: 1, pages: rapport_by_banque[0].pages })
				} else {
					SetAllRapports([])
				}
			},
		},

		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	const [loadRapportByPeriode, responseByPeriode] = useLazyQuery(
		RapportsBanqueperiodeQuery,
		{
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ rapport_banque_by_periode }) => {
				if (rapport_banque_by_periode) {
					SetAllRapports(rapport_banque_by_periode)
				} else {
					SetAllRapports([])
				}
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	const [loadRapportByTerritoire, responseByTerritoire] = useLazyQuery(
		RapportsBanqueTerritoireQuery,
		{
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ rapport_banque_by_territoire }) => {
				if (rapport_banque_by_territoire) {
					SetAllRapports(rapport_banque_by_territoire)
				} else {
					SetAllRapports([])
				}
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	const [loadRapportByType, responseByType] = useLazyQuery(
		RapportsBanqueTypeQuery,
		{
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ rapport_banque_by_type }) => {
				if (rapport_banque_by_type) {
					SetAllRapports(rapport_banque_by_type)
				} else {
					SetAllRapports([])
				}
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	const [loadRapportByEntite, responseByEntite] = useLazyQuery(
		RapportsBanqueEntiteQuery,
		{
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ rapport_banque_by_entite }) => {
				if (rapport_banque_by_entite) {
					SetAllRapports(rapport_banque_by_entite)
				} else {
					SetAllRapports([])
				}
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)

	useEffect(() => {
		setTypes(removeDuplicatedData(banque.types))
		setPeriodes(removeDuplicatedData(banque.periodes))
		setEntites(removeDuplicatedData(banque.entites))
		setTerritoires(removeDuplicatedData(banque.territoires))
	}, [banque])

	useEffect(() => {
		if (allRapports.length > 0)
			setState({ page: 1, pages: allRapports[0].pages })
		IO.on('STEP', ({ STEP, description }) => {
			if (STEP === 5 && description.banque == banque._id) {
				refetch({
					banque: banque._id,
					page: state.page,
				})
			}
			if (STEP === 6 && description.banque == banque._id) {
				refetch({
					banque: banque._id,
					page: state.page,
				})
			}
		})
	}, [])

	return (
		<div>
			<div className='py-4 d-flex flex-wrap justify-content-between align-items-center'>
				<div className='col-md-9 col-12 d-flex flex-wrap align-items-center'>
					<SelectInput
						name={'periode'}
						className='col-md-3 col-12 px-md-2 mb-2'
						data={periodes}
						defaultValue={periode}
						onChange={({ target: { value } }) => {
							if (counter.periode) {
								loadRapportByPeriode({
									variables: { banque: banque._id, periode: value },
								})
							} else {
								responseByPeriode.refetch({
									banque: banque._id,
									periode: value,
								})
							}
							setPeriode(value)
							setTerritoire('')
							setEntite('')
							setType('')
							setCounter((state) => ({ periode: false, ...state }))
						}}
					/>
					<SelectInput
						name={'territoire'}
						className='col-md-3 col-12 px-md-2 mb-2'
						data={territoires}
						defaultValue={territoire}
						onChange={({ target: { value } }) => {
							if (counter.territoire) {
								loadRapportByTerritoire({
									variables: { banque: banque._id, territoire: value },
								})
							} else {
								responseByTerritoire.refetch({
									banque: banque._id,
									territoire: value,
								})
							}
							setTerritoire(value)
							setPeriode('')
							setType('')
							setEntite('')
							setCounter((state) => ({ territoire: false, ...state }))
						}}
					/>
					<SelectInput
						name={'type'}
						className='col-md-3 col-12 px-md-2 mb-2'
						data={types}
						defaultValue={type}
						onChange={({ target: { value } }) => {
							if (counter.type) {
								loadRapportByType({
									variables: { banque: banque._id, type: value },
								})
							} else {
								responseByType.refetch({
									banque: banque._id,
									type: value,
								})
							}
							setType(value)
							setTerritoire('')
							setPeriode('')
							setEntite('')
							setCounter((state) => ({ type: false, ...state }))
						}}
					/>
					<SelectInput
						name={'entite'}
						className='col-md-3 col-12 px-md-2 mb-2'
						data={entites}
						defaultValue={entite}
						onChange={({ target: { value } }) => {
							if (counter.entite) {
								loadRapportByEntite({
									variables: { banque: banque._id, entite: value },
								})
							} else {
								responseByEntite.refetch({
									banque: banque._id,
									entite: value,
								})
							}
							setEntite(value)
							setTerritoire('')
							setPeriode('')
							setType('')
							setCounter((state) => ({ entite: false, ...state }))
						}}
					/>
				</div>
				<div className='col-md-3 col-12 d-flex align-items-center justify-content-center pt-md-0 pt-2'>
					<div
						onClick={() => {
							refetch()
						}}
					>
						<RefreshIcon className={`${style.icon}`} />
					</div>
					{networkStatus === 4 && (
						<div className=' px-2 '>
							<CircularProgress color='info' />
						</div>
					)}
				</div>
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHeader />
					<TableBody>
						{allRapports.map((row, index) => (
							<TableBodyRow key={row._id} row={row} index={index} />
						))}
					</TableBody>
				</Table>
				{allRapports.length === 0 && (
					<EmptyTab text='aucune Fiche de paie trouver' />
				)}
			</TableContainer>
			<div className={`${style.footer}`}>
				<Pagination onClick={refetch} pages={state.pages} />
			</div>
			{(loading ||
				responseByType.loading ||
				responseByPeriode.loading ||
				responseByTerritoire.loading ||
				responseByEntite.loading ||
				networkStatus === 4 ||
				responseByEntite.networkStatus === 4 ||
				responseByPeriode.networkStatus === 4 ||
				responseByTerritoire.networkStatus === 4 ||
				responseByType.networkStatus === 4) && <Loader />}
		</div>
	)
}
export default AllFiles
