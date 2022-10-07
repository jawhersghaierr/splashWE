import * as React from 'react';
import {
	Dialog,
	Typography,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle, CircularProgress
} from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {env_IP, ports} from "../../../env-vars";
import {useState} from "react";

export const ConfirmFactureRecyclage = ({data, opened, setOpenMsg, close}) => {

	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(false);


	const confirme = () => {

		if (data?.id) {
			let url = `http://${env_IP}:${ports.factures}/api/v1/factures/${data?.id}/resend`;
			setIsFetching(true)
			fetch(url,{
				method: 'POST',
				headers: {"Content-Type": "application/json"},
			})
				.then(res => res)
				.then(
					(data) => {
						setIsFetching(false);
						setOpenMsg({success:true, open: true, data: 'Votre facture a été recyclée avec succès'});
						close()
					},
					(error) => {
						setIsFetching(false);
						console.log('error > ', error)
						setError(error);
						setOpenMsg({success: false, open: true, error: 'failed'});
						close()
					}
				)
		}
	}

	return (
		<Dialog
			open={opened}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth={'sm'} fullWidth={true}>

			<DialogTitle id="alert-dialog-title" sx={{background: '#ffd4ad'}}>
				<Typography variant="h5" noWrap component="div" sx={{margin: '10px'}}>
					<ErrorOutlineOutlinedIcon sx={{verticalAlign: 'top', width: 30, height: 30, margin: '0 5px'}}/>
					<b>Attention</b>
				</Typography>
				<div style={{margin: '0 50px 15px'}}>{'Confirmez-vous le recylage?'}</div>
			</DialogTitle>
			{isFetching && <DialogContent>
				<CircularProgress style={{margin: '50px auto'}}/>
			</DialogContent>}
			{!isFetching && <DialogActions>
				<Button onClick={close} autoFocus className="RoundedEmptyButt">
					Non
				</Button>
				<Button onClick={confirme} className="RoundedEl">
					Oui
				</Button>
			</DialogActions>}
		</Dialog>
	);
}
