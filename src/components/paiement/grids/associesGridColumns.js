import React from "react";
import Chip from "@mui/material/Chip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {renderCell} from "../../../utils/utils";
import {paiementsVirementStatus} from "../../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";


export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'dateCreation', headerName: 'Date et heure de réception', flex: 2, sortable: false, renderCell, valueGetter: ({value}) => (convertDate(value, true)) },
    { field: 'type', headerName: 'Type', flex: 2, sortable: false, renderCell, valueGetter: (params) => {
            let type = params.formattedValue
            let result = params.value

            if ( nomRefs.PAIEMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_TYPE[type] ) {
                result = nomRefs.PAIEMENT_TYPE[type]
            } else if (nomRefs.PAIEMENT_VIREMENT_TYPE[type] !== undefined && nomRefs.PAIEMENT_VIREMENT_TYPE[type]) {
                result = nomRefs.PAIEMENT_VIREMENT_TYPE[type]
            }
            return result;
    }},
    { field: 'numero', headerName: 'Numéro', flex: 2, renderCell },
    { field: 'montant', headerName: 'Montant', type: 'number', flex: 1, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'status', headerName: 'Statut', flex: 2, renderCell, valueGetter: ({value}) => (<Chip label={paiementsVirementStatus[value]?.label}  sx={{color: 'black', bgcolor: paiementsVirementStatus[value]?.color }}/>) },
    { field: 'details', headerName: 'Détails', flex: 3, renderCell },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => (<VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(row)}/>) },
];

