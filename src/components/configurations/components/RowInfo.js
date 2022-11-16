import React from 'react'
import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";

export const RowInfo = ({value, label, id, field, chip = null, justify=false, border=false}) => {

    return <div style={border? { display: 'flex', flex: 1, minWidth: '200px', maxWidth: '100%', margin: '15px 0 0 0', borderBottom: '1px solid #EDF2FA', overflowWrap: 'break-word', wordBreak: 'break-all',  }:
        { display: 'flex', flex: 1, minWidth: '200px', maxWidth: '100%', margin: '15px 0 0 0'}}>

        <Typography variant="subtitle1" noWrap component="div" sx={(justify)?
            { color: '#003154', padding: '5px 0', display: 'flex', justifyContent: 'space-between', flex: 1, minWidth: 165 }:
            { color: '#003154', padding: '5px 0', display: 'flex', justifyContent: 'flex-start', flex: 1, minWidth: 165 }}>

            {label}&nbsp;:&nbsp;
        </Typography>
        <span style={{overflowWrap: 'break-word', wordBreak: 'break-all', hyphens: 'manual', flex: 3, margin: '7px 0'}}>
            <b id={field + "_" + id}>{value}&nbsp;</b>
            {chip && <Chip label={chip} sx={{margin: '0 5px 0 0'}}/>}
        </span>
    </div>
}

