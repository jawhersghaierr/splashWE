import React from "react";
import {Link} from "react-router-dom";

import Chip from "@mui/material/Chip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import {renderCell} from "../../../utils/utils";
import {paiementsVirementStatus} from "../../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";

export const columns = nomRefs => [

    { field: 'dateTraitement', headerName: 'Date d\'émission', flex: 1, renderCell, valueGetter: ({value}) => (convertDate(value)) },
    { field: 'numVirement', headerName: 'N° virement', flex: 1, width: 175, type: "number", renderCell },
    { field: 'numDecompte', headerName: 'N° décompte', flex: 1, minWidth: '175px', type: "number", renderCell },
    { field: 'numPsAPayer', headerName: 'Nº PS à payer', flex: 2, minWidth: '175px', renderCell },
    { field: 'iban', headerName: 'IBAN\nBIC', flex: 3, sortable: false, renderCell, valueGetter: ({value, row}) => (<span>{value}<br/>{row?.bic}</span>) },
    { field: 'mntVirement', headerName: 'Montant', type: 'number', flex: 1, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell, valueGetter: (params) => (<Chip label={nomRefs?.PAIEMENT_VIREMENT_STATUS[params.value]} sx={{color: 'black', bgcolor: paiementsVirementStatus[params.value].color}}/>) },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => (<Link to={`/virements/${row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>) },
];

