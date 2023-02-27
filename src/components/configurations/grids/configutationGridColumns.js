import React from "lib_ui/react";
import {Link} from 'lib_ui/react-router-dom';

import Chip from "@mui/material/Chip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import {
    factureConfigurationStatus,
    convertDate,
    renderCell
} from "shared_lib_ui/Lib";

export const columns = ({nomRefs, configurations, domain, code}) => [
    { field: 'id', headerName: 'Code', flex: 2, renderCell },
    { field: 'type', headerName: 'Type de paramétre', flex: 1, renderCell, valueGetter: ({value}) => (nomRefs.FACTURE_CONFIGURATION_TYPE[value] || value) },
    { field: 'label', headerName: 'Libellé', flex: 3, renderCell },
    { field: 'status', headerName: 'Statut', flex: 1, renderCell, valueGetter: ({value}) => (<Chip label={`${nomRefs.FACTURE_CONFIGURATION_STATUS[value] || value}`} sx={{color: 'black', bgcolor: factureConfigurationStatus[value]?.color}}/> ) },
    { field: 'timestamp', headerName: 'Période de validité', flex: 2, renderCell, valueGetter: ({row}) => (`${convertDate(row?.startDate)}-${convertDate(row?.endDate)}`) },
    { field: 'user', headerName: 'Utilisateur', flex: 1, renderCell },
    { field: 'details', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => (<Link to={`/configuration/${domain}/${code}/${row?.id}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>) },
];

