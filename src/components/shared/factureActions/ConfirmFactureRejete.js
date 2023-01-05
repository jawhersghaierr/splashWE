import * as React from 'react';
import {
	Dialog,
	Typography,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle, TextField
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {useEffect, useState} from "react";
import {reshapeMotifVsStatus} from "../../factures/utils/utils";
import {apiUrls} from "../../../../env-vars";

export const ConfirmFactureRejete = ({opened, close, nomRefs, data, setOpenMsg, reload}) => {

	const [motif, setMotif] = React.useState('');
	const [comment, setComment] = React.useState('');
	const [required, setRequired] = useState(null);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleMotifChange = (event) => {
		setMotif(event.target.value);
	};

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	let motifOptions = reshapeMotifVsStatus({status: ['REJETEE'], nomRefs})

	const confirme = () => {
		if(motif){
			console.log('confirme > ', motif, comment)
			close()
			if (url && data && data?.id) {
				fetch(url,{
					method: 'PATCH',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						"id": data?.id,
						"status": "REJETEE",
						"motive": comment,
						"errors": [
							{ "code": motif }
						]})
				})
					.then(res => res.json())
					.then(
						(data) => {
							setIsLoaded(true);
							setOpenMsg({success:true, open: true, data: 'Votre facture a été rejetée avec succès'});
							reload()
						},
						(error) => {
							setIsLoaded(true);
							console.log('error > ', error)
							setOpenMsg({success: false, open: true, error: 'failed'});
							setError(error);
						}
					)
			}

		} else {
			setRequired('Un motif de rejet doit être sélectionné *')
		}
	}

	let url = `http://${apiUrls.factures}/factures/status`;

	useEffect(() => {
		if (motif) setRequired(null)
	}, [motif])

	return (
		<Dialog
			open={opened}
			// onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth={'md'} fullWidth={true}>
			<DialogTitle id="alert-dialog-title" sx={{background: '#f5f8fd', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Typography variant="h5" noWrap component="div">
					<b>Rejeter la facture</b>
				</Typography>
				<CancelIcon style={{width: 30, height: 30,color: '#003154', cursor: 'pointer'}} onClick={close}/>
			</DialogTitle>

			<DialogContent sx={{display: 'flex', flexDirection: 'row'}}>
				<FormControl sx={{flex: 2, margin: '15px', 'label': {top: '-6px !important'},}}>
					<InputLabel id="motif-label">Motif de rejet</InputLabel>
					<Select
						onChange={handleMotifChange}
						label={'tamararam'}
						required={true}
						value={motif}
						input={<OutlinedInput className="RoundedEl" label="Motif de rejet" sx={{minWidth: 200}}/>}
						id="motif">
						{Object.keys(motifOptions).map(code => (<MenuItem key={code} value={code}>
							{motifOptions[code]}
						</MenuItem>))}
					</Select>
					<span style={{padding: '0 10px'}}>{required || ''}</span>
				</FormControl>

				<FormControl sx={{flex: 2, margin: '15px'}}>
					<TextField
						id="comment"
						variant="outlined"
						label={'Commentaire'}
						onChange={handleCommentChange}
						className="RoundedEl"
					/>
				</FormControl>
			</DialogContent>

			<DialogActions>
				<Button onClick={close} autoFocus className="RoundedEmptyButt" >
					Annuler
				</Button>
				<Button onClick={confirme} className="RoundedEl" >
					Confirmer le rejet
				</Button>
			</DialogActions>
		</Dialog>
	);
}
