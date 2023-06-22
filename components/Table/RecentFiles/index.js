import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import useRedux from '../../../hooks/useRedux'
import EmptyTab from '../../Card/Empty'
import TableHeader from '../Card/HeaderFile'
import TableBodyRow from '../Card/RowFile'
import { IO } from '../../../socket'
import Notification from '../../Card/Notification'
import { RapportsByBanqueQuery } from '../../../gql/Query'
import { useQuery } from '@apollo/client'
import Loader from '../../Loader'

const RecentFiles = () => {
	const { rapports, banque, setRapports } = useRedux()
	const [state, setState] = useState({
		state: false,
		message:
			'les nouvelles fiches  ont ete ajoutes !!! rendez vous sur la page de rapport pour voir le nouveaux rapport',
	})

	const closeModal = () => {
		setState((state) => ({ ...state, state: false }))
	}
	const { loading, refetch, networkStatus } = useQuery(
		RapportsByBanqueQuery,
		{
			variables: {
				banque: banque._id,
				page: state.page,
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ rapport_by_banque }) => {
				if (rapport_by_banque.length > 0) setRapports(rapport_by_banque)
				else setRapports([])
			},
		},

		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	useEffect(() => {
		IO.on('STEP', ({ STEP }) => {
			if (STEP === 6) {
				refetch({
					banque: banque._id,
					page: state.page,
				})
			}
		})
		IO.on('STEP', ({ STEP }) => {
			if (STEP === 5) {
				refetch({
					banque: banque._id,
					page: state.page,
				})
			}
		})
	}, [])

	return (
		<div className='px-1 pb-5 pt-2'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHeader />
					<TableBody>
						{rapports.map(
							(row, index) =>
								index < 5 && (
									<TableBodyRow key={row._id} row={row} index={index} />
								)
						)}
					</TableBody>
				</Table>
				{rapports.length === 0 && (
					<EmptyTab text='aucune Fiche de paie enregistrer ' />
				)}
			</TableContainer>
			{(loading || networkStatus === 4) && <Loader />}
			{state.state && (
				<Notification message={state.message} closeNotification={closeModal} />
			)}
		</div>
	)
}
export default RecentFiles
