import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, dateConvertNaissance, currencyFormatter, facturesStatus} from "../utils/utils";

export const columns = disciplines => [
    { field: 'receivedDate', headerName: 'Recu le', flex: 1, sortable: false, renderCell: (params) => {
        return (convertDate(params.value));
    }},
    { field: 'numFact', headerName: '№ engagement', flex: 1 },
    { field: 'domaine', headerName: 'Domaine', flex: 1, renderCell: (params) => {
        return (params.value)
    }},
    { field: 'numId', headerName: 'FINNES geographique', flex: 1 },// numId
    { field: 'dateEntree', headerName: 'Date d\'admission', flex: 1, renderCell: (params) => { //dateEntree
        return (convertDate(params.value))
    }},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
        return (
            <Chip label={`${facturesStatus[params.value]?.label}`}
                  sx={{color: 'black', bgcolor: facturesStatus[params.value]?.color}}/>
    )}},
    { field: 'numClient', headerName: 'AMC', flex: 1},
    { field: 'numAdh', headerName: '№ adherent', flex: 1},
    { field: 'nom', headerName: 'Nom et date de naissance beneficiaire', flex: 1, minWidth: '200px', renderCell: (params) => {
        return <span><b>{params.row.nom}</b>&nbsp;{params.row.prenom}<br/>{dateConvertNaissance(params.row.dateNai)}</span>
    }},
    { field: 'rc', headerName: 'Montant Rc', type: 'number', flex: 1,valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue' },
    { field: 'id', headerName: '', flex: 1, renderCell: (params) => {
            return <Link to={`/factures/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

