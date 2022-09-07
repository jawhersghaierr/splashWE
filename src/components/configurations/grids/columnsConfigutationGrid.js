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
            return (<Chip label={`${params.value}`} sx={{color: 'black'}}/> )
    }},

    { field: 'timestamp', headerName: 'timestamp', flex: 2, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'user', headerName: 'user', flex: 2,renderCell: (params) => {
        return (params.value);
    }},

    { field: 'details', headerName: '', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return <Link to={`/configuration/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

