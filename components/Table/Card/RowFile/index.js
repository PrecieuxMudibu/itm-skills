import Link from 'next/link'
import Image from 'next/image'
import exelfile from '../../../../assets/exelfile.png'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'
import { styled } from '@mui/material/styles'
import style from './style.module.css'
import TableRow from '@mui/material/TableRow'
import { useState, useEffect } from 'react'
import { ExportAll } from '../../../../gql/Query'
import { useQuery } from '@apollo/client'
import useRedux from '../../../../hooks/useRedux'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { CSVLink } from 'react-csv'
import CircularProgress from '@mui/material/CircularProgress'
import BalanceIcon from '@mui/icons-material/Balance'
import Box from '@mui/material/Box'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#57AFF2',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))
const StyledTableRowSolde = styled(TableRow)(({ theme }) => ({
	'&': {
		color: 'white',
		boxSizing: 'borderBox',
	},

	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

export default function TableBodyRow({ row, index }) {
	const [openBalance, setOpenBalance] = useState(false)
	const [_id, set_id] = useState(false)
	const [data, setData] = useState([])
	const { SetCurrentTerritoireName } = useRedux()

	const headers = [
		{ label: 'NCOMPTE', key: 'fonctionnaire.ncompte' },
		{ label: 'MATRICULE', key: 'fonctionnaire.matricule' },
		{ label: 'IDENTIFIANT', key: 'fonctionnaire.identifiant' },
		{ label: 'NET A PAYER', key: 'net_a_payer' },
		{ label: 'SALAIRE BRUTE', key: 'salaire_brute' },
		{ label: 'FTC', key: 'ftc' },
		{ label: 'STATUS', key: 'status' },
		{ label: 'INDICE', key: 'indice' },
		{ label: 'NOM ET POSTNOM', key: 'fonctionnaire.name' },
		{ label: 'PRENOM', key: 'fonctionnaire.firstname' },
		{ label: 'PERIODE', key: 'periode.name' },
		{ label: 'TERRITOIRE', key: 'territoire.name' },
		{ label: 'PROVINCE', key: 'province.name' },
		{ label: 'ETABLISSEMENT', key: 'fonctionnaire.etablissement' },
		{ label: 'GRADE', key: 'fonctionnaire.grade' },
	]
	const {} = useQuery(
		ExportAll,
		{
			variables: {
				rapport: row._id,
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: ({ export_all }) => {
				setData(export_all)
			},
			onError: (err) => {
				console.log(err)
			},
		},
		{
			fetchPolicy: 'network-only', // Used for first execution
			nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
		}
	)
	const handleOpenDeletePeriode = () => {
		if (!row.solde) {
			setOpenBalance(true)
			set_id(row)
		}
	}

	return (
		<StyledTableRowSolde key={row._id}>
			<StyledTableCell
				className='text-center'
				onClick={() => {
					SetCurrentTerritoireName(row)
				}}
			>
				<Link href={`/Liste-fiches-de-paie/${row.periode.name}`}>
					<a>
						<div>
							<Image
								blurDataURL={exelfile}
								placeholder='blur'
								src={exelfile}
								alt='file'
								width=''
								height=''
							/>
						</div>
					</a>
				</Link>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.periode.name}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.fond_depenser}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.fond_restant}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.fond_alouer}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.fonctionnaire_payer} </div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.fonctionnaire_a_payer}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.entite.name}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.type.name}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.territoire.name}</div>
			</StyledTableCell>
			<StyledTableCell className={'text-center'}>
				<CSVLink
					data={data}
					headers={headers}
					filename={`FICHES_${row.periode.name}_${row.territoire.name}_${row.entite.name}_${row.type.name}.csv`}
				>
					{data.length > 0 ? (
						<SystemUpdateAltIcon className={`${style.icon}`} />
					) : (
						<CircularProgress color='info' />
					)}
				</CSVLink>
			</StyledTableCell>
			<StyledTableCell>
				<Box
					sx={{
						'& > :not(style)': {
							m: 2,
						},
					}}
				>
					{row.solde ? (
						<BalanceIcon
							className={`${style.reder}`}
							onClick={handleOpenDeletePeriode}
						/>
					) : (
						<BalanceIcon className={`${style.icon}`} />
					)}
				</Box>
			</StyledTableCell>
		</StyledTableRowSolde>
	)
}
