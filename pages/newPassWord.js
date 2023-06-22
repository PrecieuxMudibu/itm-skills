import { useState, useEffect } from 'react'
import style from '../styles/login.module.css'
import eye from '../assets/eye.svg'
import Image from 'next/image'
import dasbord from '../assets/imagelogin.png'
import Button from '../components/Button'
import logoItm from '../assets/LOGOIFS.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLazyQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import useRedux from '../hooks/useRedux'
import { update_password_banque } from '../gql/Query'
import ErrorNotification from '../components/Card/Error/Notification'
import Link from 'next/link'
import GoBack from '../components/Goback'

const Eye = <Image src={eye} width='' height='' />

const schema = yup
	.object({
		code: yup.string().required('le champ du code est requis !!!'),
		password: yup
			.string()
			.min(7, 'le mot de passe doit avoir au minimum 7 character')
			.required('le champ du mot de passe est requis !!!'),
	})
	.required()

const newPassWord = () => {
	const router = useRouter()
	const { setLoginBanque } = useRedux()

	const [passwordShown, setPasswordShown] = useState(false)
	const [Error, setError] = useState({ state: false, message: '' })
	const [loginBanqueQuery, { loading, error }] = useLazyQuery(
		update_password_banque,
		{
			onCompleted: ({ update_password_banque }) => {
				if (update_password_banque) {
					const { _id, email } = update_password_banque
					localStorage.setItem('email', email)
					console.log({ _id, email })
					router.push('/')
				} else {
					setError({
						state: true,
						message: 'veillez verifier vos informations de connection',
					})
				}
			},
			onError: (err) => {
				setError({ state: true, message: err.message })
			},
		},
		{
			fetchPolicy: 'network-only', // Doesn't check cache before making a network request
		}
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const closeError = () => {
		setError({ state: false, message: '' })
	}

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true)
	}

	const onSubmit = (data) => {
		loginBanqueQuery({
			variables: {
				...data,
				email: localStorage.getItem('email') || router.query.email,
			},
		})
		closeError()
	}

	return (
		<>
			<div className={`d-flex ${style.parent}`}>
				<div className='col-md-6 col-12 d-flex justify-content-center row'>
					<div className='col-9 pt-5'>
						<Image
							src={logoItm}
							width='100'
							height='50'
							className='img-fluid '
							alt='logo-itm'
						/>
					</div>
					<div className={`col-9`}>
						<form
							className={` col-12 ${style.forms} `}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<p>
									Entrez le code Envoyez sur votre adresse mail <br />
									<Link href='/restartPassword'>
										Si vous n'avez pas recu le code cliquez ici
									</Link>
								</p>
							</div>
							<h1 className={`${style.titre}`}>
								Entrez le nouveau mot de passe
							</h1>

							<div className={`${style.bordernone} `}>
								<input
									type='text'
									placeholder='Code'
									className={`py-2  ${
										errors.code ? style.borderred : style.bordergreen
									} `}
									{...register('code')}
								/>
								{errors.email && <p>{errors.email?.message}</p>}
							</div>

							<div className={`${style.border} `}>
								<div className={`${style.relative} ${style.bordernone} `}>
									<input
										type={passwordShown ? 'text' : 'password'}
										placeholder='mot de passe'
										className={` py-2 ${
											errors.password ? style.borderred : style.bordergreen
										}  `}
										{...register('password')}
									/>
									<i
										className={` ${style.absoluteIcon}`}
										onClick={togglePasswordVisiblity}
									>
										{Eye}
									</i>
								</div>
								{errors.password && <p>{errors.password?.message}</p>}
							</div>

							<Button text='Connexion' />
						</form>
					</div>
				</div>
				<div className='col-0 col-md-6 d-sm-none d-md-flex justify-content-center '>
					<Image
						src={dasbord}
						width='700'
						height='600'
						className='img-fluid'
						alt='illustration'
					/>
				</div>
			</div>
			{Error.state && (
				<ErrorNotification message={Error.message} closeError={closeError} />
			)}
			{loading && <Loader />}
		</>
	)
}

export default newPassWord
