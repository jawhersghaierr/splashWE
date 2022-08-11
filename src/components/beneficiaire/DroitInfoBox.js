import React from 'react'
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export const DoritInfoBox = ({droit}) => {


    return <Box style={{
        backgroundColor: (droit.lienFamillialLabel == 'Ayant droit') ?'#f3f3f3': '#cbcbcb',
        flex: 1,
        minWidth: '300px',
        margin: '5px',
        padding: '0 25px'}}>

        {droit.id}<br/>
        <h3>{droit.nom} {droit.prenom}</h3>
        {droit.lienFamillialLabel}<br/>
        <Chip label={droit?.status} sx={{color: 'black', margin: '5px'}}/><br/>
        rang et date de Naissance: {droit.rangNaissance} {droit.dateNaissance}<br/>
        numero Adherent Individuel: {droit.numeroAdherentIndividuel} <br/>
        date Fermeture Droits: {droit.dateFermetureDroits} <br/>
        date Ouverture Droits: {droit.dateOuvertureDroits} <br/>
        date Desactivation Droits: {droit.dateDesactivationDroits} <br/>
        grand Regime: {droit.grandRegime} <br/>
        caisseAffiliation: {droit.caisseAffiliation} Centre: {droit.centreGestionAmo}<br/>
    </Box>
}

