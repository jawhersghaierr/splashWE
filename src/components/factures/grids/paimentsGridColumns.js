import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {paiementsStatus, paiementsVirementStatus} from "../../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";

export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'dateCreation', headerName: 'Date et heure de réception', minWidth: '150px', flex: 2, renderCell, valueGetter: (params) => (convertDate(params.value, true)) },
    { field: 'type', headerName: 'Type', flex: 1, renderCell, valueGetter: (params) => {
            let type = params.formattedValue
            let result = params.value

            if ( nomRefs.PAIEMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_TYPE[type] ) {
                result = nomRefs.PAIEMENT_TYPE[type]
            } else if (nomRefs.PAIEMENT_VIREMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_VIREMENT_TYPE[type]) {
                result = nomRefs.PAIEMENT_VIREMENT_TYPE[type]
            }
            return result
    }},
    { field: 'numero', headerName: 'N° virement', type: 'number', flex: 1, renderCell },
    { field: 'montant', headerName: 'Montant', flex: 1, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'statut', headerName: 'Statut', flex: 1, renderCell, valueGetter: (params) => {
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

    { field: 'details', headerName: 'Détails', flex: 3, renderCell, valueGetter: (params) => (<b>{nomRefs?.PAIEMENT_DETAILS[params.value] || params.value}</b>) },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: (params) => (<VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(params.row)}/>) },
];

