import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";



export const columns = disciplines => [
    { field: 'receivedDate', headerName: 'Recu le', flex: 1, sortable: false, renderCell: (params) => {
        // console.log(params)
        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        return (params.value);
    }},
    { field: 'numFact', headerName: '№ facture', flex: 1 },
    { field: 'domaine', headerName: 'Domaine', flex: 1, renderCell: (params) => {
        return (params.value)
    }},
    { field: 'numId', headerName: 'FINNES geographique', flex: 1 },// numId
    { field: 'dateEntree', headerName: 'Date d\'admission', flex: 1, renderCell: (params) => { //dateEntree
        return (params.value)
    }},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
        return (
            <Chip label={`${params.value}`}
                  sx={{color: 'black'}}/>
    )}},
    { field: 'numClient', headerName: 'AMC', flex: 1},
    { field: 'numAdh', headerName: '№ adherent', flex: 1},
    { field: 'nom', headerName: 'Nom et date de naissance beneficiaire', flex: 1, renderCell: (params) => {
        return <span><b>{params.row.nom}</b>{params.row.prenom}<br/>{params.row.dateNai}</span>
    }},
    { field: 'rc', headerName: 'Montant Rc', flex: 1, renderCell: (params) => {
            return <b>{params.value} €</b>
    }},
    { field: 'id', headerName: '', flex: 1, renderCell: (params) => {
            return <Link to={`/factures/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];
