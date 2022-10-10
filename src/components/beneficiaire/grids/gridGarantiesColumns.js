import React from "react";

export const simpleGarantieColumns = nom => [
    { field: 'garantie', headerName: 'Garantie', minWidth: 100, flex: 3, renderCell: params => nom?.GARANTIE[params.row.garantie] },
    { field: 'sousGarantie', headerName: 'Sous Garantie', minWidth: 100, flex: 3, renderCell: params => nom?.SOUS_GARANTIE[params.row.sousGarantie] },
    { field: 'formula', headerName: 'Formule', minWidth: 100, flex: 1  },
];

export const complexGarantieColumns = nom => [
    { field: 'garantie', headerName: 'Garantie', minWidth: 100, flex:2, renderCell: params => nom?.GARANTIE[params.row.garantie] },
    { field: 'sousGarantie', headerName: 'Sous Garantie', minWidth: 100, flex: 3, renderCell: params => nom?.SOUS_GARANTIE[params.row.sousGarantie] },
    { field: 'dcs', headerName: 'DCS', minWidth: 100, flex: 1},
    { field: 'formula', headerName: 'Formule', minWidth: 100, flex: 1 },
];

