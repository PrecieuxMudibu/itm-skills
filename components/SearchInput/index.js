import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { alpha } from '@mui/material/styles'
import styleModule from './style.module.css'

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
}))

export default function SearchInput({
	placeholder,
	type,
	Icon,
	onChange,
	className,
	limit,
	value,
}) {
	const [state, setState] = useState(1)
	const [defaultValue, setDefaultValue] = useState(value)
	return (
		<Search min={limit} className="col-md-4 col-12 pb-md-0 pb-2">
			<SearchIconWrapper>
				<Icon />
			</SearchIconWrapper>
			<StyledInputBase
				type={type}
				placeholder={placeholder}
				inputProps={{ 'aria-label': 'search' }}
				className={`${className} ${styleModule.borderBlue}`}
				onChange={(e) => {
					onChange(e)
					const {
						target: { value },
					} = e
					setState(e.length)
				}}
			/>
		</Search>
	)
}
