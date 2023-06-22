import style from "./style.module.css";
import { CircularProgress } from "@mui/material";
export default function Loader() {
	return (
		<>
			<div className={`${style.container}`}>
				<CircularProgress color="primary" size={60} />
			</div>
		</>
	);
}
