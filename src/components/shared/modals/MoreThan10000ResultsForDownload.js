import React, {useEffect, useRef, useState, forwardRef} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MoreThan10000ResultsForDownload({ open, handleMsgClose }) {

  return (
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleMsgClose}
                key={'bottom' + 'right'}>

          <Alert onClose={handleMsgClose} severity={'info'} sx={{bgcolor: '#a5ecf7', color: '#001c41', width: '100%'}}>

              <AlertTitle><b>Information</b></AlertTitle>
              <div style={{padding: '5px 95px 0 0'}}>
                  L’exportation est limitée aux 10.000 premiers éléments.
              </div>
          </Alert>
      </Snackbar>
  );
}
