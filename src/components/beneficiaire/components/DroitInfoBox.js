import React from 'react'
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import {RowInfo} from "./RowInfo";

export const DoritInfoBox = ({droit}) => {


    return <Box style={{
        backgroundColor: (droit.lienFamillialLabel == 'Ayant droit') ?'#f3f3f3': '#cbcbcb',
        flex: 1,
        minWidth: '300px',
        margin: '5px',
        padding: '0 25px'}}>

        <h3>{droit.nom} {droit.prenom}</h3>

        ({droit?.id}) {droit.lienFamillialLabel} <br/>
        <Chip label={droit?.status} sx={{color: 'black', margin: '5px'}}/><br/>

        <RowInfo label={'rang et date de Naissance'} value={droit?.dateNaissance} chip={droit?.rangNaissance}/>
        <RowInfo label={'numero Adherent Individuel'} value={droit?.numeroAdherentIndividuel}/>
        <RowInfo label={'date Fermeture Droits'} value={droit?.dateFermetureDroits}/>
        <RowInfo label={'date Ouverture Droits'} value={droit?.dateOuvertureDroits}/>
        <RowInfo label={'date Desactivation Droits'} value={droit?.dateDesactivationDroits}/>
        <RowInfo label={'Grand Regime'} value={droit?.grandRegime}/>
        <RowInfo label={'caisseAffiliation'} value={droit?.caisseAffiliation}/>
        <RowInfo label={'Centre'} value={droit?.centreGestionAmo}/>
    </Box>
}

