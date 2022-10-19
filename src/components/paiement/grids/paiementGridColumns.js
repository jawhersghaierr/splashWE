import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {paiementsStatus, facturesStatus} from "../../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";

export const columns = disciplines => [
    { field: 'numAdhInd', headerName: 'N° adhérent Nom et prénom', sortable: false, flex: 3, minWidth: '200px', renderCell: (params) => {
        let nom = params.row.nomPrenom?.split(' ')
            return <span>{params.value}<br/><b>{nom[0]}</b>&nbsp;{nom[1]}</span>
        }},

    { field: 'numIdPs', headerName: 'N° de facturation PS / TC', flex: 2 },

    { field: 'provenance', headerName: 'Provenance', flex: 1 },

    { field: 'creationDate', headerName: 'Date de paiement', flex: 1, renderCell: (params) => {
        return (convertDate(params.value));
    }},
    { field: 'dateFacture', headerName: 'Date de facture', flex: 1, renderCell: (params) => {
        return (convertDate(params.value));
    }},

    { field: 'numeroFacture', headerName: 'N° facture / titre', flex: 2 },
    { field: 'factureStatus', headerName: 'Statut facture', flex: 1, renderCell: (params) => {
            return (
                <Chip label={facturesStatus[params.value]?.label} sx={{color: 'black', bgcolor: facturesStatus[params.value]?.color}}/>
            )}},

    { field: 'status', headerName: 'Statut paiement', flex: 1, renderCell: (params) => {
            return (
                <Chip label={paiementsStatus[params.value]?.label} sx={{color: 'black', bgcolor: paiementsStatus[params.value]?.color}}/>
            )}},

    { field: 'totalRc', headerName: 'RC paiement', type: 'number', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return <Link to={`/paiement/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];


export const reverseMapPaiement = {
    numAdhInd: 'N° adhérent Nom et prénom',
    nomPrenom: 'N° adhérent Nom et prénom',
    numIdPs: 'N° de facturation PS / TC',
    provenance: 'Provenance',
    creationDate: 'Date de paiement',
    dateFacture: 'Date de facture',
    numeroFacture: 'N° facture / titre',
    factureStatus: 'Statut facture',
    status: 'Statut paiement',
    totalRc: 'RC paiement',
}
