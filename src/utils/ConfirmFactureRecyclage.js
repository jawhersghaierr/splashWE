import * as React from 'react';
import {
	Dialog,
	Typography,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle
}  from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const ConfirmFactureRecyclage = ({opened, agreed, disagreed}) => {

	return (
		<Dialog
			open={opened}
			// onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" sx={{background: '#ffd4ad'}}>
				<Typography variant="h5" noWrap component="div"><b><ErrorOutlineOutlinedIcon/>Attention</b></Typography>
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
