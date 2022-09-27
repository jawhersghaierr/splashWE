import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, currencyFormatter, paiementsVirementStatus} from "../../../utils/utils";

export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'dateCreation', headerName: 'Date et heure de réception', flex: 2, sortable: false, renderCell: (params) => {
            return (convertDate(params.value, true));
        }},

    { field: 'type', headerName: 'Type', flex: 2, sortable: false, renderCell: (params) => {
            let type = params.formattedValue
            let result = params.value

            if ( nomRefs.PAIEMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_TYPE[type] ) {
                result = nomRefs.PAIEMENT_TYPE[type]
            } else if (nomRefs.PAIEMENT_VIREMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_VIREMENT_TYPE[type]) {
                result = nomRefs.PAIEMENT_VIREMENT_TYPE[type]
            }
            return result;
    }},

    { field: 'numero', headerName: 'Numéro', flex: 2, renderCell: (params) => {
            return (params.value)
    }},

    { field: 'montant', headerName: 'Montant', type: 'number', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},

    { field: 'statut', headerName: 'Statut', flex: 2, renderCell: (params) => {
        return <Chip label={paiementsVirementStatus[params.value]?.label}  sx={{color: 'black', bgcolor: paiementsVirementStatus[params.value]?.color }}/>
    }},

    { field: 'details', headerName: 'Détails', flex: 3, renderCell: (params) => {
            return params.value
    }},

    { field: 'id', headerName: '', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return <VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(params.row)}/>
    }},
];

