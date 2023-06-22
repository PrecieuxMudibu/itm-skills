import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import style from "./style.module.css";
export default function Empty({ text }) {
	return (
		<div
			className={`d-flex justify-content-center align-items-center ${style.container}`}
		>
			<h6>{text}</h6>
			<HourglassDisabledIcon />
		</div>
	);
}
