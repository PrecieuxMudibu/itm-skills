import { ClassNames } from '@emotion/react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { removeDuplicatedData } from '../../helpers'

export default function SelectInput({
	name,
	onChange,
	data,
	defaultValue,
	className,
}) {
	return (
		<div className={`${className ? className : 'col-md-3 col-12 pb-md-0 pb-2 px-3'}`}>
			<FormControl className='col-12'>
				<InputLabel id='demo-multiple-name-label'>{name}</InputLabel>
				<Select value={defaultValue} className={`bg-white`} onChange={onChange}>
					{data &&
						removeDuplicatedData(data).map((item, index) => (
							<MenuItem
								className='border mx-2 my-1 py-2 rounded'
								value={item._id}
								key={index}
							>
								{item.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</div>
	)
}
