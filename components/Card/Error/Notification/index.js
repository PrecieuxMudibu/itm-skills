import style from "./style.module.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


export default function ErrorNotification({ message, closeError }) {
	return (
		<div className={`${style.rightTop}`}>
			<Stack sx={{ width: "100%" }} spacing={2}>
				<Alert severity="error" variant="filled" onClose={closeError}>
					<AlertTitle>Error</AlertTitle>
					<strong>{message}</strong>
				</Alert>
			</Stack>
		</div>
	);
}
