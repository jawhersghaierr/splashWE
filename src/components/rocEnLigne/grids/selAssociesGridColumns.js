import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {rocStatus} from "../../../utils/status-utils";
import {dateConvertNaissanceRAW, convertDate, currencyFormatter} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";

export const columns = ({handleModalOpen, nomRefs}) => [
    { field: 'receivedDate', headerName: 'Reçu le', flex: 2, sortable: false, renderCell, valueGetter: ({value}) => convertDate(value, true) },
    { field: 'numeroEngagement', headerName: 'N° engagement', flex: 2, sortable: false, renderCell },
    { field: 'type', headerName: 'Type', flex: 2, sortable: false, renderCell },
    { field: 'domaine', headerName: 'Domaine', flex: 2, renderCell, valueGetter: ({value}) => (nomRefs?.ROC_DOMAINS[value] || value)},
    { field: 'dateAdmission', headerName: 'Date d\'admission', flex: 1, renderCell, valueGetter: ({value}) => (convertDate(value)) },
    { field: 'statut', headerName: 'Statut', flex: 2, renderCell, valueGetter: ({value}) => ( <Chip label={`${value?.label}`} sx={{color: 'black', bgcolor: rocStatus[value?.code]?.color || 'rgba(0, 0, 0, 0.08)'}}/> ) },
    { field: 'beneficiaryName', headerName: 'Nom et date de naissance bénéficiaire', flex: 3, renderCell, valueGetter: (params) => {
            let {nom, prenom, dateNaissance} = params?.row?.beneficiary;
            return <span><b>{nom}</b> {prenom}<br/>{dateConvertNaissanceRAW(dateNaissance && dateNaissance)}</span>
        }},
    { field: 'montantRC', headerName: 'Montant RC', flex: 1, renderCell, valueGetter: ({ value }) => currencyFormatter.format(value || 0), cellClassName: 'boldValue'},
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({row}) => (<VisibilityOutlinedIcon sx={{color: '#99ACBB', cursor: 'pointer'}} onClick={()=>handleModalOpen(row)}/>) },
];

