import React from 'lib_ui/react'
import { Box } from "@mui/material";
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
        <h3><b>Détail du paramètre</b></h3>
        <RowInfo label={'Objet du email'} value={data?.subject} id={data?.id} field="subject" />
        <RowInfo label={'Corps du email'} value={data?.body} justify={true} id={data?.id} field="body" />
        <RowInfo label={'Expéditeur du email'} value={data?.from} id={data?.id} field="from" />
        <RowInfo label={'Destinataire du email'} value={separetedMails(data?.to)} id={data?.id} field="to" />

    </Box>
}

