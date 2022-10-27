import Chip from "@mui/material/Chip";
import React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
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

const tip = (value, label) => {
    if (value?.length > 1 ) {
        return ( <div>
            <LightTooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{margin: '5px'}}><b>{`${label?.charAt(0)?.toUpperCase()}${label?.slice(1)?.toLowerCase()}`}</b></h3>
                    <div style={{minWidth: '135px', paddingLeft: '5px'}}> {value?.join(' \n') || ''} </div>
                </div>
            </div>} placement="top" arrow>

                <Chip label={value?.length}/>

            </LightTooltip>{` ${label?.toLowerCase()}`}
        </div> )}
    return value
}


export const columns = nomRefs => [
    { field: 'id', headerName: 'N°', flex: 1, width: 15, renderCell },
    { field: 'environmentSet', headerName: 'Environnement', flex: 1, renderCell, valueGetter: ({value}) => tip(value, 'Environnement') },
    { field: 'provenanceSet', headerName: 'Provenance', flex: 1,renderCell, valueGetter: ({value}) => (value?.join(', ')) },
    { field: 'disciplineSet', headerName: 'Discipline', flex: 1, renderCell, valueGetter: ({value}) => (value?.join(', ')) },
    { field: 'factureContexts', headerName: 'Contexte de la facture', flex: 1, renderCell, valueGetter: ({value}) => (value?.join(', ')) },
    { field: 'canalReceptionSet', headerName: 'Canal de réception', flex: 1, renderCell, valueGetter: ({value}) => (value?.join(', ')) },
    { field: 'dcsSet', headerName: 'Domaines d\'activités', flex: 1, renderCell, valueGetter: ({value}) => {
        let dcs = []
        value?.forEach((e)=>dcs.push(nomRefs.DCS[e] || e))
        return (dcs?.join(', ') || value);
    }},
    { field: 'isExclusionRule', headerName: 'Type de règle', flex: 1, type: 'number', sortable: false, renderCell, valueGetter: ({value}) => {
            if (value === true) {
                return 'Exclusion'
            } if (value === false) {
                return 'Inclusion'
            } else return ''
        } },
];

