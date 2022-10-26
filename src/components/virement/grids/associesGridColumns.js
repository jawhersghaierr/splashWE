import React from "react";
import Chip from "@mui/material/Chip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {paiementsStatus} from "../../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";


export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'dateCreation', headerName: 'Date et heure de réception', minWidth: '200px', flex: 2, sortable: false, renderCell, valueGetter: (params) => (convertDate(params.value, true)) },
    { field: 'numeroFacture', headerName: 'Nº facture', flex: 2, sortable: false, renderCell },
    { field: 'provenance', headerName: 'Provenance', flex: 2, renderCell },
    { field: 'montant', headerName: 'RC paiement', type: 'number', flex: 1, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'statut', headerName: 'Statut', flex: 2, renderCell, valueGetter: ({value}) => (<Chip label={`${nomRefs.PAIEMENT_STATUS[value]}`} sx={{color: 'black', bgcolor: paiementsStatus[value].color}}/> ) },
    { field: 'details', headerName: 'Détails', flex: 3, renderCell, valueGetter: ({value}) => (nomRefs.PAIEMENT_DETAILS[value] || value) },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => (<VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(row)}/>) },
];
