import style from "./CardRapport.module.css";
import Image from "next/image";
import money from "../../../assets/Vector.svg";
import person from "../../../assets/people.svg";
import React from "react";

const CardRapport = ({
	data,
	currentTerritoire,
	currentPeriode,
	currentType,
	currentEntite
}) => {
	const [item, setItem] = React.useState(null);
	React.useEffect(() => {
		const current = data.find(
			(item) =>
				item.territoire._id == currentTerritoire &&
				item.periode._id == currentPeriode &&
				item.type._id == currentType &&
				item.entite._id == currentEntite
		);
		setItem(current);
	}, [currentTerritoire, currentPeriode, currentType, currentEntite]);
	return (
		<>
			{item ? (
				<div className={`col-12 pt-5 d-flex row  mx-3 ${style.card}`}>
					<div className="d-flex flex-wrap justify-content-around">
						<div className="col-12 col-md-4 px-md-4 px-2 pb-2 pb-md-0">
							<div
								className={` d-flex  row justify-content-center py-5 ${style.relative}  ${style.bg6} col-12  ${style.rounded}`}
							>
								<Image
									src={money}
									className=""
									height="80"
									width="80"
									alt="ilustration"
								/>
								<h2 className={`h5 pt-4 fw-bold ${style.textColor} `}>
									Montant reçu pour le teritoire de : {item && item.name}
								</h2>

								<p className={` ${style.textColor} fw-bold h2  `}>
									{item.fond_alouer} FC
								</p>
								{item.solde && (
									<div className={`${style.solder}  fw-bold col-4`}>soldé</div>
								)}
							</div>
						</div>

						<div className="col-12 col-md-4 px-md-4 px-2 pb-2 pb-md-0">
							<div
								className={` d-flex row justify-content-center py-5 ${style.relative}  ${style.bg3} col-12  ${style.rounded}`}
							>
								<Image
									src={money}
									className=""
									height={80}
									width={80}
									alt="ilustration"
								/>
								<h2 className={`h5 pt-4 fw-bold ${style.textColor} `}>
									Montant dépensé pour le teritoire de : {item && item.name}
								</h2>

								<p className={` ${style.textColor} fw-bold h2  `}>
									{item.fond_depenser} FC
								</p>
								{item.solde && (
									<div
										className={`${style.solder}  ${style.color3}  fw-bold col-4`}
									>
										soldé
									</div>
								)}
							</div>
						</div>

						<div className="col-12 col-md-4 px-md-4 px-2 pb-2 pb-md-0">
							<div
								className={` d-flex row justify-content-center py-5 ${style.relative}  ${style.bg4} col-12  ${style.rounded}`}
							>
								<Image
									src={money}
									className=""
									height={80}
									width={80}
									alt="ilustration"
								/>
								<h2 className={`h5 pt-4 fw-bold  ${style.textColor} `}>
									Relicat pour le teritoire de : {item && item.name}
								</h2>

								<p className={` ${style.textColor} fw-bold h2  `}>
									{item.fond_restant} FC
								</p>
								{item.solde && (
									<div
										className={`${style.solder} ${style.color4} fw-bold  col-4`}
									>
										soldé
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="d-flex flex-wrap justify-content-around pt-5">
						<div className="col-12 col-md-4 px-md-4 px-2 pb-2 pb-md-0">
							<div
								className={` d-flex row justify-content-center py-5 ${style.relative}  ${style.bg6} col-12 ${style.rounded}`}
							>
								{" "}
								<Image
									src={person}
									className=""
									height={80}
									width={80}
									alt="ilustration"
								/>
								<h2 className={`h5 text-light pt-4 fw-bold `}>
									Fonctionnaires à payer pour le teritoire de :{" "}
									{item && item.name}
								</h2>
								<p className={`text-light fw-bold h2  `}>
									{item.fonctionnaire_a_payer + item.fonctionnaire_payer}
								</p>
								{item.solde && (
									<div className={`${style.solder} col-4 fw-bold`}>soldé</div>
								)}
							</div>
						</div>
						<div className="col-12 col-md-4 px-md-4 px-2 pb-2 pb-md-0">
							<div
								className={` d-flex row justify-content-center py-5 ${style.relative}  ${style.bg3} col-12 ${style.rounded}`}
							>
								<Image
									src={person}
									className=""
									height={80}
									width={80}
									alt="ilustration"
								/>
								<h2 className={`h5 fw-bold text-light pt-4 `}>
									Fonctionnaires payés pour le territoire de :{" "}
									{item && item.name}
								</h2>

								<p className={`text-light fw-bold h2  `}>
									{item.fonctionnaire_payer}
								</p>
								{item.solde && (
									<div
										className={`${style.solder} ${style.color3}  col-4  fw-bold`}
									>
										soldé
									</div>
								)}
							</div>
						</div>
						<div className="col-12 col-md-4 px-md-4 px-2 pb-2 pb-md-0">
							<div
								className={` d-flex row justify-content-center py-5 ${style.relative}  ${style.bg4} col-12 ${style.rounded}`}
							>
								<Image
									src={person}
									className=""
									height={80}
									width={80}
									alt="ilustration"
								/>
								<h2 className={`h5 fw-bold text-light pt-4 `}>
									Fonctionnaires non payés pour le territoire de :{" "}
									{item && item.name}
								</h2>

								<p className={`text-light fw-bold h2  `}>
									{item.fonctionnaire_a_payer}
								</p>
								{item.solde && (
									<div
										className={`${style.solder} ${style.color4}  fw-bold col-4`}
									>
										soldé
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className={`${style.emptyCard}`}>
					Aucune donnee correspondant a cette periode dans la region ou territoire 
					selectionnee, le service selctionnee ainsi que le type de paiement
					selectionnee (faite un autre choix pour voire les donnees disponibles )
				</div>
			)}
		</>
	);
};

export default CardRapport;
