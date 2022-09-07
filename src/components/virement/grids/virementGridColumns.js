import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, dateConvertNaissance, currencyFormatter, facturesStatus} from "../../../utils/utils";

/*
"results": [
{
"id": 144,
"dateTraitement": "2022-09-05",
"numVirement": "0000333",
"numDecompte": "000079331",
"numPsAPayer": 150783090,
"mntVirement": 25,
"iban": "FR6117569000505954986746T02",
"bic": "AGRIFRPPXXX",
"status": "VALIDE"
},
 */


export const columns = disciplines => [

    { field: 'dateTraitement', headerName: 'Date d\'emission', flex: 1, renderCell: (params) => {
            return (convertDate(params.value));
        }},

    { field: 'numVirement', headerName: '№ virement', flex: 1, minWidth: '175px', type: "number" },
    { field: 'numDecompte', headerName: '№ decompte', flex: 1, minWidth: '175px', type: "number" },
    { field: 'numPsAPayer', headerName: '№ Ps de facturation', flex: 2, minWidth: '175px' },
    { field: 'iban', headerName: 'IBAN \n BIC', flex: 3, sortable: false, renderCell: (params) => {
            return <span>{params.value}<br/>{params.row?.bic}</span>;
    }},
    { field: 'mntVirement', headerName: 'Montant', type: 'number', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
            return <Chip label={params.value} sx={{color: 'black'}}/>
    }},
    { field: 'id', headerName: '', flex: 1, maxWidth: '75px', renderCell: (params) => {
            return <Link to={`/virements/${params?.row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

