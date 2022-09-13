import React from "react";
import Chip from "@mui/material/Chip";
import {convertDate, paiementsStatus} from "../../../utils/utils";

export const columns = nomRefs => [
    { field: 'date', headerName: 'Date et heure de l\'événement', flex: 2, mixWidth: '100px', renderCell: (params) => { //
        return convertDate(params?.value, true)
    }},
    { field: 'event', headerName: 'Evénement', flex: 1, renderCell: (params) => {
        return (nomRefs?.COMMON_HISTORY_TYPE[params.value] || params.value)
    }},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
        return <Chip label={paiementsStatus[params.value]?.label}  sx={{color: 'black', bgcolor: paiementsStatus[params.value]?.color }}/>
    }},
    { field: 'label', headerName: 'Libellé', flex: 1, renderCell: (params) => {
        return (nomRefs?.PAIEMENT_DETAILS[params.value] || params.value)
    }},

];

