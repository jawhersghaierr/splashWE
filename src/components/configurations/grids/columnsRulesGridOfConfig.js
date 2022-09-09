import Chip from "@mui/material/Chip";
import React from "react";

export const columns = disciplines => [
    { field: 'id', headerName: 'N°', flex: 1, maxWidth: 25, renderCell: (params) => {
        return (params.value);
    }},

    { field: 'enviroment', headerName: 'Environnement', flex: 2, renderCell: (params) => {
        return (<>{params.value && <Chip label={`${params.value || ''}`} sx={{color: 'black'}}/>}&nbsp;{params.value}</>);
    }},
    { field: 'provenance', headerName: 'Provenance', flex: 2,renderCell: (params) => {
        return (params.value);
    }},
    { field: 'discipline', headerName: 'Discipline', flex: 3, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'factureContexts', headerName: 'Contexte de la facture', flex: 3, renderCell: (params) => {
        return (params.value.join(', '));
    }},

    { field: 'canal', headerName: 'Canal de réception', flex: 1, renderCell: (params) => {
            return (params.value);
    }},
    { field: 'domain', headerName: 'Domaines d\'activités', flex: 1, renderCell: (params) => {
            return (params.value);
    }},
    { field: 'type', headerName: 'Type de règle', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return (params.value);
    }},
];

