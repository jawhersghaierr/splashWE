import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {rocStatus} from "../../../utils/status-utils";
import {dateConvertNaissance, convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";

export const columns = ({nomRefs}) => [
    { field: 'dateReception', headerName: 'Reçu le', flex: 1, sortable: false, renderCell, valueGetter: ({value}) => (convertDate(value, true)) },
    { field: 'numeroEngagement', headerName: 'N° engagement', flex: 1, sortable: false, renderCell },
    { field: 'type', headerName: 'Type', flex: 1, sortable: false, renderCell, valueGetter: ({value}) => (nomRefs && nomRefs?.ROC_TYPES[value] || value) },
    { field: 'domaine', headerName: 'Domaine', flex: 1, sortable: false, renderCell, valueGetter: ({value}) => (nomRefs && nomRefs?.ROC_DOMAINS[value] || value) },
    { field: 'numeroPs', headerName: 'FINESS géographique', flex: 1, sortable: false, renderCell },
    { field: 'dateEntree', headerName: 'Date d\'admission', flex: 1, sortable: false, renderCell, valueGetter: ({value}) => (convertDate(value)) },
    { field: 'statut', headerName: 'Statut', flex: 1, sortable: false, renderCell, valueGetter: ({value}) => ( <Chip label={`${rocStatus[value]?.label}`} sx={{color: 'black', bgcolor: rocStatus[value]?.color}}/> ) },
    { field: 'amc', headerName: 'AMC', flex: 1, sortable: false, renderCell },
    { field: 'numeroAdherant', headerName: 'N° adhérent', flex: 1, sortable: false},
    { field: 'nom', headerName: 'Nom et date de naissance bénéficiaire', flex: 1, minWidth: '200px', sortable: false, renderCell, valueGetter: ({row}) => (<span><b>{row?.nom}</b>&nbsp;{row?.prenom}<br/>{dateConvertNaissance(row?.dateNaiss)}</span>) },
    { field: 'montantRc', headerName: 'Montant RC', type: 'number', flex: 1, sortable: false, renderCell, valueGetter: ({ value }) => (value !== undefined) && currencyFormatter.format(value), cellClassName: 'boldValue' },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({value}) => (<Link to={`/serviceEnLigne/${value}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>) },
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
