import React, {forwardRef} from 'react'
import AlertTitle from "@mui/material/AlertTitle";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const NoGridResultsAlert = () => {

	return (
		<Alert severity={'info'} sx={{ bgcolor: '#a5ecf7', color: '#001c41', boxShadow: 0 }}>
			<AlertTitle sx={{margin: 0}}>Il n'y a pas d'éléments associés trouvés</AlertTitle>
		</Alert>
	);
}
