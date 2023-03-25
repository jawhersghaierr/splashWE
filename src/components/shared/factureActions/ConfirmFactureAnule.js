import * as React from 'react';
import {useEffect, useState} from "react";

import {
	Dialog,
	FormControl,
	Typography,
	Button,
	OutlinedInput,
	Select,
	MenuItem,
	DialogActions,
	DialogContent,
	DialogTitle, TextField, InputLabel
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
// import {apiUrls} from "../../../../env-vars";
import {reshapeMotifVsStatus} from "../../factures/utils/utils";

export const ConfirmFactureAnule = ({opened, close, nomRefs, data, setOpenMsg, reload}) => {

	const [motif, setMotif] = useState('');
	const [comment, setComment] = useState('');
	const [required, setRequired] = useState(null);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleMotifChange = (event) => {
		setMotif(event.target.value);
	};

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	let motifOptions = reshapeMotifVsStatus({status: ['ANNULEE'], nomRefs})

	const confirme = () => {
		if(motif){
			console.log('confirme > ', motif, comment)
			close();

			if (url && data && data?.id) {
				fetch(url,{
					method: 'PATCH',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						"id": data?.id,
						"status": "ANNULEE",
						"motive": comment,
						"errors": [
							{ "code": motif }
						]})
				})
					.then(res => res.json())
					.then(
						(data) => {
							setIsLoaded(true);
							setOpenMsg({success:true, open: true, data: 'Votre facture a été annulée avec succès'});
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
			setRequired('Un motif d\'annulation doit être sélectionné *')
		}
	}

	let url = `http://${window?._env_?.apiUrls?.factures}/factures/status`;

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
					<b>Annuler la facture</b>
				</Typography>
				<CancelIcon style={{width: 30, height: 30,color: '#003154', cursor: 'pointer'}} onClick={close}/>
			</DialogTitle>

			<DialogContent sx={{display: 'flex', flexDirection: 'row'}}>
				<FormControl sx={{flex: 2, margin: '15px', 'label': {top: '-6px !important'},}}>
					<InputLabel id="motif-label">Мotif d'annulation</InputLabel>
					<Select
						onChange={handleMotifChange}
						required={true}
						value={motif}
						input={<OutlinedInput
							className="RoundedEl"
							label="Motif de rejet"
							sx={{minWidth: 200}}/>}
						id="motif">
						{motifOptions.map(option => (<MenuItem key={option.value} value={option.value}>
							{option.title}
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
					Confirmer l'annulation
				</Button>
			</DialogActions>
		</Dialog>
	);
}
