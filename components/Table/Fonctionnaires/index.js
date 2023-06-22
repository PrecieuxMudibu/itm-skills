import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { useQuery, useLazyQuery } from '@apollo/client'
import useRedux from '../../../hooks/useRedux'
import Pagination from '../../Pagination'
import style from './style.module.css'
import Loader from '../../Loader'
import { IO } from '../../../socket'
import CircularProgress from '@mui/material/CircularProgress'
import RefreshIcon from '@mui/icons-material/Refresh'
import Modal from '../../Modal/DetailsFonctionnaire'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import BadgeIcon from '@mui/icons-material/BadgeOutlined'
import EmptyTab from '../../Card/Empty'
import SearchInput from '../../SearchInput'
import {
	FonctionnairesQuery,
	FonctionnaireMatriculeSearchQuery,
	FonctionnaireIdentifiantSearchQuery,
} from '../../../gql/Query'
import TableHeaderFonctionnaire from '../Card/HeaderFonctionnaire'
import TableRowFonctionnaire from '../Card/RowFonctionnaire'

const AllFonctionnaires = () => {
	const {
		fonctionnaires,
		SetFonctionnaires,
		SetCurrentFonctionnaire,
		currentFonctionnaire,
		banque,
	} = useRedux()
	const [open, setOpen] = useState(false)
	const [nameSearch, setNameSearch] = useState('')
	const [identifiantSearch, setIdentifiantSearch] = useState('')
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const [state, setState] = useState({
		page: 1,
		pages: fonctionnaires[0] ? fonctionnaires[0].pages_by_banque : 1,
	})
	const [variables] = useState({
		banque: banque._id,
		page: state.page,
	})
	const { loading, refetch, networkStatus } = useQuery(
		FonctionnairesQuery,
		{
			variables,
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ fonctionnaires_by_banque }) => {
				if (fonctionnaires_by_banque && fonctionnaires_by_banque.length > 0) {
					SetFonctionnaires(fonctionnaires_by_banque)
					setState({
						page: 1,
						pages: fonctionnaires_by_banque[0].pages_by_banque,
					})
				} else {
					SetFonctionnaires([])
				}
			},
			onError: (error) => {
				console.log(error)
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	const [searchByMatricule, responseMatricule] = useLazyQuery(
		FonctionnaireMatriculeSearchQuery,
		{
			onCompleted: ({ fonctionnaire_name_search }) => {
				if (fonctionnaire_name_search && fonctionnaire_name_search.length > 0) {
					SetFonctionnaires(fonctionnaire_name_search)
				} else {
					SetFonctionnaires([])
				}
			},
			onError: (error) => {
				console.log(error)
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)

	const [searchByIdentifiant, responseIdentifiant] = useLazyQuery(
		FonctionnaireIdentifiantSearchQuery,
		{
			onCompleted: ({ fonctionnaire_identifiant_search }) => {
				if (
					fonctionnaire_identifiant_search &&
					fonctionnaire_identifiant_search.length > 0
				) {
					SetFonctionnaires(fonctionnaire_identifiant_search)
				} else {
					SetFonctionnaires([])
				}
			},
			onError: (error) => {
				console.log(error)
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)

	useEffect(() => {
		if (currentFonctionnaire['_id']) handleOpen()
		return () => {
			SetFonctionnaires([])
		}
	}, [])
	useEffect(() => {
		IO.on('STEP', ({ STEP }) => {
			if (STEP === 5) {
				refetch(variables)
			}
		})
	}, [])

	return (
		<div>
			<div className='py-4 d-flex justify-content-between '>
				<div className='col-12 d-flex flex-wrap align-items-center justify-content-between'>
					<div className='d-flex flex-wrap col-md-11 col-12 align-items-center'>
						<SearchInput
							Icon={BadgeIcon}
							placeholder='recherche par nom et postnom...'
							type='text'
							className='border rounded py-1'
							value={nameSearch}
							onChange={({ target: { value } }) => {
								setIdentifiantSearch('')
								setNameSearch(value)
								if (value.length > 3)
									searchByMatricule({
										variables: {
											banque: localStorage.getItem('id'),
											matricule: value,
										},
									})
							}}
						/>
						{responseMatricule.loading && (
							<div className='px-2'>
								<CircularProgress color='info' />
							</div>
						)}
						<SearchInput
							Icon={FingerprintIcon}
							placeholder='recherche par identifiant...'
							type='number'
							className='border rounded py-1'
							value={identifiantSearch}
							onChange={({ target: { value } }) => {
								setNameSearch('')
								setIdentifiantSearch(value)
								if (value.length > 3)
									searchByIdentifiant({
										variables: {
											banque: localStorage.getItem('id'),
											identifiant: value,
										},
									})
							}}
						/>

						{responseIdentifiant.loading && (
							<div className=' px-2 '>
								<CircularProgress color='info' />
							</div>
						)}
					</div>
					<div className='d-flex align-items-center justify-content-center col-md-1 col-12'>
						<div
							onClick={() => {
								refetch()
							}}
						>
							<RefreshIcon className={`${style.icon}`} />
						</div>
					</div>
				</div>
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHeaderFonctionnaire />
					<TableBody>
						{fonctionnaires.map((row, index) => (
							<TableRowFonctionnaire
								row={row}
								index={index}
								setOpen={setOpen}
								SetCurrentFonctionnaire={SetCurrentFonctionnaire}
							/>
						))}
					</TableBody>
				</Table>
				{fonctionnaires.length === 0 && <EmptyTab text='aucun fonctionnaire' />}
			</TableContainer>
			<div className={`${style.footer}`}>
				<Pagination onClick={refetch} pages={state.pages} />
			</div>
			{open && <Modal open={open} handleclose={handleClose} />}
			{loading && <Loader />}
		</div>
	)
}
export default AllFonctionnaires
