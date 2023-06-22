import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import stylec from "./style.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import eye from "../../../assets/eye.svg";
import userProfileImage from "../../../assets/profil.png";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Button from "../../Button";
import { useMutation } from "@apollo/client";
import LoaderLogin from "../../Loader";
import { Solder } from "../../../gql/Mutation";
import SuccessMessage from "../Success";
import FailledMessage from "../Error";
import ClearIcon from "@mui/icons-material/Clear";
import useRedux from "../../../hooks/useRedux";
import { uploadFile } from "../../../helpers";

const Eye = <Image src={eye} width="" height="" alt="illustration oeil" />;

const schema = yup
	.object({
		url: yup.string().required("le champ de l' image est requis !!!")
	})
	.required();

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "60vw",
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: 2,
	overflow: "hidden"
};

const DeletePeriode = ({ open, handleclose, row }) => {
	const { territoires, SetTerritoires, login_user } = useRedux();

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalOpen = () => setModalOpen(true);
	const handleModalClose = () => setModalOpen(false);

	const [stateLoader, setStateLoader] = useState(false);
	const [modalOpenFailed, setModalOpenFailed] = useState(false);
	const handelModalOpenFailed = () => setModalOpenFailed(true);
	const handelModalCloseFailed = () => setModalOpenFailed(false);

	const [linkName, setLinkName] = useState(undefined);
	const [state, setState] = useState({});

	// const [SOLDER, { loading }] = useMutation(Solder, {
	// 	onCompleted: ({ solder }) => {
	// 		console.log(solder)
	// 		if (solder) {
	// 			handleModalOpen();
	// 		} else handelModalOpenFailed();
	// 	},
	// 	onError: (error) => {
	// 		console.log(error)
	// 		handelModalOpenFailed();
	// 	}
	// });
	const openLoader = () => {
		setStateLoader(true);
	};
	const closeLoader = (name) => {
		setStateLoader(false);
		setLinkName(name);
	};

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = ({ url }) => {
		if (!stateLoader && url.length > 0) {
			SOLDER({
				variables: {
					_id: row._id,
					url: linkName,
					user: login_user._id
				}
			});
		}
	};

	return (
		<>
			<div className={`  d-flex justify-content-center align-items-center`}>
				<Modal
					keepMounted
					open={open}
					onClose={handleclose}
					aria-labelledby="keep-mounted-modal-title"
					aria-describedby="keep-mounted-modal-description"
				>
					<Box
						className={`d-flex row justify-content-center ${stylec.bdnone}`}
						sx={style}
					>
						<Typography
							id="keep-mounted-modal-title"
							className={` ${stylec.header} py-4 text-center text-light fw-bold `}
							variant=""
							component="h2"
						>
						Etes-vous sûr de supprimer la période de <br/>  {row.periode} ?
						 <br/>
								
								</Typography>

						<form
							className="col-11 my-2 mx-4 "
							onSubmit={handleSubmit(onSubmit)}
						>
							<ClearIcon
								className={`${stylec.croix}`}
								onClick={(e) => {
									e.stopPropagation();
									handleclose();
								}}
							/>
						
						

							<div className="col-12 d-flex  justify-content-around">
								<div className="col-3" 
								
								onClick={(e) => {
									e.stopPropagation();
									handleclose();
								}}>
									<Button type="reset"   className={` ${stylec.borderred} fw-bold  `} text="NON" />
								</div>

								<div className="col-3">
									<Button type="submit" className={` ${stylec.borderred} fw-bold `} text="OUI" />

								</div>
							</div>
						</form>
						{/* {loading && <LoaderLogin />} */}
					</Box>
				</Modal>
			</div>
			<SuccessMessage
				modalopen={modalOpen}
				Handlemodalclose={handleModalClose}
			/>
			<FailledMessage
				modalopen={modalOpenFailed}
				Handlemodalclose={handelModalCloseFailed}
			/>
		</>
	);
};

export default DeletePeriode;
