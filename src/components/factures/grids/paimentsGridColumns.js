import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";



export const columns = disciplines => [
    { field: 'dateEntree', headerName: 'Date et heure de reception', minWidth: '150px', flex: 3, renderCell: (params) => { //dateEntree
            return (params.value)
        }},
    { field: 'type', headerName: 'Type', flex: 1},
    { field: 'numero', headerName: '№ Numero', flex: 1},

    { field: 'montant', headerName: 'Montant', flex: 1, renderCell: (params) => {
            return <b>{params.value} €</b>
        }},

    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
            return (
                <Chip label={`${params.value}`}
                      sx={{color: 'black'}}/>
            )}},
    { field: 'details', headerName: 'Details', flex: 2, renderCell: (params) => {
            return <b>{params.value} €</b>
        }},
    { field: 'id', headerName: '', flex: 1, renderCell: (params) => {
            return <Link to={`/factures/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
        }},
];

