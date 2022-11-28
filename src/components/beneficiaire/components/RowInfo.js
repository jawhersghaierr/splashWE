import React from 'react'
import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";

export const RowInfo = ({value, label, id, field, chip = null, border = true, justify = false, styles = {}}) => {

    return <div style={{
        flex: 1,
        minWidth: '55px',
        maxWidth: '100%',
        margin: '15px 0',
        borderBottom: (border)? '1px solid #EDF2FA': 'none',
        ...styles
        }} >

        <Typography variant="subtitle1" noWrap component="div" sx={{
            color: '#003154',
            padding: '5px 0',
            display: 'flex',
            justifyContent: (justify)? 'space-between': 'space-start'}}>

            {label && <span>{label}&nbsp;:&nbsp;</span>}
            <b id={field + "_" + id}>{value}&nbsp;{chip && <Chip label={chip} sx={{margin: '0 5px 0 0'}}/>}</b>
        </Typography>
    </div>
}

