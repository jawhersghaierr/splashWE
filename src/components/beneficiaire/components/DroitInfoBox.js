import React from 'react'
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import {RowInfo} from "./RowInfo";
import {benefStatuses, convertDate, dateConvertNaissance} from "../utils/utils";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {Link} from "react-router-dom";

export const DoritInfoBox = ({droit}) => {


    return <Box style={{
        backgroundColor: (droit.lienFamillialLabel == 'Ayant droit') ?'#F6F8FC': '#EDF2FA',
        flex: 1,
        minWidth: '300px',
        margin: '5px',
        padding: '0 25px'}}>

        <h3>{droit.nom} {droit.prenom}
            <Link to={`/beneficiaire/${droit.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB', float: 'right'}}/></Link>
        </h3>

        ({droit?.id}) {droit.lienFamillialLabel} <br/>
        <Chip label={benefStatuses[droit?.status]?.label} sx={{bgcolor: benefStatuses[droit?.status]?.color, margin: '5px'}}/>

        <RowInfo label={'Date et rang de naissance'} value={dateConvertNaissance(droit?.dateNaissance)} chip={droit?.rangNaissance}/>
        <RowInfo label={'N° adhérent individuel'} value={droit?.numeroAdherentIndividuel}/>
        <RowInfo label={'Date début droits'} value={convertDate(droit?.dateOuvertureDroits)}/>
        <RowInfo label={'Date fin droits'} value={convertDate(droit?.dateFermetureDroits)}/>
        <RowInfo label={'Date désactivation droits'} value={convertDate(droit?.dateDesactivationDroits)}/>
        <RowInfo label={'Grand régime'} value={droit?.grandRegime}/>
        <RowInfo label={'Caisse'} value={droit?.caisseAffiliation}/>
        <RowInfo label={'Centre'} value={droit?.centreGestionAmo}/>
    </Box>
}

