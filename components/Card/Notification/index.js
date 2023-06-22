import style from './style.module.css'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
import { useEffect } from 'react'

export default function Notification({ message, closeNotification }) {
	useEffect(() => {
		setTimeout(() => {
			closeNotification()
		}, 5500)
	}, [])
	return (
		<div className={`${style.rightTop}`}>
			<Stack sx={{ width: '100%' }} spacing={2}>
				<Alert severity='success' variant='filled' onClose={closeNotification}>
					<AlertTitle>Success</AlertTitle>
					<strong>{message}</strong>
				</Alert>
			</Stack>
		</div>
	)
}
