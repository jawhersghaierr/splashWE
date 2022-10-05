import React from 'react'
import Box from "@mui/material/Box";
import {RowInfo} from "./RowInfo";

function separetedMails (data) {
    if (data && data.length > 0) return <span>
        {data.split(';')
            .map( (el, i) =><span key={`to_${i}`} style={{display: 'block'}}>{el}</span>
            )}
    </span>
    return data
}

export const DetailsFactureMailConf = ({data}) => {

    return <Box style={{
        backgroundColor: '#F6F8FC',
        flex: 1,
        minWidth: '300px',
        margin: '5px',
        padding: '10px 25px 25px 25px'
    }}>
        <h3><b>Détails du paramètres</b></h3>
        <RowInfo label={'Objet du email'} value={data?.subject}/>
        <RowInfo label={'Corps du email'} value={data?.body} justify={true}/>
        <RowInfo label={'Expéditeur du email'} value={data?.from}/>
        <RowInfo label={'Destinataire du email'} value={separetedMails(data?.to)}/>

    </Box>
}

