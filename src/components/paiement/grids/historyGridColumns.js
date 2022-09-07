import React from "react";
import Chip from "@mui/material/Chip";
import {convertDate} from "../../../utils/utils";

export const columns = disciplines => [
    { field: 'date', headerName: 'Date et heure de evenement', flex: 2, mixWidth: '100px', renderCell: (params) => { //
        return convertDate(params?.value, true)
    }},
    { field: 'event', headerName: 'Evenement', flex: 1, renderCell: (params) => {
        return (params.value)
    }},
    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
        return <Chip label={params.value} sx={{color: 'black'}}/>
    }},
    { field: 'label', headerName: 'Libelle', flex: 1, renderCell: (params) => {
        return (params.value)
    }},

];

