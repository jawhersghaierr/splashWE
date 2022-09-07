import * as React from 'react';
import {
	Dialog,
	Typography,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
}  from "@mui/material";


export const ConfirmNir = ({opened, agreed, disagreed}) => {

	return (
		<Dialog
			open={opened}
			// onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" sx={{background: '#ffa3a3'}}>
				<Typography variant="h5" noWrap component="div"><b>Attention</b></Typography>
				{"La recherche par NIR doit être utilisée en dernier recours, si l'objet recherché n'a pas été trouvé par d'autres critères. Confirmez-vous vouloir rechercher par NIR?"}
			</DialogTitle>
			<DialogContent>
			</DialogContent>
			<DialogActions>
				<Button onClick={agreed} autoFocus className="RoundedEmptyButt" >
					Oui
				</Button>
				<Button onClick={disagreed} className="RoundedEl" >
					Non
				</Button>
			</DialogActions>
		</Dialog>
	);
}
