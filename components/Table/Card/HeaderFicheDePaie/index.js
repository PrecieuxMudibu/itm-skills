import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import BadgeIcon from '@mui/icons-material/BadgeOutlined'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#57AFF2',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

export default function TableHeader() {
	return (
		<TableHead>
			<TableRow>
				<StyledTableCell className='text-center'>ICON</StyledTableCell>
				<StyledTableCell className='text-center'>
					NAME <BadgeIcon className='ml-1 mb-1 ' />
				</StyledTableCell>
				<StyledTableCell className='text-center'>MATRICULE</StyledTableCell>
				<StyledTableCell className='text-center'>
					IDENTIFIANT <FingerprintIcon />
				</StyledTableCell>
				<StyledTableCell className='text-center'>NCOMPTE</StyledTableCell>
				<StyledTableCell className='text-center'>NET A PAYER</StyledTableCell>
				<StyledTableCell className='text-center'>SALAIRE BRUTE</StyledTableCell>
				<StyledTableCell className='text-center'>GRADE</StyledTableCell>
				<StyledTableCell className='text-center'>TYPE</StyledTableCell>
				<StyledTableCell className='text-center'>VALIDATION</StyledTableCell>
				<StyledTableCell className='text-center'>PIECEJOINTE</StyledTableCell>
			</TableRow>
		</TableHead>
	)
}
