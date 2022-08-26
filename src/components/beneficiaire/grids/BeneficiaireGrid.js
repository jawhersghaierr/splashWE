import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {useGetBenefQuery} from "../services/beneficiaireApi";
import {Typography} from "@mui/material";
import {DataGrid, gridClasses } from '@mui/x-data-grid';

import { selectCriterias } from '../beneficiaireSlice'

import {columns} from "./gridColumns";
import './beneficiaireGrid.scss';

import {checker, usePrevious} from '../utils/utils'
import mainPS from "../../../../assets/PS.png";

export const BeneficiaireGrid = ({enviroments}) => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const {data} = useGetBenefQuery({currentPage, criterias, sortProperties}, {skip: !checker(criterias)});

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


    return <div className="gridContent">

        {(data && enviroments) && <div>
            <div style={{margin: '25px'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage*20+1} - {currentPage*20 + ((Number(currentPage + 1) == Number(data.totPages))? Number(data.totElements) - currentPage*20 : 20)} sur {data.totElements} résultats
                </Typography>
            </div>
            <DataGrid
                rows={data?.result || []}
                columns={columns(enviroments)}
                pageSize={20}
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
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    },

                }}
                rowHeight={85}
            />
        </div>}

        {!data && <img  src={mainPS} alt="mainPS" className={'imgContext'}/>}

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

    </div>
}

