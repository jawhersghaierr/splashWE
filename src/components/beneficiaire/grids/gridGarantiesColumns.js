import React from "react";
import {styled} from "@mui/material/styles";

export const simpleGarantieColumns = enviroments => [
    { field: 'garantie', headerName: 'Garantie', width: 100 },
    { field: 'sousGarantie', headerName: 'Sous Garantie', width: 100 },
    { field: 'formula', headerName: 'Formule', width: 100 },
];

export const complexGarantieColumns = enviroments => [
    { field: 'garantie', headerName: 'Garantie', width: 100 },
    { field: 'sousGarantie', headerName: 'Sous Garantie', width: 100 },
    { field: 'dcsFormulas', headerName: 'DCS', width: 100, renderCell: (params) => {
            return (<>
                {/*{params.row.status}*/}
                some params
            </>)
        }},
    { field: 'formula', headerName: 'Formule', width: 100 },
    // { field: 'garantie', headerName: '№ Adherent Familial', width: 100 },
];

