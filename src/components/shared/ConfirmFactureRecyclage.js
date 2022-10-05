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
			maxWidth={'sm'} fullWidth={true}
		>
			<DialogTitle id="alert-dialog-title" sx={{background: '#ffd4ad'}}>
				<Typography variant="h5" noWrap component="div" sx={{margin: '10px'}}>
					<ErrorOutlineOutlinedIcon sx={{verticalAlign: 'top', width: 30, height: 30, margin: '0 5px'}}/>
					<b>Attention</b>
				</Typography>
				<div style={{margin: '0 50px 15px'}}>{'Confirmez-vous le recylage?'}</div>
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
