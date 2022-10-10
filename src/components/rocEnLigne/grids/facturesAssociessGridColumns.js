import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {facturesStatus} from "../../../utils/status-utils";
import {dateConvertNaissance, convertDate, currencyFormatter} from "../../../utils/convertor-utils";

export const columns = ({nomRefs, handleModalOpen}) => [
    { field: 'receivedDate', headerName: 'Reçu le', minWidth: '150px', flex: 2, renderCell: (params) => {
        return (convertDate(`${params.value} ${params.row.receivedTime}`, true))
    }},

    { field: 'numFact', headerName: 'N° facture', flex: 2},

    { field: 'type', headerName: 'Type', flex: 1, renderCell: (params) => {
        return 'Facture'
    }},

    { field: 'domaine', headerName: 'Domaine', flex: 1, renderCell: (params) => {
            return <b>{nomRefs?.ROC_DOMAINS[params.value] || params.value}</b>

    }},

    { field: 'dateEntree', headerName: 'Date d\'admission', minWidth: '150px', flex: 1, renderCell: (params) => { //dateEntree
        return (convertDate(params.value))
    }},

    { field: 'status', headerName: 'Statut', flex: 1, renderCell: (params) => {
        return ( <Chip label={`${facturesStatus[params.value]?.label}`} sx={{color: 'black', bgcolor: facturesStatus[params.value]?.color}}/> )
    }},
    { field: 'nom', headerName: 'Nom et date de naissance bénéficiaire', flex: 2, minWidth: '200px', renderCell: (params) => {
        return <span><b>{params.row.nom}</b>&nbsp;{params.row.prenom}<br/>{dateConvertNaissance(params.row.dateNai)}</span>
    }},

    { field: 'rc', headerName: 'Montant RC', flex: 1, valueFormatter: ({ value }) => currencyFormatter.format(value), cellClassName: 'boldValue'},
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell: (params) => {
        return <VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(params.row)}/>
    }},

];

