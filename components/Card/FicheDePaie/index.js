import stylec from "./style.module.css";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import ShowImage from "../../Modal/ShowImage";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

const FicheDePaie = ({
	validation,
	periode,
	_id,
	net_a_payer,
	piece_jointe,
	salaire_brute,
	indice,
	numero
}) => {
	const [openModalImage, setOpenModalImage] = useState({
		modal: false,
		href: piece_jointe.image
	});
	const getOpenModal = (href) => {
		setOpenModalImage((etat) => ({ href, modal: true }));
	};
	const getCloseModal = () => {
		setOpenModalImage((etat) => ({ ...etat, modal: false }));
	};
	return (
		<>
			<div
				key={_id}
				className={`d-flex justify-content-evenly align-items-center h4 px-2 ${
					validation ? stylec.ficheblue : stylec.ficheRed
				}`}
			>
				<div>
					<p className={`h6 text-center fw-bolder`}>{numero + 1} </p>
				</div>
				<div>
					<DocumentScannerIcon className={`${stylec.iconRed}`} />
				</div>
				<div>
					<p className={`h6 text-center fw-bold`}>{periode.name} </p>
				</div>
				<div>
					<p className={`h6 text-center fw-bold`}>{net_a_payer} FC </p>
				</div>
				<div>
					<p className={`h6 text-center fw-bold`}>{salaire_brute} FC</p>
				</div>
				<div>
					<p className={`h6 text-center fw-bold`}>{indice} </p>
				</div>
				{validation ? (
					<div
						style={{
							background: "#57AFF2",
							color: "white",
							padding: "7.5px",
							borderRadius: 10,
							cursor: "pointer"
						}}
					>
						<AvatarGroup direction="row" max={2}>
							<Avatar
								onClick={() => {
									getOpenModal(piece_jointe.image);
								}}
								alt="image pieces jointes"
								src={piece_jointe.image}
							/>
							<Avatar
								onClick={() => {
									getOpenModal(piece_jointe.user.image);
								}}
								alt="image pieces jointes"
								src={piece_jointe.user.image}
							/>
						</AvatarGroup>
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
			</div>{" "}
			<ShowImage modalopen={openModalImage} Handlemodalclose={getCloseModal} />
		</>
	);
};

export default FicheDePaie;
