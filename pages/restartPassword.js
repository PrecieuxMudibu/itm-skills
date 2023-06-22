import { useState } from 'react'
import style from '../styles/login.module.css'
import Image from 'next/image'
import dasbord from '../assets/imagelogin.png'
import Button from '../components/Button'
import logoItm from '../assets/LOGOIFS.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import { email_to_update_password_banque } from '../gql/Query'
import ErrorNotification from '../components/Card/Error/Notification'
import GoBack from '../components/Goback'

const schema = yup
	.object({
		email: yup.string().required("le champ de l' email est requis !!!"),
	})
	.required()

const Login = () => {
	const router = useRouter()
	const [Error, setError] = useState({ state: false, message: '' })
	const [loginBanqueQuery, { loading }] = useLazyQuery(
		email_to_update_password_banque,
		{
			onCompleted: ({ email_to_update_password_banque }) => {
				if (email_to_update_password_banque) {
					const { email } = email_to_update_password_banque
					localStorage.setItem('email', email)
					router.push(`/newPassWord?email=${email}`)
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
			nextFetchPolicy: 'network-only', // Doesn't check cache before making a network request
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

	const onSubmit = (data) => {
		loginBanqueQuery({ variables: data })
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

						<div className='pt-5'>
							<GoBack />
						</div>
					</div>
					<div className={`col-9`}>
						<form
							className={`col-12 ${style.forms} `}
							onSubmit={handleSubmit(onSubmit)}
						>
							<h1 className={`${style.titre}`}>Entrez votre adresse email</h1>
							<div className={`${style.bordernone} col-12`}>
								<input
									type='email'
									placeholder='Email'
									className={`py-2 col-12 ${
										errors.email ? style.borderred : style.bordergreen
									} `}
									{...register('email')}
								/>
								{errors.email && <p>{errors.email?.message}</p>}
							</div>
							<Button text='Connexion' />
						</form>
					</div>
				</div>
				<div className='col-0 col-md-6 d-sm-none d-md-flex justify-content-center'>
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

export default Login
