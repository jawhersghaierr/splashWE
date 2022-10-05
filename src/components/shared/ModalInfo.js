import * as React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";


export const ModalInfo = ({openModal, handleModalClose, children = '', modalTitle = 'modal-title'}) => {

	return (
		<Modal
			// hideBackdrop
			open={openModal?.open}
			onClose={handleModalClose}
			aria-labelledby={modalTitle}
			scroll="body"
			disableScrollLock={false}
			// aria-describedby="child-modal-description"
		>
			<Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
				width: '90%',
				height: '90%',
				overflowY: 'scroll',
				bgcolor: 'background.paper',
				boxShadow: 24, pt: 2, px: 4, pb: 3 }}>
				<CancelIcon style={{width: 30, height: 30, color: '#003154', cursor: 'pointer', float: "right"}} onClick={handleModalClose}/>

				{children}
			</Box>
		</Modal>
	);
}
