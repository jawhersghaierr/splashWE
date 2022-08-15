import Chip from "@mui/material/Chip";
import React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {benefStatuses} from '../utils/utils'

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

const popOverRibs = (ribs) => {
    return (<div style={{display: 'flex', flexDirection: 'column'}}>
            <h3 style={{margin: '5px'}}><b>Statut(s) RIB</b></h3>
            {Object.keys(ribs).map((rib, index) => (
                <Chip
                    label={`${ribs[rib]?.count} ${ribs[rib]?.label}${(ribs[rib]?.count > 1)? 's' : ''}`}
                    key={`fistChip${index}`}
                    sx={{bgcolor: ribs[rib]?.color, color: 'black', margin: '5px', padding: 0}}
                />
            ))}
        </div>
    )
}

const ribLabel = (discipl, disciplines) => {
    if (discipl && discipl.length > 1) {
        return 'Multi-disciplines'
    } else {
        return (<p style={{paddingLeft: '35px'}}>{disciplines.find(e => e.code == discipl[0])?.libelle}</p>)
    }
}

export const columns = enviroments => [
    { field: 'numeroAdherentFamilial', headerName: '№ Adherent Familial', flex: 2 },
    { field: 'numeroAdherentIndividuel', headerName: '№ Adherent Individuel', flex: 2 },
    { field: 'ayantDroit', headerName: 'Nom beneficiaire et lien Famillial', flex: 4, sortable: false,
        renderCell: (params) => {
            return (<div>
                <b>{params.row.prenom}</b> {params.row.nom}
                <Chip label={params.row.lienFamillialLabel} sx={{display: 'block', margin: '5px', paddingTop: '6px',}}/>
            </div>)
    }},
    { field: 'dateNaissance', headerName: 'Date de Naissance et Rang', flex: 3, sortable: false,
        renderCell: (params) => {
        console.log(params)
            return (<>
                <Chip label={params.row.rangNaissance}/>&nbsp; {params.row?.dateNaissance?.split('-').reverse().join('/')}
            </>)
    }},
    { field: 'environmentCode', headerName: 'OMC', flex: 1, renderCell: (params) => {
            return (<>
                {params.row.environmentCode}
            </>)
        }},
    { field: 'dateMiseaJour', headerName: 'Date de Mise a jour', flex: 2, renderCell: (params) => {
            return (<>
                {new Date(params.row.dateMiseaJour).toLocaleDateString('en-GB')}
            </>)
        }},
    { field: 'dateOuvertureDroits', headerName: 'Date de Mise a jour', flex: 2, renderCell: (params) => {
            return (<>
                {new Date(params.row.dateMiseaJour).toLocaleDateString('en-GB')}<br/>
                {new Date(params.row.dateNaissance).toLocaleDateString('en-GB')}
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

