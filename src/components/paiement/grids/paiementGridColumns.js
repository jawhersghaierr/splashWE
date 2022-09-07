import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, dateConvertNaissance, currencyFormatter, facturesStatus} from "../../../utils/utils";

export const columns = disciplines => [
    { field: 'numAdhInd', headerName: '№ adhérent Nom et prénom', flex: 3, minWidth: '200px', renderCell: (params) => {
        let nom = params.row.nomPrenom?.split(' ')
            return <span>{params.value}<br/><b>{nom[0]}</b>&nbsp;{nom[1]}</span>
        }},

    { field: 'numeroFacture', headerName: '№ de facturation PS/TS', flex: 2 },
    { field: 'provenance', headerName: 'Provenance', flex: 1 },

    { field: 'creationDate', headerName: 'Date de Virement', flex: 1, sortable: false, renderCell: (params) => {
        return (convertDate(params.value));
    }},
    { field: 'dateFacture', headerName: 'Date de Facture', flex: 1, sortable: false, renderCell: (params) => {
        return (convertDate(params.value));
    }},

    { field: 'numIdPs', headerName: '№ Facture / №  Titre', flex: 2 },
    { field: 'factureStatus', headerName: 'Statut Facture', flex: 1, renderCell: (params) => {
            return (
                <Chip label={params.value} sx={{color: 'black'}}/>
            )}},

    { field: 'status', headerName: 'Statut Virement', flex: 1, renderCell: (params) => {
            return (
                <Chip label={params.value} sx={{color: 'black'}}/>
            )}},

    { field: 'totalRc', headerName: 'RC PAiement', type: 'number', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},

    { field: 'id', headerName: '', flex: 1, renderCell: (params) => {
            return <Link to={`/paiement/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

