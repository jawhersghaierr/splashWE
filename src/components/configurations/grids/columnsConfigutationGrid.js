import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";



export const columns = disciplines => [
    { field: 'id', headerName: 'Code', flex: 1, renderCell: (params) => {
        return (params.value);
    }},

    { field: 'type', headerName: 'Type de paramétre', flex: 3, renderCell: (params) => {
            return (params.value);
        }},
    { field: 'libelle', headerName: 'Libellé', flex: 2 },
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
            return (
                <Chip label={`${params.value}`}
                      sx={{color: 'black'}}/>
            )}},


    { field: 'timestamp', headerName: 'timestamp', flex: 2, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'user', headerName: 'user', flex: 2,renderCell: (params) => {
        return (params.value);
    }},

    { field: 'details', headerName: '', maxWidth: '50px', sortable: false, flex: 1, renderCell: (params) => {
            return <Link to={`/configuration/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

//{"id":2,"status":"A","timestamp":"2022-06-17T22:52:01","user":"ADMIN","type":"F"}
