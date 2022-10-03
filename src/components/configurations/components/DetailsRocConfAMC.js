import React from 'react'
import Box from "@mui/material/Box";
import {RowInfo} from "../../beneficiaire/components/RowInfo";
import {convertDate} from "../../../utils/utils";

export const DetailsRocConfAMC = ({data}) => {

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Ouverture ROC</b>
            <RowInfo label={'Date début'} value={convertDate(data?.startDateAmc)} justify={true}/>
            <RowInfo label={'Date fin'} value={convertDate(data?.endDateAmc)} justify={true}/>
        </Box>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Données de contact ROC</b>
            <RowInfo label={'E-mail'} value={data?.email} justify={true}/>
            <RowInfo label={'Téléphone'} value={data?.telephone} justify={true}/>
        </Box>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', padding: '10px 25px 25px 25px'
        }}>
            <b>Débiteur</b>
            <RowInfo label={'Débiteur'} value={data?.debiteur} justify={true}/>
        </Box>

    </div>
}

