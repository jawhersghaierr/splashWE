import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, currencyFormatter} from "../../../utils/utils";

export const columns = () => [
    { field: 'dateCreation', headerName: 'Date et heure de reception', minWidth: '200px', flex: 2, sortable: false, renderCell: (params) => {
            return (convertDate(params.value));
        }},
    { field: 'numeroFacture', headerName: 'Nº facture', flex: 2, sortable: false, renderCell: (params) => {
            return (params.value);
        }},
    { field: 'provenance', headerName: 'Provenance', flex: 2, renderCell: (params) => {
            return (params.value)
        }},
    { field: 'montant', headerName: 'RC Paiement', type: 'number', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},

    { field: 'statut', headerName: 'Statut', flex: 2, renderCell: (params) => {
            return (
                <Chip label={`${params.value}`} sx={{color: 'black'}}/>
            )}},

    { field: 'details', headerName: 'Details', flex: 3, renderCell: (params) => {
            return params.value
        }},

    { field: 'id', headerName: '', maxWidth: '15px', flex: 1, sortable: false, type: 'number', renderCell: (params) => {
            return <Link to={`/#/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
        }},
];
