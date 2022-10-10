import Chip from "@mui/material/Chip";
import React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[5],
        fontSize: 14,
        // minWidth: 225,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
}));

const tip = (value, label) => {
    if (value?.length > 1 ) {
        return ( <div>
            <LightTooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{margin: '5px'}}><b>{`${label?.charAt(0)?.toUpperCase()}${label?.slice(1)?.toLowerCase()}`}</b></h3>
                    <div style={{minWidth: '135px', paddingLeft: '5px'}}> {value?.join(' \n') || ''} </div>
                </div>
            </div>} placement="top" arrow>

                <Chip label={value?.length}/>

            </LightTooltip>{` ${label?.toLowerCase()}`}
        </div> )}
    return value
}


export const columns = nomRefs => [
    { field: 'id', headerName: 'N°', flex: 1, maxWidth: 25, renderCell: (params) => {
        return (params.value);
    }},

    { field: 'environmentSet', headerName: 'Environnement', flex: 2, renderCell: (params) => {
        return tip(params.value, 'Environnement')
    }},

    { field: 'provenanceSet', headerName: 'Provenance', flex: 1,renderCell: (params) => {
        return (params.value?.join(', '));
    }},

    { field: 'disciplineSet', headerName: 'Discipline', flex: 1, renderCell: (params) => {
        return (params.value?.join(', '));
    }},

    { field: 'factureContexts', headerName: 'Contexte de la facture', flex: 1, renderCell: (params) => {
        return (params.value?.join(', '));
    }},

    { field: 'canalReceptionSet', headerName: 'Canal de réception', flex: 1, renderCell: (params) => {
            return (params.value?.join(', '));
    }},

    { field: 'dcsSet', headerName: 'Domaines d\'activités', flex: 1, renderCell: (params) => {
        let dcs = []
        params.value?.forEach((e)=>dcs.push(nomRefs.DCS[e] || e))
        return (dcs?.join(', ') || params.value);
    }},

    { field: 'type', headerName: 'Type de règle', width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return (params.value);
    }},
];

