import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {paiementsStatus, facturesStatus} from "../../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";

export const columns = disciplines => [
    { field: 'numeroAdherentIndividuel', headerName: 'N° adhérent Nom et prénom', sortable: false, flex: 3, minWidth: '200px', renderCell, valueGetter: ({row, value}) => {
        let nom = row?.nomPrenom?.split(' ')
        return <span>{value}<br/><b>{nom[0]}</b>&nbsp;{nom[1]}</span>
    }},
    { field: 'numeroPartenaire', headerName: 'N° de facturation PS / TC', flex: 2, renderCell },
    { field: 'provenance', headerName: 'Provenance', flex: 1, renderCell },
    { field: 'dateCreation', headerName: 'Date de paiement', flex: 1, renderCell, valueGetter: ({value}) => (convertDate(value)) },
    { field: 'dateFacture', headerName: 'Date de facture', flex: 1, renderCell, valueGetter: ({value}) => (convertDate(value)) },
    { field: 'numeroFacture', headerName: 'N° facture / titre', flex: 2, renderCell },
    { field: 'factureStatus', headerName: 'Statut facture', flex: 1, renderCell, valueGetter: ({value}) => (<Chip label={facturesStatus[value]?.label} sx={{color: 'black', bgcolor: facturesStatus[value]?.color}}/>) },
    { field: 'status', headerName: 'Statut paiement', flex: 1, renderCell, valueGetter: ({value}) => ( <Chip label={paiementsStatus[value]?.label} sx={{color: 'black', bgcolor: paiementsStatus[value]?.color}}/>) },
    { field: 'totalRc', headerName: 'RC paiement', type: 'number', flex: 1, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => (<Link to={`/paiement/${row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>) },
];


export const reverseMapPaiement = {
    numeroAdherentIndividuel: 'N° adhérent Nom et prénom',
    nomPrenom: 'N° adhérent Nom et prénom',
    numeroPartenaire: 'N° de facturation PS / TC',
    provenance: 'Provenance',
    dateCreation: 'Date de paiement',
    dateFacture: 'Date de facture',
    numeroFacture: 'N° facture / titre',
    factureStatus: 'Statut facture',
    status: 'Statut paiement',
    totalRc: 'RC paiement',
}
