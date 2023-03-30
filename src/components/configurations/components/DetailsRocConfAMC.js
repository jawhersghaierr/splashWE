import React from 'lib_ui/react'
import Box from "@mui/material/Box";
import {RowInfo} from "./RowInfo";
import {
    convertDate,
} from "shared_lib_ui/Lib";

export const DetailsRocConfAMC = ({data}) => {

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Ouverture ROC</b>
            <RowInfo label={'Date début'} value={convertDate(data?.dateDebutAmc)} justify={true} id={data?.id} field="startDateAmc" />
            <RowInfo label={'Date fin'} value={convertDate(data?.dateFinAmc)} justify={true} id={data?.id} field="endDateAmc" />
        </Box>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Données de contact ROC</b>
            <RowInfo label={'E-mail'} value={data?.email} justify={true} id={data?.id} field="email" />
            <RowInfo label={'Téléphone'} value={data?.telephone} justify={true} id={data?.id} field="telephone" />
        </Box>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', padding: '10px 25px 25px 25px'
        }}>
            <b>Débiteur</b>
            <RowInfo label={'Débiteur'} value={data?.debiteur} justify={true} id={data?.id} field="debiteur" />
        </Box>

    </div>
}

