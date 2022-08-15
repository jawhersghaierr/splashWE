import Chip from "@mui/material/Chip";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {benefStatuses, convertDate, dateConvertNaissance} from '../utils/utils'


export const columns = enviroments => [
    { field: 'numeroAdherentFamilial', headerName: '№ Adhérent Familial', flex: 2 },
    { field: 'numeroAdherentIndividuel', headerName: '№ Adhérent Individuel', flex: 2 },
    { field: 'ayantDroit', headerName: 'Nom bénéficiaire et lien Famillial', flex: 4, sortable: false,
        renderCell: (params) => {
            return (<div>
                <b>{params.row.nom}</b> {params.row.prenom}
                <Chip label={params.row.lienFamillialLabel} sx={{display: 'block', margin: '5px', paddingTop: '6px',}}/>
            </div>)
    }},
    { field: 'dateNaissance', headerName: 'Date de Naissance et Rang', flex: 3, sortable: false,
        renderCell: (params) => {
        console.log(params)
            return (<>
                {dateConvertNaissance(params.row?.dateNaissance)}&nbsp;<Chip label={params.row.rangNaissance}/>
            </>)
    }},
    { field: 'environmentCode', headerName: 'Environnement', flex: 1, renderCell: (params) => {
            return (<>
                {params.row.environmentCode}
            </>)
        }},
    { field: 'dateMiseaJour', headerName: 'Date de Mise à jour', flex: 2, renderCell: (params) => {
            return (<>
                {convertDate(params.row.dateMiseaJour)}
            </>)
        }},
    { field: 'dateOuvertureDroits', headerName: 'Date de Validité', flex: 2, renderCell: (params) => {
            return (<>
                {convertDate(params.row.dateOuvertureDroits)}<br/>
                {convertDate(params.row.dateFermetureDroits)}
            </>)
        }},
    { field: 'status', headerName: 'Statut', flex: 2, renderCell: (params) => {
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

