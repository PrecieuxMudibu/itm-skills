import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import React from "react";
import Image from "next/image";
import EmptyStyle from "../../assets/empty-not-css.svg";

Chart.register(ArcElement);

const ChartpieSalary = ({
	data,
	currentTerritoire,
	currentPeriode,
	currentType,
	currentEntite
}) => {
	const [currentView, setCurrentView] = React.useState(true);
	const [state, setState] = React.useState({
		labels: ["Relicat ", "Montant dépensé"],
		datasets: [
			{
				label: "Rainfall",
				backgroundColor: ["#501890", "#7cfabb"],
				hoverBackgroundColor: ["#4B5000", "#7cfabb"],
				data: [5, 5]
			}
		]
	});
	React.useEffect(() => {
		const current = data.find((item) => {
			if (
				item.territoire._id == currentTerritoire &&
				item.periode._id == currentPeriode &&
				item.type._id == currentType &&
				item.entite._id == currentEntite
			) {
				setState({
					labels: ['Relicat (%)', 'Montant Dépensé (%)'],
					datasets: [
						{
							label: 'Rainfall',
							backgroundColor: ['#F896EF', '#7cfabb'],
							hoverBackgroundColor: ['#502100', '#7aaaaa'],
							data: [
								data.length > 0
									? Math.round((item.fond_restant / item.fond_alouer) * 100)
									: 5,
								data.length > 0
									? Math.round((item.fond_depenser / item.fond_alouer) * 100)
									: 5,
							],
						},
					],
				})
			}
			return (
				item.territoire._id == currentTerritoire &&
				item.periode._id == currentPeriode &&
				item.type._id == currentType &&
				item.entite._id == currentEntite
			)
		})
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
				className=""
				data={state}
				options={{
					title: {
						display: true,
						text: "Average Rainfall per month",
						fontSize: 20
					},
					legend: {
						display: true,
						position: "right"
					}
				}}
			/>
		);
};
export default ChartpieSalary;
