import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {facturesStatus} from "../../../utils/status-utils";
import {dateConvertNaissance, convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";


export const columns = () => [
    { field: 'receivedDate', headerName: 'Reçu le', flex: 1, sortable: false, renderCell, valueGetter: (params) => (convertDate(params.value)) },
    { field: 'numFact', headerName: 'N° facture', hideable: false, flex: 1, renderCell },
    { field: 'domaine', headerName: 'Domaine', flex: 1, renderCell },
    { field: 'numId', headerName: 'FINESS géographique', flex: 1, renderCell },
    { field: 'dateEntree', headerName: 'Date d\'admission', flex: 1, renderCell, valueGetter: (params) => (convertDate(params.value)) },
    { field: 'status', headerName: 'Statut', flex: 1, renderCell, valueGetter: (params) => ( <Chip label={`${facturesStatus[params.value]?.label}`} sx={{color: 'black', bgcolor: facturesStatus[params.value]?.color}}/> ) },
    { field: 'numClient', headerName: 'AMC', flex: 1, renderCell },
    { field: 'numAdh', headerName: 'N° adhérent', flex: 1, renderCell },
    { field: 'nom', headerName: 'Nom et date de naissance bénéficiaire', flex: 1, minWidth: '200px', renderCell, valueGetter: (params) => (<span><b>{params.row.nom}</b>&nbsp;{params.row.prenom}<br/>{dateConvertNaissance(params.row.dateNai)}</span>) },
    { field: 'rc', headerName: 'Montant Rc', type: 'number', flex: 1, sortable: false, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue' },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: (params) => (<Link to={`/factures/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>) },
];

export const reverseMapFacturation = {
    receivedDate: 'Reçu le',
    numFact: 'N° facture',
    domaine: 'Domaine',
    numId: 'FINESS géographique',
    dateEntree: 'Date d\'admission',
    status: 'Statut',
    numClient: 'AMC',
    numAdh: 'N° adhérent',
    nom: 'Nom et date de naissance bénéficiaire', // prenom, dateNai
    prenom: 'Nom et date de naissance bénéficiaire', // prenom, dateNai
    dateNai: 'Nom et date de naissance bénéficiaire', // prenom, dateNai
    rc: 'Montant Rc',
}
