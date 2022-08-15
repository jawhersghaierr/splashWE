import React from 'react'
import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";

export const RowInfo = ({value, label, chip = null}) => {

    return <div style={{
        flex: 1,
        minWidth: '200px',
        maxWidth: '100%',
        margin: '15px 0',
        borderBottom: '1px solid #EDF2FA'
        }}>

        <Typography variant="subtitle1" noWrap component="div" sx={{
            color: '#003154',
            padding: '5px 0',
            display: 'flex',
            justifyContent: 'space-between'}}>

            <span>{label}&nbsp;:&nbsp;</span>
            <b>{chip && <Chip label={chip} sx={{margin: '0 5px 0 0'}}/>}{value}</b>
        </Typography>
    </div>
}

