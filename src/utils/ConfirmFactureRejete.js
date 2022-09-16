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
		>
			<DialogTitle id="alert-dialog-title" sx={{background: '#f5f8fd', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Typography variant="h5" noWrap component="div"><b>Confirmer le rejet</b></Typography><CancelIcon style={{width: 40, height: 40,color: '#003154'}}/>
			</DialogTitle>

			<DialogContent sx={{background: '#f5f8fd'}}>
				<Select
					onChange={handleMotifChange}
					value={motif}
					input={<OutlinedInput className="RoundedEl" label="Motif de rejet" sx={{minWidth: 200}}/>}
					id="motif">
					{Object.keys(nomRefs.FACTURE_ERROR).map(code => (<MenuItem key={code} value={code}>
						{nomRefs.FACTURE_ERROR[code]}
					</MenuItem>))}
				</Select>

				<TextField
					id="comment"
					variant="outlined"
					placeholder={'Commentaire'}
					onChange={handleCommentChange}
					className="RoundedEl"
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={agreed} autoFocus className="RoundedEmptyButt" >
					Canceller
				</Button>
				<Button onClick={disagreed} className="RoundedEl" >
					Rejeter
				</Button>
			</DialogActions>
		</Dialog>
	);
}
