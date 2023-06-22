import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";	

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top"
		},
		title: {
			display: true
		}
	}
};
export const Chart = ({ rapports }) => {
	const [data, setData] = useState({
		labels: [],
		datasets: []
	});	

	useEffect(() => {
		setData({
			labels: rapports.map(
				({ periode, type, territoire, entite }) =>
					periode.name +
					" " +
					type.name +
					" " +
					territoire.name +
					" " +
					entite.name
			),
			datasets: [
				{
					label: "Montant Recu (FC)",
					data: rapports.map(({ fond_alouer }) => +fond_alouer),
					backgroundColor: "#38b0e5"
				},
				{
					label: "Relicat (FC) ",
					data: rapports.map(({ fond_restant }) => +fond_restant),
					backgroundColor: "#F896EF"
				},
				{
					label: "Montant Dépensé (FC)",
					data: rapports.map(({ fond_depenser }) => +fond_depenser),
					backgroundColor: "#7cfabb"
				}
			]
		});
	}, [rapports]);

	if (rapports.length === 0) return <div></div>;
	else return <Bar options={options} data={data} />;
};
