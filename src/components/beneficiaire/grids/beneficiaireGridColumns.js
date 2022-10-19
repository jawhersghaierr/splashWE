import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {benefStatuses} from '../../../utils/status-utils';
import {dateConvertNaissanceRAW, convertDate} from "../../../utils/convertor-utils";

export const columns = () => [
    { field: 'numeroAdherentFamilial', headerName: 'N° Adhérent Familial', flex: 2 },
    { field: 'numeroAdherentIndividuel', headerName: 'N° Adhérent Individuel', flex: 2 },
    { field: 'nom', headerName: 'Nom bénéficiaire et lien Famillial', flex: 4,
        renderCell: (params) => {
            return (<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <span><b>{params.row.nom}</b> {params.row.prenom}</span>
                <Chip label={params.row.lienFamillialLabel} sx={{margin: '5px', maxWidth: '110px'}}/>
            </div>)
    }},
    { field: 'dateNaissance', headerName: 'Date de Naissance et Rang', flex: 3, sortable: false,
        renderCell: (params) => {
            return (<>
                {dateConvertNaissanceRAW(params.row?.dateNaissance)}&nbsp;<Chip label={params.row.rangNaissance}/>
            </>)
    }},
    { field: 'environmentCode', headerName: 'Environnement', flex: 1, renderCell: (params) => {
            return (<>
                {params.row.environmentCode}
            </>)
        }},
    { field: 'timestamp', headerName: 'Date de Mise à jour', flex: 2, renderCell: (params) => {
            return (<>
                {convertDate(params.row.dateMiseaJour)}
            </>)
        }},
    { field: 'dateOuvertureDroits', headerName: 'Date de Validité', flex: 2, sortable: false, renderCell: (params) => {
            return (<>
                {convertDate(params.row.dateOuvertureDroits)}<br/>
                {convertDate(params.row.dateFermetureDroits)}
            </>)
        }},
    { field: 'status', headerName: 'Statut', flex: 2, sortable: false, renderCell: (params) => {
            return (<Chip label={benefStatuses[params.row?.status]?.label}
                          sx={{bgcolor: benefStatuses[params.row?.status]?.color,
                              display: 'block',
                              paddingTop: '6px',
                              margin: '5px'}}/>)
        }},
    { field: 'id', headerName: '', width: 15, sortable: false, renderCell: (params) => {
            return <Link to={`/beneficiaire/${params.formattedValue}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];


export const reverseMapBenef = {
    numeroAdherentFamilial: 'N° Adhérent Familial',
    numeroAdherentIndividuel: 'N° Adhérent Individuel',
    nom: 'Nom bénéficiaire et lien Famillial',
    prenom: 'Nom bénéficiaire et lien Famillial',
    lienFamillialLabel: 'Nom bénéficiaire et lien Famillial',
    dateNaissance: 'Date de Naissance et Rang',
    rangNaissance: 'Date de Naissance et Rang',
    environmentCode: 'Environnement',
    timestamp: 'Date de Mise à jour',
    dateOuvertureDroits: 'Date de Validité',
    dateFermetureDroits: 'Date de Validité',
    status: 'Statut'
}
