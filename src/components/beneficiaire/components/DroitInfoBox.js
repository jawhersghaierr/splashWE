import React from 'react'
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import {RowInfo} from "./RowInfo";
import {benefStatuses, convertDate, dateConvertNaissance} from "../utils/utils";

export const DoritInfoBox = ({droit}) => {


    return <Box style={{
        backgroundColor: (droit.lienFamillialLabel == 'Ayant droit') ?'#F6F8FC': '#EDF2FA',
        flex: 1,
        minWidth: '300px',
        margin: '5px',
        padding: '0 25px'}}>

        <h3>{droit.nom} {droit.prenom}</h3>

        ({droit?.id}) {droit.lienFamillialLabel} <br/>
        <Chip label={benefStatuses[droit?.status]?.label} sx={{bgcolor: benefStatuses[droit?.status]?.color, margin: '5px'}}/>

        <RowInfo label={'rang et date de Naissance'} value={dateConvertNaissance(droit?.dateNaissance)} chip={droit?.rangNaissance}/>
        <RowInfo label={'numero Adherent Individuel'} value={droit?.numeroAdherentIndividuel}/>
        <RowInfo label={'date Fermeture Droits'} value={convertDate(droit?.dateFermetureDroits)}/>
        <RowInfo label={'date Ouverture Droits'} value={convertDate(droit?.dateOuvertureDroits)}/>
        <RowInfo label={'date Desactivation Droits'} value={convertDate(droit?.dateDesactivationDroits)}/>
        <RowInfo label={'Grand Regime'} value={droit?.grandRegime}/>
        <RowInfo label={'caisseAffiliation'} value={droit?.caisseAffiliation}/>
        <RowInfo label={'Centre'} value={droit?.centreGestionAmo}/>
    </Box>
}

