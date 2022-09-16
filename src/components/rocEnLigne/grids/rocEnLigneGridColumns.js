import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {
    dateConvertNaissance,
    convertDate,
    currencyFormatter,
    rocStatus
} from "../../../utils/utils";

export const columns = disciplines => [
    { field: 'dateEntree', headerName: 'Reçu le', flex: 1, sortable: false, renderCell: (params) => {
        return (convertDate(params.value));
    }},
    { field: 'numFact', headerName: 'N° engagement', flex: 1, sortable: false, },
    { field: 'type', headerName: 'Type', flex: 1, renderCell: (params) => {
        return (params.value)
    }},
    { field: 'numeroPs', headerName: 'FINESS géographique', flex: 1, sortable: false, },
    { field: 'dateReception', headerName: 'Date d\'admission', flex: 1, sortable: false, renderCell: (params) => { //dateEntree
        return (convertDate(params.value))
    }},
    { field: 'statut', headerName: 'Statut', flex: 1, sortable: false, renderCell: (params) => {
        return ( <Chip label={`${rocStatus[params?.value?.code]?.label}`} sx={{color: 'black', bgcolor: rocStatus[params?.value?.code]?.color}}/> )
    }},
    { field: 'numClient', headerName: 'AMC', flex: 1, sortable: false},
    { field: 'numAdh', headerName: 'N° adhérent', flex: 1, sortable: false},
    { field: 'nom', headerName: 'Nom et date de naissance bénéficiaire', flex: 1, minWidth: '200px', sortable: false, renderCell: (params) => {
        return <span><b>{params.row.nom}</b>&nbsp;{params.row.prenom}<br/>{dateConvertNaissance(params.row.dateNaiss)}</span>
    }},
    { field: 'montantRc', headerName: 'Montant RC', type: 'number', flex: 1, sortable: false, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue' },
    { field: 'id', headerName: '',flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return <Link to={`/serviceEnLigne/${params?.value}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];
