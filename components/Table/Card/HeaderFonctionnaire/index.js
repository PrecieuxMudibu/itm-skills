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

export default function TableHeaderFonctionnaire() {
	return (
		<TableHead>
			<TableRow>
				<StyledTableCell className='text-center'>ID</StyledTableCell>
				<StyledTableCell className='text-center'>ICON</StyledTableCell>
				<StyledTableCell className='text-center'>
					NOM <BadgeIcon />
				</StyledTableCell>
				<StyledTableCell className='text-center '>MATRICULE</StyledTableCell>
				<StyledTableCell className='text-center'>
					IDENTIFIANT <FingerprintIcon />
				</StyledTableCell>
				<StyledTableCell className='text-center'>GRADE</StyledTableCell>
				<StyledTableCell className='text-center'>SERVICE</StyledTableCell>
				<StyledTableCell className='text-center'>PROVINCE</StyledTableCell>
				<StyledTableCell className='text-center'>TERRITOIRE</StyledTableCell>
				<StyledTableCell className='text-center'>
					FICHES DE PAIE
				</StyledTableCell>
			</TableRow>
		</TableHead>
	)
}
