import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import React from "react";
import Image from "next/image";
import EmptyStyle from "../../assets/empty-not-css.svg";
Chart.register(ArcElement);


const Chartpie = ({
	className,
	data,
	currentTerritoire,
	currentPeriode,
	currentType,
	currentEntite
}) => {
	const [currentView, setCurrentView] = React.useState(true);
	const [state, setState] = React.useState({
		labels: ["Fonctionnaires payés ", "Fonctionnaires à payer"],
		datasets: [
			{
				label: "Rainfall",
				backgroundColor: ["#57AFF2", "#501890"],
				hoverBackgroundColor: ["#501800", "#4B5000"],
				data: [5, 5]
			}
		]
	});
	React.useEffect(() => {
		const current = data.find((current) => {
			if (
				current.territoire._id == currentTerritoire &&
				current.periode._id == currentPeriode &&
				current.type._id == currentType &&
				current.entite._id == currentEntite
			) {
				setState({
					labels: ['Fonctionnaires  payés(%)', 'Fonctionnaires à payer (%)'],
					datasets: [
						{
							label: 'Rainfall',
							backgroundColor: ['#7cfabb', '#F896EF'],
							hoverBackgroundColor: ['#7aaaaa', '#502100'],
							data: [
								data.length > 0
									? Math.round(
											(current.fonctionnaire_payer /
												(current.fonctionnaire_a_payer +
													current.fonctionnaire_payer)) *
												100
									  )
									: 5,
								data.length > 0
									? Math.round(
											(current.fonctionnaire_a_payer /
												(current.fonctionnaire_payer +
													current.fonctionnaire_a_payer)) *
												100
									  )
									: 5,
							],
						},
					],
				})
			}
			return (
				current.territoire._id == currentTerritoire &&
				current.periode._id == currentPeriode &&
				current.type._id == currentType &&
				current.entite._id == currentEntite
			)
		})
		console.log(current)
		setCurrentView(current)
	}, [data, currentTerritoire, currentPeriode, currentType, currentEntite])
	if (currentView == undefined)
		return (
			<div className="d-flex justify-content-center bg-light">
				<Image
					src={EmptyStyle}
					height={350}
					width={350}
					alt="illustration pour dire qu'il n'y as pas des données "
				/>
			</div>
		);
	else
		return (
			<Pie
				className={className}
				data={state}
				options={{
					title: {
						display: true,
						text: "Average Rainfall per month",
						fontSize: 20
					},
					legend: {
						display: true,
						position: "center"
					}
				}}
			/>
		);
};
export default Chartpie;

