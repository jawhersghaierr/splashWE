import * as React from 'react';
import {
	Dialog,
	Typography,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle
}  from "@mui/material";
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

export const ConfirmFactureAnule = ({opened, agreed, disagreed}) => {

	return (
		<Dialog
			open={opened}
			// onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" sx={{background: '#ffd4ad'}}>
				<Typography variant="h5" noWrap component="div"><b><ErrorOutlineOutlinedIcon/>Attention</b></Typography>
				{"La Anule?"}
			</DialogTitle>
			<DialogContent>
			</DialogContent>
			<DialogActions>
				<Button onClick={disagreed} autoFocus className="RoundedEmptyButt" >
					Non
				</Button>
				<Button onClick={agreed} className="RoundedEl" >
					Oui
				</Button>
			</DialogActions>
		</Dialog>
	);
}
