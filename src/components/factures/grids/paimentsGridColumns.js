import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {convertDate, currencyFormatter, paiementsStatus, paiementsVirementStatus} from "../../../utils/utils";

export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'dateCreation', headerName: 'Date et heure de réception', minWidth: '150px', flex: 2, renderCell: (params) => { //dateEntree
            return (convertDate(params.value, true))
        }},
    { field: 'type', headerName: 'Type', flex: 1, renderCell: (params) => {
            let type = params.formattedValue
            let result = params.value

            if ( nomRefs.PAIEMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_TYPE[type] ) {
                result = nomRefs.PAIEMENT_TYPE[type]
            } else if (nomRefs.PAIEMENT_VIREMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_VIREMENT_TYPE[type]) {
                result = nomRefs.PAIEMENT_VIREMENT_TYPE[type]
            }
            return result
    }},
    { field: 'numero', headerName: 'N° Numero', type: 'number', flex: 1},
    { field: 'montant', headerName: 'Montant', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'statut', headerName: 'Statut', flex: 1, renderCell: (params) => {
        let statusType = {status: params.value, type: params.row.type}

        if (nomRefs.PAIEMENT_TYPE[params.row.type]) {
            statusType.status = nomRefs.PAIEMENT_STATUS
            statusType.type = paiementsStatus
        }
        if (nomRefs.PAIEMENT_VIREMENT_TYPE[params.row.type]) {
            statusType.status = nomRefs.PAIEMENT_VIREMENT_STATUS
            statusType.type = paiementsVirementStatus
        }
        return ( <Chip label={`${statusType.type[params.value]?.label || params.value}`} sx={{color: 'black', bgcolor: statusType.type[params.value]?.color || 'rgba(0, 0, 0, 0.08)'}}/> )
    }},

    { field: 'details', headerName: 'Details', flex: 3, renderCell: (params) => {
        return <b>{params.value}</b>
    }},
    { field: 'id', headerName: '', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
        return <VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(params.row)}/>
    }},
];

