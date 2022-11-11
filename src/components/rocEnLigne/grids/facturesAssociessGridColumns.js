import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {facturesStatus} from "../../../utils/status-utils";
import {dateConvertNaissance, convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";

export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'receivedDateTime', headerName: 'Reçu le', minWidth: '150px', flex: 2, renderCell, valueGetter: ({value}) => convertDate(value, true) },
    { field: 'numFact', headerName: 'N° facture', flex: 2, renderCell},
    { field: 'type', headerName: 'Type', flex: 1, renderCell, valueGetter: () => 'Facture' },
    { field: 'domaine', headerName: 'Domaine', flex: 1, renderCell, valueGetter: ({value}) => (<b>{nomRefs?.ROC_DOMAINS[value] || value}</b>) },
    { field: 'dateEntree', headerName: 'Date d\'admission', minWidth: '150px', flex: 1, renderCell, valueGetter: ({value}) => { (convertDate(value)) } },
    { field: 'status', headerName: 'Statut', flex: 1, renderCell, valueGetter: ({value}) => ( <Chip label={`${facturesStatus[value]?.label}`} sx={{color: 'black', bgcolor: facturesStatus[value]?.color}}/> ) },
    { field: 'nom', headerName: 'Nom et date de naissance bénéficiaire', flex: 2, minWidth: '200px', renderCell, valueGetter: ({row}) => (<span><b>{row?.nom}</b>&nbsp;{row?.prenom}<br/>{dateConvertNaissance(row?.dateNai)}</span>) },
    { field: 'rc', headerName: 'Montant RC', flex: 1, valueGetter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => <VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(row)}/> },

];

