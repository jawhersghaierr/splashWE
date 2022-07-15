import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {useGetEtsQuery} from "../services/psApi";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { purple, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {statusesRIB, statusRow} from '../utils/utils'

import {
    selectNumCriterias,
    selectCriterias
} from '../psSlice'

import './psGrid.scss';


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


export const PsGrid = ({handleGetById, disciplines}) => {

    const criterias = useSelector(selectCriterias);
    const numCriterias = useSelector(selectNumCriterias);
    const [fistSkip, setFirstSkip] = useState(true);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const {data} = useGetEtsQuery({currentPage, criterias}, {skip: fistSkip});

    const handlePageChange = (event, value) => {
        setCurrentPage(value-1)
    };

    useEffect(() => {

        if (numCriterias > 0 ) {
            if (data && JSON.stringify(criterias) !== JSON.stringify(prevCriterias) && currentPage > 0 ) {
                setFirstSkip(true);
                setCurrentPage(0)
            } else {
                setFirstSkip(false)
            }
        }
    }, [criterias, currentPage]);

    //TODO split in const file!


    const popOverRibs = (ribs) => {
        return (<div style={{display: 'flex', flexDirection: 'column'}}>
                <h3 style={{margin: '5px'}}><b>Statut RIB</b></h3>
                {Object.keys(ribs).map((rib, index) => (
                    <Chip label={`${ribs[rib]?.count} ${ribs[rib]?.label}`} key={`fistChip${index}`}
                          sx={{bgcolor: ribs[rib]?.color, color: 'black', margin: '5px', padding: 0}}
                    />
                ))}
        </div>
        )
    }


    const columns = [
        // { field: 'id', headerName: 'ID', width: 150 },
        { field: 'numPartenaire', headerName: '№ de partenaire', width: 150 },
        { field: 'statutRibs', headerName: 'Statut Rib', width: 125, renderCell: (params) => {
                const statRow = statusRow(params.formattedValue)
                const shown = Object.keys(statRow).find(key => statRow[key].shown);
                return (
                    <LightTooltip
                        title={<div style={{ whiteSpace: 'pre-line' }}>{popOverRibs(statRow)}</div>}
                        placement="top" arrow>
                            <Chip label={`${statRow[shown]?.count} ${statRow[shown]?.label}`}
                                   sx={{bgcolor: statRow[shown]?.color, color: 'black'}}/>
                    </LightTooltip>
                )
        }},
        { field: 'raisonSociale', headerName: 'Raison Sociale', minWidth: 200, flex: 1 },
        { field: 'disciplines', headerName: 'Discipline(s)', width: 175, renderCell: (params) => {
                const discipl = params.formattedValue || null;

                let RibLabel = (discipl && discipl.length > 0)? 'Multi-disciplines' : discipl[0];

                let txt = discipl.map(s=>disciplines.find(e=>e.code==s)).map(e=>e.libelle).join(' \n') || ''

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
                    } {RibLabel && RibLabel}
                    </div>
                )
        }},
        { field: 'ville', headerName: 'Ville', width: 300, renderCell: (params) => (
                params.formattedValue
        )},
        { field: 'codePostal', headerName: 'Code postal', width: 150 },
    ];


    return <div className="gridContent">

        {data && <div>
            <Typography variant="h6" noWrap component="div" sx={{margin: '0 0 25px 25px', color: '#99ACBB'}}>
                {currentPage*10+1} - {currentPage*10 + ((Number(currentPage + 1) == Number(data.totPages))? Number(data.totElements) - currentPage*10 : 10)} sur {data.totElements} résultats
            </Typography>
            <DataGrid
                rows={data.data || []}
                columns={columns}
                pageSize={10}
                autoHeight
                hideFooter={true}
                onCellClick={(params, event) => {
                    event.defaultMuiPrevented = true;
                    handleGetById(params)
                }}
                disableColumnResize={false}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="75px" alignItems="center" justifyContent="center">
                            <b>Aucun résultat pour ces critères de recherche</b>
                        </Stack>
                    )
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                }
            />
        </div>}

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

    </div>
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    },[value]);
    return ref.current;
}
export default usePrevious;
