import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function BasicPagination({ onClick, pages }) {
	const [current,setCurrent]=React.useState(1)
	return (
		<Stack spacing={2}>
			<Pagination
				hideNextButton
				hidePrevButton
				count={pages}
				shape="rounded"
				color="secondary"
				variant="outlined"
				onChange={({ target: { innerText } }) => {
					onClick({ page: +innerText });
				}}
			/>
		</Stack>
	);
}
