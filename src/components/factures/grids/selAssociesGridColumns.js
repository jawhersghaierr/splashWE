import React from "react";
import Chip from "@mui/material/Chip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {rocStatus} from "../../../utils/status-utils";
import {renderCell} from "../../../utils/utils";
import {dateConvertNaissanceRAW, convertDate} from "../../../utils/convertor-utils";


export const columns = ({handleModalOpen}) => [
    { field: 'type', headerName: 'Type', flex: 2, sortable: false, renderCell },
    { field: 'domaine', headerName: 'Domaine', flex: 2, renderCell },
    { field: 'dateAdmission', headerName: 'Date d\'admission', flex: 1, renderCell, valueGetter: (params) => (convertDate(params.value)) },
    { field: 'statut', headerName: 'Statut', flex: 2, renderCell, valueGetter: (params) =>  ( <Chip label={`${params?.value?.label}`} sx={{color: 'black', bgcolor: rocStatus[params.value?.code]?.color || 'rgba(0, 0, 0, 0.08)'}}/> ) },
    { field: 'beneficiary', headerName: 'Nom et date de naissance beneficiaire', flex: 3, renderCell, valueGetter: ({value}) => {
        const {nom, prenom, dateNaissance} = value
        return <span><b>{nom || ''}</b> {prenom || ''}<br/>{dateConvertNaissanceRAW(dateNaissance && dateNaissance)}</span>
    }},
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: (params) => (<VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(params.row)}/>) },

];

