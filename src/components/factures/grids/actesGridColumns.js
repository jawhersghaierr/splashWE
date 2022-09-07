import React from "react";
import {convertDate, currencyFormatter} from "../../../utils/utils";

export const columns = disciplines => [
    { field: 'numLigne', headerName: '№', maxWidth: '20px', flex: 1, sortable: false, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'codeActe', headerName: 'ACTE', flex: 1 },
    { field: 'dcs', headerName: 'DCS', flex: 1, renderCell: (params) => {
        return (params.value)
    }},
    { field: 'dmt', headerName: 'DMT', flex: 1 },
    { field: 'Periode', headerName: 'Période', flex: 2, minWeight: '150px', renderCell: (params) => { //
            return (`${convertDate(params?.row?.dateDebutSoins)} - ${convertDate(params?.row?.dateFinSoins)}`)
    }},
    { field: 'coef', headerName: 'COEFF', flex: 1 },
    { field: 'quant', headerName: 'QTE', flex: 1 },
    { field: 'pu', headerName: 'PU', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'br', headerName: 'Base SS', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'taux', headerName: 'TX RO', flex: 1, renderCell: (params) => { //
            return (`${params.value} %`)
    }, cellClassName: 'boldValue'},
    { field: 'ro', headerName: 'MNT RO', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'depense', headerName: 'DR', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'rc', headerName: 'MNT RC', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'rac', headerName: 'RAC', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
];
