import React from "react";
import {convertDate, currencyFormatter} from "../../../utils/convertor-utils";

const reformatCurrencyAtLastRow = ({id, value}) => {
    if (id == 'total') return ''
    return currencyFormatter.format(value)
}

export const columns = nomRefs => [
    { field: 'numLigne', headerName: 'N°', maxWidth: '20px', flex: 1, sortable: false, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'codeActe', headerName: 'ACTE', flex: 1 },
    { field: 'mdt', headerName: 'MT', flex: 1 },
    { field: 'dcs', headerName: 'DCS', flex: 1, renderCell: (params) => {
        return (nomRefs.DCS[params.value] || params.value)
    }},
    { field: 'dmt', headerName: 'DMT', flex: 1 },
    { field: 'Periode', headerName: 'Période', flex: 2, minWeight: '150px', renderCell: (params) => { //
            return (`${convertDate(params?.row?.dateDebutSoins)} - ${convertDate(params?.row?.dateFinSoins)}`)
    }},
    { field: 'coef', headerName: 'COEFF', flex: 1 },
    { field: 'quant', headerName: 'QTE', flex: 1 },
    { field: 'pu', headerName: 'PU', flex: 1, valueFormatter: ({id, value}) => reformatCurrencyAtLastRow({id, value}), cellClassName: 'boldValue'},
    { field: 'br', headerName: 'Base SS', flex: 1, valueFormatter: ({id, value}) => reformatCurrencyAtLastRow({id, value}), cellClassName: 'boldValue'},
    { field: 'taux', headerName: 'TX RO', flex: 1, renderCell: ({id, value}) => (id == 'total')? '':`${Number(value )} %` || 0, cellClassName: 'boldValue'},
    { field: 'ro', headerName: 'MNT RO', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value || 0), cellClassName: 'boldValue'},
    { field: 'depense', headerName: 'DR', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value || 0), cellClassName: 'boldValue'},
    { field: 'rc', headerName: 'MNT RC', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value || 0), cellClassName: 'boldValue'},
    { field: 'rac', headerName: 'RAC', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value || 0), cellClassName: 'boldValue'},

];
