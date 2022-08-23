import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {useGetFacturesQuery} from "../services/facturesApi";
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

import { selectCriterias } from '../facturesSlice'

import {columns} from "./gridFacturesColumns";
import './facturesGrid.scss';

import {checker, usePrevious} from '../utils/utils'
import mainPS from "../../../../assets/PS.png";

export const FacturesGrid = ({disciplines}) => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const {data} = useGetFacturesQuery({currentPage, criterias, sortProperties}, {skip: !checker(criterias)});

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

        {(data && disciplines) && <div>
            <div style={{margin: '25px'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage*10+1} - {currentPage*10 + ((Number(currentPage + 1) == Number(data.totPages))? Number(data.totElements) - currentPage*10 : 10)} sur {data.totElements} résultats
                </Typography>
            </div>
            <DataGrid
                rows={data.data || []}
                columns={columns(disciplines)}
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

            />
        </div>}

        {!data && <div>
            <img  src={mainPS} alt="mainPS" className={'imgContext'}/>
            <h2 style={{color: '#003154', position: 'relative', width: '400px', left: '605px', bottom: '545px'}}>
                Vous y trouverez toutes les informations pertinentes pour les professionnels de la santé du système.
            </h2>
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

