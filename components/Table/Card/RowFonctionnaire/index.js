import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DocumentScannerSharpIcon from '@mui/icons-material/DocumentScannerSharp'
import style from '../../Fonctionnaires/style.module.css'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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
	transition: '1s',
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))
export default function TableRowFonctionnaire({
	row,
	SetCurrentFonctionnaire,
	setOpen,
	index,
}) {
	return (
		<StyledTableRow
			key={row._id}
			onClick={() => {
				SetCurrentFonctionnaire(row)
				setOpen(true)
			}}
		>
			<StyledTableCell component='th' scope='row' className='text-center'>
				{index + 1}
			</StyledTableCell>
			<StyledTableCell className='text-center'>
				<AssignmentIndIcon className={`${style.icon}`} />
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.name}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.matricule}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.identifiant}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.grade}</div>
			</StyledTableCell>{' '}
			<StyledTableCell>
				<div className='text-center'>{row.entite ? row.entite.name : ''}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.province.name}</div>
			</StyledTableCell>
			<StyledTableCell>
				<div className='text-center'>{row.territoire.name}</div>
			</StyledTableCell>{' '}
			<StyledTableCell>
				<div className='text-center d-flex justify-content-center'>
					{row.fiches_de_paies.map((item) =>
						item.solde ? (
							<div
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
								}}
								className={`${style.relative}`}
								key={item._id}
							>
								<DocumentScannerSharpIcon className={`${style.iconGreen}`} />
								<div className={`${style.hover}`}>
									<div>
										<h2>TYPE :</h2>
										<p> {item.type.name}</p>
									</div>
									<div>
										<h2>PERIODE :</h2>
										<p> {item.periode.name}</p>
									</div>

									<div>
										<h2>NET A PAYER :</h2>
										<p> {item.net_a_payer}FC</p>
									</div>
								</div>
							</div>
						) : (
							<div
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
								}}
								className={`${style.relative}`}
								key={item._id}
							>
								<DocumentScannerSharpIcon
									className={`${
										item.validation ? style.iconBlue : style.iconRed
									}`}
								/>
								<div className={`${style.hover}`}>
									<div>
										<h2>TYPE :</h2>
										<p> {item.type.name}</p>
									</div>
									<div>
										<h2>PERIODE :</h2>
										<p> {item.periode.name}</p>
									</div>

									<div>
										<h2>NET A PAYER :</h2>
										<p> {item.net_a_payer}FC</p>
									</div>
								</div>
							</div>
						)
					)}
				</div>
			</StyledTableCell>
		</StyledTableRow>
	)
}
