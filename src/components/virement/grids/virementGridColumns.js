import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, dateConvertNaissance, currencyFormatter, facturesStatus} from "../../../utils/utils";

export const columns = disciplines => [

    { field: 'dateTraitement', headerName: 'Date d\'emission', flex: 1, renderCell: (params) => {
            return (convertDate(params.value));
        }},

    { field: 'numVirement', headerName: 'N° virement', flex: 1, width: 175, type: "number" },
    { field: 'numDecompte', headerName: 'N° decompte', flex: 1, minWidth: '175px', type: "number" },
    { field: 'numPsAPayer', headerName: 'N° Ps de facturation', flex: 2, minWidth: '175px' },
    { field: 'iban', headerName: 'IBAN \n BIC', flex: 3, sortable: false, renderCell: (params) => {
            return <span>{params.value}<br/>{params.row?.bic}</span>;
    }},
    { field: 'mntVirement', headerName: 'Montant', type: 'number', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
            return <Chip label={params.value} sx={{color: 'black'}}/>
    }},
    { field: 'id', headerName: '', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return <Link to={`/virements/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

