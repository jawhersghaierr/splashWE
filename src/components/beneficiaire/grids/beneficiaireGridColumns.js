import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {benefStatuses} from '../../../utils/status-utils';
import {dateConvertNaissanceRAW, convertDate} from "../../../utils/convertor-utils";
import {renderCell} from "../../../utils/utils";

export const columns = () => [
    { field: 'numeroAdherentFamilial', headerName: 'N° adhérent familial', flex: 2, renderCell },
    { field: 'numeroAdherentIndividuel', headerName: 'N° adhérent individuel', flex: 2, renderCell },
    { field: 'nom', headerName: 'Nom bénéficiaire et lien famillial', flex: 4, renderCell, valueGetter: ({row}) => (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <span><b>{row?.nom}</b> {row?.prenom}</span>
            <Chip label={row?.lienFamillialLabel} sx={{margin: '5px', maxWidth: '110px'}}/>
        </div>)},
    { field: 'dateNaissance', headerName: 'Date et rang de naissance', flex: 3, sortable: false, renderCell, valueGetter: ({row}) => (<>
            {dateConvertNaissanceRAW(row?.dateNaissance)}&nbsp;<Chip label={row.rangNaissance}/>
        </>)},
    { field: 'environmentCode', headerName: 'Environnement', flex: 1, renderCell, valueGetter: ({row}) => row?.environmentCode },
    { field: 'timestamp', headerName: 'Date de mise à jour', flex: 2, renderCell, valueGetter: ({row}) => convertDate(row?.dateMiseaJour) },
    { field: 'dateOuvertureDroits', headerName: 'Date de validité', flex: 2, sortable: false, renderCell, valueGetter: ({row}) => (<>
            {convertDate(row?.dateOuvertureDroits)}<br/>
            {convertDate(row?.dateFermetureDroits)}
        </>)},
    { field: 'status', headerName: 'Statut', flex: 2, sortable: false, renderCell, valueGetter: ({row}) => (<Chip label={benefStatuses[row?.status]?.label} sx={{bgcolor: benefStatuses[row?.status]?.color, display: 'block', paddingTop: '6px', margin: '5px'}}/>) },
    { field: 'id', headerName: '', width: 15, sortable: false, renderCell, valueGetter: ({value}) => (<Link to={`/beneficiaire/${value}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>)},
];


export const reverseMapBenef = {
    numeroAdherentFamilial: 'N° adhérent familial',
    numeroAdherentIndividuel: 'N° adhérent individuel',
    nom: 'Nom bénéficiaire et lien famillial',
    prenom: 'Nom bénéficiaire et lien famillial',
    lienFamillialLabel: 'Nom bénéficiaire et lien famillial',
    dateNaissance: 'Date et rang de naissance',
    rangNaissance: 'Date et rang de naissance',
    environmentCode: 'Environnement',
    timestamp: 'Date de mise à jour',
    dateOuvertureDroits: 'Date de validité',
    dateFermetureDroits: 'Date de validité',
    status: 'Statut'
}
