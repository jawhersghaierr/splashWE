import {statusRow} from "../utils/utils";
import Chip from "@mui/material/Chip";
import React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
import {renderCell} from "../../../utils/utils";

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
    if (discipl) if (discipl.length > 1) {
        return 'Multi-disciplines'
    } else {
        return (<p style={{paddingLeft: '35px'}}>{disciplines.find(e => e.code == discipl[0])?.libelle}</p>)
    }
    return ''
}

export const columns = disciplines => [
    { field: 'numPartenaire', headerName: 'N° de partenaire', flex: 1, renderCell },
    { field: 'statutRibs', headerName: 'Statut(s) RIB', flex: 1, sortable: false, renderCell, valueGetter: ({value}) => {
            const statRow = statusRow(value)
            const shown = Object.keys(statRow).find(key => statRow[key].shown);
            return (
                <LightTooltip title={<div style={{ whiteSpace: 'pre-line' }}>{popOverRibs(statRow)}</div>} placement="top" arrow>
                    <Chip label={`${statRow[shown]?.count} ${statRow[shown]?.label}${(statRow[shown]?.count > 1)? 's' : ''}`} sx={{bgcolor: statRow[shown]?.color, color: 'black'}}/>
                </LightTooltip>
            )
        }},
    { field: 'raisonSociale', headerName: 'Raison Sociale', flex: 2, renderCell },
    { field: 'disciplines', headerName: 'Discipline(s)', flex: 2, sortable: false, renderCell, valueGetter: ({value}) => {
            const discipl = value || null;

            if (!!!discipl) return ''
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
    { field: 'ville', headerName: 'Ville', flex: 1, renderCell },
    { field: 'codePostal', headerName: 'Code postal', flex: 1, renderCell },
    { field: 'id', headerName: '', width: 15, type: 'number', sortable: false, renderCell, valueGetter: ({value}) => (<Link to={`/PS/${value}`}><VisibilityOutlinedIcon sx={{color: '#99ACBB'}}/></Link>) },
];

