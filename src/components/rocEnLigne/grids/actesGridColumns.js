import React from "react";
import {convertDate, currencyFormatter} from "../../../utils/utils";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[5],
        fontSize: 14,
        // minWidth: 225,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
}));

export const columns = nomRefs => [
    { field: 'ligne', headerName: 'N°', maxWidth: '20px', flex: 1, sortable: false, renderCell: (params) => {
        return (params.value);
    }},
    { field: 'code', headerName: 'ACTE', flex: 1 },
    { field: 'modeTraitment', headerName: 'MT', flex: 1 },
    { field: 'dcs', headerName: 'DCS', flex: 1, renderCell: (params) => {
        return (nomRefs.DCS[params.value] || params.value)
    }},
    { field: 'dmt', headerName: 'DMT', flex: 1 },
    { field: 'idExecutant', headerName: 'Identifiant exécutant', flex: 1 },
    { field: 'periode', headerName: 'Période', flex: 2, minWeight: '150px', renderCell: (params) => { //
            return (`${convertDate(params?.row?.dateDebutSoins)} - ${convertDate(params?.row?.dateFinSoins)}`)
    }},
    { field: 'coefficient', headerName: 'COEFF', flex: 1 },
    { field: 'quantite', headerName: 'QTE', flex: 1 },
    { field: 'prixUnitaire', headerName: 'PU', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'baseSS', headerName: 'Base SS', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'tauxRo', headerName: 'TX RO', flex: 1, renderCell: (params) => { //
            return (`${params.value} %`)
    }, cellClassName: 'boldValue'},
    { field: 'montantRo', headerName: 'MNT RO', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'depenseReelle', headerName: 'DR', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'montantRC', headerName: 'MNT RC', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'montantRAC', headerName: 'RAC', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'statut', headerName: '', flex: 1, renderCell: (params) => {

            return (params.value && params.value !== undefined ) && <LightTooltip title={params.value} placement="top" arrow>
                <ErrorOutlineOutlinedIcon sx={{verticalAlign: 'top', width: 30, height: 30, margin: '0 5px', cursor: 'pointer'}}/>
            </LightTooltip> || ''
    }},
];
