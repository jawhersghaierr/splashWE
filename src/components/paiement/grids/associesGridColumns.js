import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate} from "../../../utils/utils";

export const columns = disciplines => [
    { field: 'dateCreation', headerName: 'Date et heure de reception', flex: 2, sortable: false, renderCell: (params) => {
            return (convertDate(params.value));
        }},
    { field: 'type', headerName: 'Type', flex: 2, sortable: false, renderCell: (params) => {
            return (params.value);
        }},
    { field: 'numero', headerName: 'Numero', flex: 2, renderCell: (params) => {
            return (params.value)
        }},

    { field: 'montant', headerName: 'Montant', flex: 1, renderCell: (params) => { //dateEntree
            return (convertDate(params.value))
        }},
    { field: 'statut', headerName: 'Statut', flex: 2, renderCell: (params) => {
            return (
                <Chip label={`${params.value}`} sx={{color: 'black'}}/>
            )}},

    { field: 'details', headerName: 'Details', flex: 3, renderCell: (params) => {
            return params.value
        }},

    { field: 'id', headerName: '', maxWidth: '30px', flex: 1, renderCell: (params) => {
            return <Link to={`/#/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
        }},
];

