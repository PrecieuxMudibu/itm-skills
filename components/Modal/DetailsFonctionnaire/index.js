import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import stylec from './style.module.css'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import useRedux from '../../../hooks/useRedux'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import BadgeIcon from '@mui/icons-material/BadgeOutlined'
import { useQuery } from '@apollo/client'
import Loader from '../../Loader'
import FicheDePaie from '../../Card/FicheDePaie'
import Empty from '../../Card/Empty'
import HeaderFichePaie from '../../Card/HeaderDetails'
import Badge from '@mui/material/Badge'
import { FonctionnaireQuery } from '../../../gql/Query'
import ModalSucess from '../Success'
import { IO } from '../../../socket'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '85vw',
	height: '92.5vh',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 1,
	borderRadius: 1,
}

const DetailsFonctionnaire = ({ open, handleclose }) => {
	const [modalopen, setModalopen] = React.useState(false)
	const handleModalopen = () => setModalopen(true)
	const handleModalclose = () => setModalopen(false)
	const [payes, setPayes] = useState([])
	const [imPayes, setImPayes] = useState([])

	const { currentFonctionnaire, SetCurrentFonctionnaire } = useRedux()

	const { loading } = useQuery(FonctionnaireQuery, {
		variables: { _id: currentFonctionnaire._id },
		onCompleted: ({ fonctionnaire }) => {
			const arrayPayes = []
			const arrayImpayes = []
			if (fonctionnaire) {
				SetCurrentFonctionnaire(fonctionnaire)
				const rest = fonctionnaire.fiches_de_paies.filter(
					(item) => !item.solde
				)
				rest.forEach((item) => {
					item.validation ? arrayPayes.push(item) : arrayImpayes.push(item)
				})
				setPayes(arrayPayes)
				setImPayes(arrayImpayes)
			}
		},
	})

	const [state, setState] = React.useState([
		{ name: 'impayés', active: true, validation: false },
		{ name: 'payés', active: false, validation: true },
	])

	const [active, setActive] = React.useState(false)
	useEffect(() => {
		IO.on('STEP', ({ STEP }) => {
			if (STEP === 5) {
				handleModalopen()
			}
		})
		return () => {
			SetCurrentFonctionnaire({})
		}
	}, [])

	return (
		<div>
			<Modal
				keepMounted
				open={open}
				onClose={handleclose}
				aria-labelledby='keep-mounted-modal-title'
				aria-describedby='keep-mounted-modal-description'
			>
				<Box
					className={`d-flex row justify-content-evenly ${stylec.bdnone}`}
					sx={style}
				>
					<div className={`${stylec.banniere}`}></div>
					<div
						className={`${stylec.left}  pb-5  col-3 d-flex row justify-content-center`}
					>
						<div
							className={`${stylec.profile} d-flex border-bottom row justify-content-center align-items-center`}
						>
							<AssignmentIndIcon />
							<div className={`h4 text-center fw-bolder`}>
								{currentFonctionnaire.identifiant}
								<FingerprintIcon className={`${stylec.svg}`} />
							</div>
							<div className={`h6 text-center fw-line `}>
								{currentFonctionnaire.matricule}
								<BadgeIcon className={`${stylec.svg}`} />
							</div>
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>GRADE </span>
							{currentFonctionnaire.grade}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>PROVINCE </span>
							{currentFonctionnaire.province.name}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>MATRICULE </span>
							{currentFonctionnaire.matricule}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>IDENTIFIANT </span>
							{currentFonctionnaire.identifiant}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>NOM </span>
							{currentFonctionnaire.name}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>PRENOM </span>
							{currentFonctionnaire.firstname}
						</div>{' '}
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>ETABLISSEMENT </span>
							{currentFonctionnaire.etablissement}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>NCOMPTE </span>
							{currentFonctionnaire.ncompte}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>TERRITOIRE </span>
							{currentFonctionnaire.territoire.name}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>SEXE </span>
							{currentFonctionnaire.sexe}
						</div>
						<div className={`border-bottom`}>
							<span className={`h6 text-center fw-bolder`}>CODEAFD </span>
							{currentFonctionnaire.code_afd}
						</div>
					</div>
					<div className={`${stylec.right} col-8`}>
						<div
							className={`${stylec.header} d-flex  justify-content-start align-items-center px-3`}
						>
							{state.map((item, index) => (
								<Badge
									key={index}
									badgeContent={item.validation ? payes.length : imPayes.length}
									overlap='rectangular'
									showZero={true}
									color='secondary'
									className={`${stylec.link} h4 px-4 mx-3	 ${
										item.active && stylec.active
									}`}
									onClick={() => {
										setActive(item.validation)
										setState((state) =>
											state.map((etat) =>
												etat.name === item.name
													? { ...etat, active: true }
													: { ...etat, active: false }
											)
										)
									}}
								>
									{item.name}
								</Badge>
							))}
						</div>

						<div
							className={`${stylec.body}  d-flex row align-items-start px-0 mx-4`}
						>
							<HeaderFichePaie active={active} />
							{active ? (
								<>
									{payes.map((item, index) => (
										<FicheDePaie {...item} numero={index} key={index} />
									))}
									{payes.length === 0 && <Empty text={'pas de fiche payes '} />}
								</>
							) : (
								<>
									{imPayes.map((item, index) => (
										<FicheDePaie {...item} numero={index} key={index} />
									))}
									{imPayes.length === 0 && (
										<Empty text={'pas de fiche impayes '} />
									)}
								</>
							)}
						</div>
					</div>
				</Box>
			</Modal>
			<ModalSucess modalopen={modalopen} Handlemodalclose={handleModalclose} />
			{loading && <Loader />}
		</div>
	)
}

export default DetailsFonctionnaire
