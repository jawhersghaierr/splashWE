import Chip from "@mui/material/Chip";
import React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {rocStatus} from "../../../utils/status-utils";
import {dateConvertNaissanceRAW, convertDate, currencyFormatter} from "../../../utils/convertor-utils";

export const columns = ({handleModalOpen}) => [
    { field: 'receivedDate', headerName: 'Reçu le', flex: 2, sortable: false, renderCell: (params) => {
            return convertDate(params.value, true);
        }},
    { field: 'numeroEngagement', headerName: 'N° engagement', flex: 2, sortable: false, renderCell: (params) => {
            return params.value
        }},
    { field: 'type', headerName: 'Type', flex: 2, sortable: false, renderCell: (params) => {
            return (params.value);
        }},
    { field: 'domaine', headerName: 'Domaine', flex: 2, renderCell: (params) => {
            return (params.value)
        }},

    { field: 'dateAdmission', headerName: 'Date d\'admission', flex: 1, renderCell: (params) => { //dateEntree
            return (convertDate(params.value))
        }},
    { field: 'statut', headerName: 'Statut', flex: 2, renderCell: (params) => {
            return ( <Chip label={`${params?.value?.label}`} sx={{color: 'black', bgcolor: rocStatus[params.value?.code]?.color || 'rgba(0, 0, 0, 0.08)'}}/> )
    }},

    { field: 'beneficiaryName', headerName: 'Nom et date de naissance beneficiaire', flex: 3, renderCell: (params) => {
            let {nom, prenom, dateNaissance} = params?.row?.beneficiary;
            return <span><b>{nom}</b> {prenom}<br/>{dateConvertNaissanceRAW(dateNaissance && dateNaissance)}</span>
        }},

    { field: 'montantRC', headerName: 'Montant RC', flex: 1, valueFormatter: ({ value }) => value && currencyFormatter.format(value), cellClassName: 'boldValue'},

    { field: 'id', headerName: '', flex: 1, width: 15, type: 'number', sortable: false, renderCell: (params) => {
            return <VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(params.row)}/>
        }},
];

