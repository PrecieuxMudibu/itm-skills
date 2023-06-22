import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import stylec from './modalfileexcel.module.css'
import Step from '../../Step'
import papaparse from 'papaparse'
import { gql, useMutation } from '@apollo/client'
import useRedux from '../../../hooks/useRedux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SaveDataMutation } from '../../../gql/Mutation'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import Notification from '../../Card/Error/Notification'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Traitement } from '../../../helpers'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80vw',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 1,
	borderRadius: 2,
}
const schema = yup
	.object({
		libelle: yup.string().required('le libelle  est requis !!!'),
		territoire: yup.string().required('le territoire  est requis !!!'),
		province: yup.string().required('la province  est requis !!!'),
		type: yup.string().required(' le type de rémuneration est requis !!!'),
		service: yup.string().required('le serviec ne doit pas etre vide !!!'),
		banque: yup.string().required('la banque  est requis !!!'),
		periode: yup.string().required('la periode  est requis !!!'),
		data: yup.mixed().required('le fichier  est requis !!!'),
		fond_alouer: yup.string().required('le montant est requis !!!'),
	})
	.required()

const ModalUploadFile = ({ openfile, handleclosefile }) => {
	const { banque, territoires, periodes, types, entites, provinces } =
		useRedux()
	const [state, setState] = useState({ currentBanque: {}, currentPeriode: '' })
	const [FileError, setFileError] = useState({ value: false, message: '' })
	const [periode, setPeriode] = React.useState('')
	const [territoire, setTerritoire] = React.useState('')
	const [province, setProvince] = React.useState('')
	const [remuneration, setRemuneration] = React.useState('')
	const [service, setService] = React.useState('')

	const [addTodo, { loading, error }] = useMutation(SaveDataMutation, {
		onCompeted: (data) => {
			handleclosefile()
		},
		onError: ({ message }) => {
			const typeOfMessage = +message.split(' ').reverse()[0]
			switch (typeOfMessage) {
				case 400:
					setFileError({
						value: true,
						message:
							'Schemas des donnees invalides !!! verifier les colonnes du fichier envoyé',
					})
					break

				case 'fetch':
					setFileError({
						value: true,
						message: 'Une erreur est survenue du cote server',
					})
					break

				case 500:
					setFileError({
						value: true,
						message:
							'Une erreur est survenue du cote server suite au manque des certaines informations dans le fichier ',
					})
					break

				default:
					setFileError({ value: true, message: 'fichier non valide' })
					break
			}
			console.log(message)
		},
	})
	const closeNotification = () => {
		setFileError((etat) => ({ ...etat, value: false }))
	}
	const handleChange = (event) => {
		setTerritoire(event.target.value)
	}

	const handleChangeProvince = (event) => {
		setProvince(event.target.value)
	}
	const handleChangePeriode = (event) => {
		setPeriode(event.target.value)
	}
	const handleChangeRemuneartion = (event) => {
		setRemuneration(event.target.value)
	}
	const handleChangeService = (event) => {
		setService(event.target.value)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = ({
		data,
		fond_alouer,
		territoire,
		banque,
		libelle,
		province,
		periode,
		type,
		service,
	}) => {
		const fr = new FileReader()
		fr.onload = function () {
			const result = papaparse.parse(fr.result, {
				header: true,
				dynamicTyping: true,
			})

			Traitement(
				{
					data: result.data,
					periode,
					territoire,
					libelle,
					fond_alouer,
					banque,
					province,
					type,
					entite: service,
				},
				addTodo
			).catch((message) => {
				setFileError({ message: message, value: true })
			})
		}
		if (data.length > 0) {
			fr.readAsBinaryString(data[0])
		}
	}

	return (
		<div>
			<Modal
				keepMounted
				open={openfile}
				onClose={handleclosefile}
				aria-labelledby='keep-mounted-modal-title'
				aria-describedby='keep-mounted-modal-description'
			>
				<Box sx={style}>
					<div className={`${stylec.container}`}>
						{loading && (
							<div className={`${stylec.header}`}>
								<Step />
							</div>
						)}
						{loading && (
							<div className={`${stylec.Loader}`}>
								<CircularProgress color='primary' size={60} />
							</div>
						)}

						<form
							className={`col-12 px-4 ${stylec.form}`}
							onSubmit={handleSubmit(onSubmit)}
						>
							<Typography
								id='keep-mounted-modal-title'
								className={` text-left ${stylec.title}`}
								variant='h4'
								component='h2'
							>
								Information nécessaire au paiement du fonctionnaire
							</Typography>
							<input
								type='hidden'
								value={banque._id}
								{...register('banque', { required: true })}
							/>

							<div
								className={`col-12 py-1 d-flex justify-content-between ${stylec.contentRow}`}
							>
								<FormControl className='col-3'>
									<InputLabel id='demo-multiple-name-label'>
										Province
									</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={province}
										label='Province'
										{...register('province', { required: true })}
										onChange={handleChangeProvince}
									>
										{provinces.map((item, index) => {
											return (
												<MenuItem
													className={`py-2`}
													value={item._id}
													key={index}
												>
													{item.name}
												</MenuItem>
											)
										})}
									</Select>
									{errors.province && <p>{errors.province?.message}</p>}
								</FormControl>

								<FormControl className='col-3'>
									<InputLabel id='demo-multiple-name-label'>
										Territoire
									</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={territoire}
										label='territoire'
										{...register('territoire', { required: true })}
										onChange={handleChange}
									>
										{territoires.map((item, index) => {
											return (
												<MenuItem
													className={`py-2`}
													value={item._id}
													key={index}
												>
													{item.name}
												</MenuItem>
											)
										})}
									</Select>
									{errors.territoire && <p>{errors.territoire?.message}</p>}
								</FormControl>

								<div className='col-3'>
									<TextField
										className='col-12'
										id='demo-helper-text-misaligned-no-helper'
										type='number'
										{...register('fond_alouer', { required: true })}
										label='Montant a Envoyer'
									/>
									{errors.fond_alouer && <p>{errors.fond_alouer?.message}</p>}
								</div>
							</div>

							<div
								className={`col-12 py-1 d-flex justify-content-between	 ${stylec.contentRow}`}
							>
								<FormControl className='col-3'>
									<InputLabel id='demo-multiple-name-label'>
										Type de rémuneration
									</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={remuneration}
										label='Type de remuneration'
										{...register('type', { required: true })}
										onChange={handleChangeRemuneartion}
									>
										{types.map((item, index) => {
											return (
												<MenuItem
													className={`py-2`}
													value={item._id}
													key={index}
												>
													{item.name}
												</MenuItem>
											)
										})}
									</Select>
									{errors.type && <p>{errors.type?.message}</p>}
								</FormControl>
								<FormControl className='col-3'>
									<InputLabel id='demo-multiple-name-label'>periode</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={periode}
										label='Type de remuneration'
										{...register('periode', { required: true })}
										onChange={handleChangePeriode}
									>
										{periodes.map((item, index) => {
											return (
												<MenuItem
													className={`py-2`}
													value={item._id}
													key={index}
												>
													{item.name}
												</MenuItem>
											)
										})}
									</Select>
									{errors.periode && <p>{errors.periode?.message}</p>}
								</FormControl>

								<FormControl className='col-3'>
									<InputLabel id='demo-multiple-name-label'>Service</InputLabel>
									<Select
										labelId='demo-simple-select-helper-label'
										id='demo-simple-select-helper'
										value={service}
										label='TypeOfService'
										{...register('service', { required: true })}
										onChange={handleChangeService}
									>
										{entites.map((item, index) => {
											return (
												<MenuItem
													className={`py-2`}
													value={item._id}
													key={index}
												>
													{item.name}
												</MenuItem>
											)
										})}
									</Select>
									{errors.service && <p>{errors.service?.message}</p>}
								</FormControl>
							</div>
							<div className={`col-12 py-1 ${stylec.contentRow}`}>
								<div className=''>
									<textarea
										placeholder='Libellé'
										className={`col-12   border px-2 rounded py-2 `}
										{...register('libelle', { required: true })}
									></textarea>
									{errors.libelle && <p>{errors.libelle?.message}</p>}
								</div>
							</div>

							<div className={`col-12 py-1 ${stylec.contentRow}`}>
								<label className={`col-12 h5  ${stylec.label}`}>
									Selectionner fichier csv
								</label>
								<input
									accept='.csv'
									type='file'
									className={` py-2 ${stylec.bdnone} col-12`}
									{...register('data', { required: true })}
								/>
								{errors.data && <p>{errors.data?.message}</p>}
							</div>
							<div className='py-2 d-flex justify-content-evenly'>
								<button
									onClick={handleclosefile}
									className={`col-5 py-3 ${stylec.bdred}`}
									type='reset'
								>
									Annuler
								</button>
								<button className={`col-5 py-3 ${stylec.bdgreen}`}>
									Valider
								</button>
							</div>
						</form>
						{FileError.value && (
							<Notification
								message={FileError.message}
								closeError={closeNotification}
							/>
						)}
					</div>
				</Box>
			</Modal>
		</div>
	)
}
export default ModalUploadFile
