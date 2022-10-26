import React from "react";
import {renderCell} from "../../../utils/utils";

export const simpleGarantieColumns = nom => [
    { field: 'garantie', headerName: 'Garantie', minWidth: 100, flex: 3, renderCell, valueGetter: ({row}) => nom?.GARANTIE[row?.garantie] },
    { field: 'sousGarantie', headerName: 'Sous Garantie', minWidth: 100, flex: 3, renderCell, valueGetter: ({row}) => nom?.SOUS_GARANTIE[row?.sousGarantie] },
    { field: 'formula', headerName: 'Formule', minWidth: 100, flex: 1, renderCell },
];

export const complexGarantieColumns = nom => [
    { field: 'garantie', headerName: 'Garantie', minWidth: 100, flex:2, renderCell, valueGetter: ({row}) => nom?.GARANTIE[row?.garantie] },
    { field: 'sousGarantie', headerName: 'Sous Garantie', minWidth: 100, flex: 3, renderCell, valueGetter: ({row}) => nom?.SOUS_GARANTIE[row?.sousGarantie] },
    { field: 'dcs', headerName: 'DCS', minWidth: 100, flex: 1, renderCell },
    { field: 'formula', headerName: 'Formule', minWidth: 100, flex: 1, renderCell },
];

