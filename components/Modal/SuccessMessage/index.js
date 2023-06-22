import React, { useEffect } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Image from "next/image";
import sucessmessage from "../../../assets/succes.png";
import stylec from "../DetailsFonctionnaire/style.module.css";

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Backdrop = styled("div")`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const style = {
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "10px",
	p: 2,
	px: 4,
	pb: 3
};

const SuccessMessage = ({ modalopen, Handlemodalclose }) => {
	useEffect(() => {
		setTimeout(() => {
			Handlemodalclose();
		}, 3000);
	}, []);
	return (
		<div>
			<StyledModal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={modalopen}
				onClose={Handlemodalclose}
				BackdropComponent={Backdrop}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<Box
					className={`bg-light d-flex ${stylec.bdnone} py-5 justify-content-center`}
					sx={style}
				>
					<Image
						src={sucessmessage}
						height="60"
						width="60"
						alt="message à succes"
					/>
				</Box>
			</StyledModal>
		</div>
	);
};
export default SuccessMessage;
