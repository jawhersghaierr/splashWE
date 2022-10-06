import React, {useEffect, useRef, useState, forwardRef} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MoreThan200Results({ isSuccess, data, isError, error }) {
    const [openMsg, setOpenMsg] = useState({
        open: false,
        success: null,
        error: null,
        data: null,
    })
    const handleMsgClose = () => {
        setOpenMsg({...openMsg, open: false})
    };

    useEffect(() => {
        if (isSuccess && data && data.moreExist) setOpenMsg({success: true, open: true, data: 'La recherche est limitee aux 200 premiers éléments, merci d\'affiner votre recherche.'});
        if (isError) setOpenMsg({success: false, open: true, error: error?.data?.error || 'Quelque chose s\'est mal passé!'});
    }, [data, isSuccess, isError, error]);


  return (
      <Snackbar open={openMsg.open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleMsgClose}

                key={'bottom' + 'right'}>

          <Alert onClose={handleMsgClose}
                 severity={(openMsg.success)? 'info': 'error'}
                 sx={(openMsg.success)? {bgcolor: '#a5ecf7', color: '#001c41', width: '100%'} : {width: '100%'} }>

              {openMsg.success && <AlertTitle><b>Information</b></AlertTitle>}
              {openMsg.success && <div style={{padding: '5px 95px 0 0'}}>
                  {openMsg.data}
              </div>}
              {!openMsg.success && <AlertTitle><b>Error</b></AlertTitle>}
              {!openMsg.success && <div style={{padding: '5px 95px 0 0'}}>
                  {openMsg.error}
              </div>}

          </Alert>
      </Snackbar>
  );
}
