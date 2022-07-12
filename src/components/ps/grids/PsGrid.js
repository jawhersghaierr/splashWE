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
import Tooltip from '@mui/material/Tooltip';

import {
    selectNumCriterias,
    selectCriterias
} from '../psSlice'

import './psGrid.scss';

const statuses = {
    NA: 'Inactif (gray)',
    ATT: 'En attente (orange)',
    ACT: 'Validé (green)',
    REF: 'Refusé (red)',
    MIS: 'Manquant (blue)'
}

export const PsGrid = ({handleGetById}) => {

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
    const columns = [
        // { field: 'id', headerName: 'ID', width: 150 },
        { field: 'numPartenaire', headerName: '№ de partenaire', width: 150 },
        { field: 'statutRibs', headerName: 'Statut Rib', width: 95, renderCell: (params) => {
                let chipLabel = params.formattedValue[0]?.count || null;
                let RibLabel = params.formattedValue[0]?.statutRib || '';
                let txt = `${JSON.stringify(params.formattedValue)}` || ''
                return (
                    <Tooltip
                        title={<div style={{ whiteSpace: 'pre-line' }}> {txt}</div>}
                        placement="top"
                        arrow>
                            <div>
                                {chipLabel && <Chip label={chipLabel}
                                       sx={{bgcolor: '#FF5D5D', color: 'white'}}
                                />} &nbsp;
                                {RibLabel && RibLabel}
                            </div>
                    </Tooltip>
                )
        }},
        { field: 'raisonSociale', headerName: 'Raison Sociale', minWidth: 200, flex: 1 },
        { field: 'disciplines', headerName: 'Discipline(s)', width: 175, renderCell: (params) => {
                // const discipl = params.formattedValue.split(',') || null;
                const discipl = params.formattedValue || null;

                let RibLabel = (discipl && discipl.length > 0)? 'Multi-disciplines' : discipl[0];
                let txt = discipl.join(' \n') || ''
                return (
                    <div>{(discipl && (discipl.length > 1)) &&
                    <Tooltip
                        title={<div style={{ whiteSpace: 'pre-line' }}> {txt}</div>}
                        placement="top"
                        arrow>
                            <Chip label={discipl.length}/>
                    </Tooltip>
                    } {RibLabel && RibLabel}
                    </div>
                )
        }},
        { field: 'codePostal', headerName: 'Code postal', width: 150 },
        { field: 'ville', headerName: 'Ville', width: 300, renderCell: (params) => (
            // <Button>{params.formattedValue}</Button>
            params.formattedValue
        ),},
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
