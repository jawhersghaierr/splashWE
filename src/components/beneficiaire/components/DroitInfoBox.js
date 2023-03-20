import React from 'react'
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {Link} from "react-router-dom";
import {RowInfo} from "./RowInfo";
import {benefStatuses } from "../../../utils/status-utils";
import {dateConvertNaissanceRAW, convertDate} from "../../../utils/convertor-utils";

export const DroitInfoBox = ({droit}) => {
    return <Box style={{
        backgroundColor: (droit.lienFamillialLabel == 'Ayant droit') ?'#F6F8FC': '#EDF2FA',
        flex: 1,
        minWidth: '300px',
        margin: '5px',
        padding: '0 25px'}}>

        <h3>{droit.nom} {droit.prenom}
            <Link to={`/beneficiaire/${droit.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB', float: 'right'}}/></Link>
        </h3>

        {droit.lienFamillialLabel} <br/>
        <Chip label={benefStatuses[droit?.status]?.label} sx={{bgcolor: benefStatuses[droit?.status]?.color, margin: '5px'}}/>

        <RowInfo label={'Date et rang de naissance'} value={dateConvertNaissanceRAW(droit?.dateNaissance)} chip={droit?.rangNaissance} 
            id={droit.id} field="dateNaissance_rangNaissance" />
        <RowInfo label={'N° adhérent individuel'} value={droit?.numeroAdherentIndividuel} id={droit.id} field="numeroAdherentIndividuel" />
        <RowInfo label={'Date début droits'} value={convertDate(droit?.dateOuvertureDroits)} id={droit.id} field="dateOuvertureDroits" />
        <RowInfo label={'Date fin droits'} value={convertDate(droit?.dateFermetureDroits)} id={droit.id} field="dateFermetureDroits" />
        <RowInfo label={'Date désactivation droits'} value={convertDate(droit?.dateDesactivationDroits)} id={droit.id} field="dateDesactivationDroits" />
        <RowInfo label={'Grand régime'} value={droit?.codeGrandRegime} id={droit.id} field="codeGrandRegime" />
        <RowInfo label={'Caisse'} value={droit?.caisseAffiliation} id={droit.id} field="caisseAffiliation" />
        <RowInfo label={'Centre gestion AMO'} value={droit?.centreGestionAmo} id={droit.id} field="centreGestionAmo" />
    </Box>
}

