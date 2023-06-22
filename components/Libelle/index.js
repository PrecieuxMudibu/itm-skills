import style from './style.module.css'
import { useState, useEffect } from 'react'
const Libelle = ({
	data,
	currentTerritoire,
	currentPeriode,
	currentType,
	currentEntite,
}) => {
	const [value, setValue] = useState(null)
	useEffect(() => {
		const current = data.find(
			(item) =>
				item.territoire._id == currentTerritoire &&
				item.periode._id == currentPeriode &&
				item.type._id == currentType &&
				item.entite._id == currentEntite
		)
		setValue(current)
	}, [data, currentTerritoire, currentPeriode, currentType, currentEntite])
	if (value)
		return (
			<div className='col-12 pl-2 mt-2 d-flex justify-content-center'>
				<div className={`${style.bg} col-12`}>
					<h1 className='h5 fw-bold py-1 py-3 px-4 border-bottom'>
						Libellé pour la période de {value.periode.name}
					</h1>
					<p className='px-4'>{value.libelle}</p>
				</div>
			</div>
		)
	return <div className='col-12'></div>
}

export default Libelle
