import React from 'react'
import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";

export const RowInfo = ({value, label, chip = null, justify=false, border=false}) => {

    return <div style={border? { flex: 1, minWidth: '200px', maxWidth: '100%', margin: '15px 0', borderBottom: '1px solid #EDF2FA' }:
        { flex: 1, minWidth: '200px', maxWidth: '100%', margin: '15px 0'}}>

        <Typography variant="subtitle1" noWrap component="div" sx={(justify)?
            { color: '#003154', padding: '5px 0', display: 'flex', whiteSpace: 'break-spaces', justifyContent: 'space-between'}:
            { color: '#003154', padding: '5px 0', display: 'flex', whiteSpace: 'break-spaces' }}>

            <span>{label}&nbsp;:&nbsp;</span>
            <b>{value}&nbsp;{chip && <Chip label={chip} sx={{margin: '0 5px 0 0'}}/>}</b>
        </Typography>
    </div>
}

