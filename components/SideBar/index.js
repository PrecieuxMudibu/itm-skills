import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import profil from '../../assets/profil.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useRedux from '../../hooks/useRedux'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import Notification from '../Card/Notification'
import { IO } from '../../socket'

const SideBarBank = () => {
	const { banque, login_banque } = useRedux()

	const router = useRouter()
	const [state, setState] = useState({
		state: false,
		message:
			'les nouvelles fiches  ont ete ajoutes !!! rendez vous sur la page de rapport pour voir le nouveaux rapport',
	})
	const openModal = (message) => {
		if (message === '') {
			setState((state) => ({ ...state, state: true }))
		} else {
			setState(() => ({ message: message, state: true }))
		}
	}

	const closeModal = () => {
		setState((state) => ({ ...state, state: false }))
	}

	useEffect(() => {
		IO.on('STEP', ({ STEP, description }) => {
			if (STEP === 6 && description.banque == banque._id) {
				openModal(
					'un fonctionnaire a été payé pour la periode de ' +
						description.periode +
						' dans le territoire de  ' +
						description.territoire
				)
			}
			if (STEP === 5 && description.banque == banque._id) {
				openModal('')
			}
		})
	}, [])

	useEffect(() => {
		if (!localStorage.getItem('token')) console.log('deconnection')
		if (!localStorage.getItem('token')) router.push('/')
		if (!login_banque['_id']) router.push('/')
	}, [router.asPath])

	return (
		<div className='position-fixed'>
			<div
				className={`d-flex flex-column flex-shrink-0 p-md-3 p-2 text-white ${style.bgcolor} ${style.width}`}
			>
				<div className='d-sm-none d-flex row align-items-center justify-content-center '>
					<Image
						blurDataURL={profil}
						placeholder='blur'
						height={45}
						width={45}
						src={profil}
						className='d-sm-none d-block'
					/>
				</div>
				<div className='d-md-flex d-none row align-items-center justify-content-center '>
					<Image
						blurDataURL={profil}
						placeholder='blur'
						height={80}
						width={80}
						src={profil}
						className='d-md-block d-none'
					/>
					<h1 className='text-center d-none d-md-inline'>{banque.name}</h1>
					<h2 className='text-center d-none d-md-inline h6 text-light'>
						{banque.email}
					</h2>
				</div>
				<ul className='nav nav-pills flex-column mb-auto mt-2 border-top pt-2'>
					<li className='nav-item d-flex'>
						<Link href='/Rapport' passHref>
							<a
								className={`nav-link col ${style.focusPage} ${
									router.pathname === '/Rapport' ? style.active : ''
								}`}
								aria-current='page'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									className='bi bi-grid-1x2-fill'
									viewBox='0 0 16 16'
								>
									<path d='M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z' />
								</svg>
								<span className='px-4 fw-bold d-none d-md-inline'>
									Dashboard
								</span>
							</a>
						</Link>
					</li>

					<li>
						<Link href='/Files' passHref>
							<a
								className={`nav-link ${style.focusPage} ${
									router.pathname !== '/Rapport' &&
									router.pathname !== '/Upload' &&
									router.pathname !== '/Fonctionnaires'
										? style.active
										: ''
								}`}
							>
								<FilePresentIcon />
								<span className='px-4 fw-bold d-none d-md-inline '>
									Fichiers
								</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href='/Fonctionnaires' passHref>
							<a
								className={`nav-link ${style.focusPage} ${
									router.pathname === '/Fonctionnaires' ? style.active : ''
								}`}
							>
								<AssignmentIndIcon />
								<span className='px-4 fw-bold d-none d-md-inline'>
									Fonctionnaires
								</span>
							</a>
						</Link>
					</li>
				</ul>
				<Link
					href='/'
					title='deconnexion'
					passHref
					onClick={() => {
						localStorage.setItem('token', null)
						localStorage.setItem('id', null)
						setBanque({ periodes: [], name: '', email: '' })
					}}
				>
					<div
						className={`d-flex justify-content-center ${style.hoverExitPage}`}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='46'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path
								fillRule='evenodd'
								d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
							/>
							<path
								fillRule='evenodd'
								d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
							/>
						</svg>
					</div>
				</Link>
			</div>
			{state.state && (
				<Notification message={state.message} closeNotification={closeModal} />
			)}
		</div>
	)
}

export default SideBarBank
