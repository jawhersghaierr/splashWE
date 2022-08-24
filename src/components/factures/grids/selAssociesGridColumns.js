import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";


export const columns = disciplines => [
    { field: 'type', headerName: 'Type', flex: 1, sortable: false, renderCell: (params) => {
            // console.log(params)
            // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
            return (params.value);
        }},
    { field: 'domaine', headerName: 'Domaine', flex: 1, renderCell: (params) => {
            return (params.value)
        }},

    { field: 'dateAdmission', headerName: 'Date d\'admission', flex: 1, renderCell: (params) => { //dateEntree
            return (params.value)
        }},
    { field: 'statut', headerName: 'Statut', flex: 1, renderCell: (params) => {
            return (
                <Chip label={`${params.value}`}
                      sx={{color: 'black'}}/>
            )}},

    { field: 'beneficiaryName', headerName: 'Nom et date de naissance beneficiaire', flex: 1, renderCell: (params) => {
            return <b>{params.value}</b>
            // return <span><b>{params.row.nom}</b>{params.row.prenom}<br/>{params.row.dateNai}</span>
        }},

    { field: 'id', headerName: '', flex: 1, renderCell: (params) => {
            return <Link to={`/factures/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
        }},
];

