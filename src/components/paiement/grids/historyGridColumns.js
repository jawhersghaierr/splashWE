import React from "react";
import {convertDate} from "../utils/utils";
import Chip from "@mui/material/Chip";

/*

        historyElements: [{date: "2022-09-05T04:10:58.12", event: "CREATE", status: "VALIDE"},…]
        0: {date: "2022-09-05T04:10:58.12", event: "CREATE", status: "VALIDE"}
        date: "2022-09-05T04:10:58.12"
        event: "CREATE"
        status: "VALIDE"


 */
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
    { field: 'libelle', headerName: 'Libelle', flex: 1, renderCell: (params) => {
        return (params.value)
    }},

];

