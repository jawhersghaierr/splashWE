import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {rocStatus} from "../../../utils/status-utils";
import {dateConvertNaissance, convertDate, currencyFormatter} from "../../../utils/convertor-utils";

export const columns = ({nomRefs}) => [
    { field: 'dateReception', headerName: 'Reçu le', flex: 1, sortable: false, renderCell: (params) => {
        return (convertDate(params.value, true));
    }},
    { field: 'numeroEngagement', headerName: 'N° engagement', flex: 1, sortable: false, },
    { field: 'type', headerName: 'Type', flex: 1, sortable: false, renderCell: (params) => {
        // return (params.value)
        return (nomRefs && nomRefs?.ROC_TYPES[params.value] || params.value)
    }},
    { field: 'domaine', headerName: 'Domaine', flex: 1, sortable: false, renderCell: (params) => {
        return (nomRefs && nomRefs?.ROC_DOMAINS[params.value] || params.value)
    }},
    { field: 'numeroPs', headerName: 'FINESS géographique', flex: 1, sortable: false, },
    { field: 'dateEntree', headerName: 'Date d\'admission', flex: 1, sortable: false, renderCell: (params) => { //dateEntree
        return (convertDate(params.value))
    }},
    { field: 'statut', headerName: 'Statut', flex: 1, sortable: false, renderCell: (params) => {
        return ( <Chip label={`${rocStatus[params?.value]?.label}`} sx={{color: 'black', bgcolor: rocStatus[params?.value]?.color}}/> )
    }},
    { field: 'amc', headerName: 'AMC', flex: 1, sortable: false},
    { field: 'numeroAdherant', headerName: 'N° adhérent', flex: 1, sortable: false},
    { field: 'nom', headerName: 'Nom et date de naissance bénéficiaire', flex: 1, minWidth: '200px', sortable: false, renderCell: (params) => {
        return <span><b>{params.row.nom}</b>&nbsp;{params.row.prenom}<br/>{dateConvertNaissance(params.row.dateNaiss)}</span>
    }},
    { field: 'montantRc', headerName: 'Montant RC', type: 'number', flex: 1, sortable: false, valueFormatter: ({ value }) => currencyFormatter.format(value || 0), cellClassName: 'boldValue' },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell: (params) => {
        return <Link to={`/serviceEnLigne/${params?.value}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

export const reverseMapRocEnLigne = {
    dateReception: 'Reçu le',
    numeroEngagement: 'N° engagement',
    type: 'Type',
    domaine: 'Domaine',
    numeroPs: 'FINESS géographique',
    dateEntree: 'Date d\'admission',
    statut: 'Statut',
    amc: 'AMC',
    numeroAdherant: 'N° adhérent',
    nom: 'Nom et date de naissance bénéficiaire',
    prenom: 'Nom et date de naissance bénéficiaire',
    dateNaiss: 'Nom et date de naissance bénéficiaire',
    montantRc: 'Montant RC'
}
