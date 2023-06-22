import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
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
				<StyledTableCell className='text-center'>PERIODE</StyledTableCell>
				<StyledTableCell className='text-center'>
					MONTANT DEPENSE (FC)
				</StyledTableCell>
				<StyledTableCell className='text-center'>RELICAT (FC)</StyledTableCell>
				<StyledTableCell className='text-center'>
					MONTANT RECU (FC)
				</StyledTableCell>
				<StyledTableCell className='text-center'>
					FONCTIONNAIRE PAYE(S)
				</StyledTableCell>
				<StyledTableCell className='text-center'>
					FONCTIONNAIRE IMPAYE(S)
				</StyledTableCell>
				<StyledTableCell className='text-center'> ENTITE </StyledTableCell>
				<StyledTableCell className='text-center'> TYPE </StyledTableCell>
				<StyledTableCell className='text-center'> TERRITOIRE </StyledTableCell>
				<StyledTableCell className='text-center'>EXPORTATION</StyledTableCell>
				<StyledTableCell className='text-center'>SOLDER</StyledTableCell>
			</TableRow>
		</TableHead>
	)
}
