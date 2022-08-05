import {statusRow} from "../utils/utils";
import Chip from "@mui/material/Chip";
import React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";

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
    { field: 'numeroAdherentFamilial', headerName: '№ Adherent Familial', width: 100 },
    { field: 'numeroAdherentIndividuel', headerName: '№ Adherent Individuel', width: 100 },
    { field: 'ayantDroit', headerName: 'Nom beneficiaire et lien Famillial', width: 155, sortable: false,
        renderCell: (params) => {
            return (<div>
                <b>{params.row.prenom}</b> {params.row.nom}
                <Chip label={params.row.lienFamillialLabel} sx={{display: 'block', margin: '5px'}}/>
            </div>)
    }},
    { field: 'dateNaissance', headerName: 'Date de Naissance et Rang', width: 125, sortable: false,
        renderCell: (params) => {
        console.log(params)
            return (<>
                <Chip label={params.row.rangNaissance}/>&nbsp; {params.row.dateNaissance}
            </>)
    }},
    { field: 'environmentCode', headerName: 'OMC', renderCell: (params) => {
            return (<>
                {params.row.environmentCode}
            </>)
        }},
    { field: 'dateMiseaJour', headerName: 'Date de Mise a jour', width: 150, renderCell: (params) => {
            return (<>
                {params.row.dateMiseaJour}
            </>)
        }},
    { field: 'dateOuvertureDroits', headerName: 'Date de Mise a jour', width: 150, renderCell: (params) => {
            return (<>
                {params.row.dateMiseaJour}<br/>
                {params.row.dateNaissance}
            </>)
        }},
    { field: 'status', headerName: 'Statut', width: 100, renderCell: (params) => {
            return (<>
                {params.row.status}
            </>)
        }},
    { field: 'id', headerName: '', width: 15, sortable: false, renderCell: (params) => {
            return <Link to={`/beneficiaire/${params.formattedValue}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

