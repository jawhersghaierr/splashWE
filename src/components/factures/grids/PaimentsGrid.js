import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {useGetFacturesQuery} from "../services/facturesApi";
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

import { selectCriterias } from '../facturesSlice'

import {columns} from "./paimentsGridColumns";

import './facturesGrid.scss';

import {checker, usePrevious} from '../utils/utils'

export const SelAssociesGrid = ({data}) => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });


    const handlePageChange = (event, value) => {
        setCurrentPage(value-1)
    };
    const handleOrdering = ( value) => {
        setSortProperties({
            sortProperty: value[0]?.field || null,
            sortDirection: value[0]?.sort?.toUpperCase() || null
        })
    };

    useEffect(() => {

            if (data && JSON.stringify(criterias) !== JSON.stringify(prevCriterias) && currentPage > 0 ) {
                setCurrentPage(0)
            }

    }, [criterias, currentPage]);


    return <div style={{margin: 0}}>

        {data && <DataGrid
                    rows={data || []}
                    columns={columns()}
                    pageSize={10}
                    autoHeight
                    hideFooter={true}
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
                    onCellClick={(params, event) => {
                        event.defaultMuiPrevented = true;
                    }}

                    sortingMode="server"
                    onSortModelChange={handleOrdering}
        />}


        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totalPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

    </div>
}

