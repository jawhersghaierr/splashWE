import React from "react";
import {styled} from "@mui/material/styles";

export const simpleGarantieColumns = nom => [
    { field: 'garantie', headerName: 'Garantie', minWidth: 100, flex: 1, renderCell: params => nom?.GARANTIE[params.row.garantie] },
    { field: 'sousGarantie', headerName: 'Sous Garantie', minWidth: 100, flex: 1, renderCell: params => nom?.SOUS_GARANTIE[params.row.sousGarantie] },
    { field: 'formula', headerName: 'Formule', minWidth: 100, flex: 1  },
];

export const complexGarantieColumns = nom => [
    { field: 'garantie', headerName: 'Garantie', minWidth: 100, flex: 1, renderCell: params => nom?.GARANTIE[params.row.garantie] },
    { field: 'sousGarantie', headerName: 'Sous Garantie', minWidth: 100, flex: 1, renderCell: params => nom?.SOUS_GARANTIE[params.row.sousGarantie] },
    { field: 'dcs', headerName: 'DCS', minWidth: 100, flex: 1},
    { field: 'formula', headerName: 'Formule', minWidth: 100, flex: 1 },
    // { field: 'garantie', headerName: '№ Adherent Familial', width: 100 },
];

