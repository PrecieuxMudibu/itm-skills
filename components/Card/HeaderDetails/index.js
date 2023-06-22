import stylec from "./style.module.css";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

export default function HeaderDetails({ active }) {
	return (
		<div
			style={{
				background: "#57AFF2",
				color: "white",
				maxHeight: "50px"
			}}
			className="d-flex justify-content-evenly align-items-center h4 py-2 mb-2"
		>
			<div>
				<p className={`h6 text-center fw-bolder`}>ID </p>
			</div>
			<div>
				<DocumentScannerIcon className={`${stylec.iconRed}`} />
			</div>
			<div>
				<p className={`h6 text-center fw-bolder`}>PERIODE </p>
			</div>
			<div>
				<p className={`h6 text-center fw-bolder`}>NET A PAYER </p>
			</div>
			<div>
				<p className={`h6 text-center fw-bolder`}>SALAIRE BRUTE </p>
			</div>
			<div>
				<p className={`h6 text-center fw-bolder`}>INDICE </p>
			</div>
			{active ? (
				<div
					style={{
						background: "#57AFF2",
						color: "white",
						padding: "7.5px",
						borderRadius: 10
					}}
				>
					<SupervisedUserCircleOutlinedIcon size={50} />
					<SummarizeOutlinedIcon />
				</div>
			) : (
				<div
					style={{
						background: "red",
						color: "white",
						padding: "7.5px",
						borderRadius: 10
					}}
				>
					<GppBadOutlinedIcon />
				</div>
			)}
		</div>
	);
}
