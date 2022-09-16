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
export const ConfirmFactureRejete = ({opened, agreed, disagreed, nomRefs}) => {

	const [motif, setMotif] = React.useState('');
	const [comment, setComment] = React.useState('');

	const handleMotifChange = (event) => {
		setMotif(event.target.value);
	};

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	console.log('comment ', comment)
	console.log('motif ', motif)

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
				<CancelIcon style={{width: 30, height: 30,color: '#003154', cursor: 'pointer'}} onClick={disagreed}/>
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
						{Object.keys(nomRefs.FACTURE_ERROR).map(code => (<MenuItem key={code} value={code}>
							{nomRefs.FACTURE_ERROR[code]}
						</MenuItem>))}
					</Select>
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
				<Button onClick={disagreed} autoFocus className="RoundedEmptyButt" >
					Annuler
				</Button>
				<Button onClick={agreed} className="RoundedEl" >
					Confirmer le rejet
				</Button>
			</DialogActions>
		</Dialog>
	);
}
