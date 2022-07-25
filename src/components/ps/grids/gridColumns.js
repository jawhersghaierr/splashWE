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

export const columns = disciplines => [
    { field: 'numPartenaire', headerName: '№ de partenaire', width: 150 },
    { field: 'statutRibs', headerName: 'Statut(s) RIB', width: 125, sortable: false, renderCell: (params) => {
            const statRow = statusRow(params.formattedValue)
            const shown = Object.keys(statRow).find(key => statRow[key].shown);
            return (
                <LightTooltip
                    title={<div style={{ whiteSpace: 'pre-line' }}>{popOverRibs(statRow)}</div>}
                    placement="top" arrow>
                    <Chip label={`${statRow[shown]?.count} ${statRow[shown]?.label}${(statRow[shown]?.count > 1)? 's' : ''}`}
                          sx={{bgcolor: statRow[shown]?.color, color: 'black'}}/>
                </LightTooltip>
            )
        }},
    { field: 'raisonSociale', headerName: 'Raison Sociale', minWidth: 200, flex: 1 },
    { field: 'disciplines', headerName: 'Discipline(s)', width: 175, sortable: false, renderCell: (params) => {
            const discipl = params.formattedValue || null;

            let _RibLabel = ribLabel(discipl, disciplines);

            let txt = discipl.map(s=>disciplines.find(e=>e.code==s)).map(e=>e?.libelle).join(' \n') || ''

            return (
                <div>{(discipl && (discipl.length > 1)) &&
                <LightTooltip
                    title={<div style={{ whiteSpace: 'pre-line' }}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h3 style={{margin: '5px'}}><b>Disciplines</b></h3>
                            <div style={{minWidth: '225px', paddingLeft: '5px'}}> {txt} </div>
                        </div>
                    </div>}
                    placement="top"
                    arrow>
                    <Chip label={discipl.length}/>
                </LightTooltip>
                } {_RibLabel && _RibLabel}
                </div>
            )
        }},
    { field: 'ville', headerName: 'Ville', width: 300, renderCell: (params) => (
            params.formattedValue
        )},
    { field: 'codePostal', headerName: 'Code postal', width: 150 },
    { field: 'id', headerName: '', width: 15, sortable: false, renderCell: (params) => {
            return <Link to={`/PS/${params.formattedValue}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>
    }},
];

