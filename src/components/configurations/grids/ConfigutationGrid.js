import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Stack from '@mui/material/Stack'
import {useGetFacturesQuery} from "../services/configurationsApi";
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

import {columns} from "./gridConfigutationColumns";
import './configutationGrid.scss';

import {checker, usePrevious} from '../utils/utils'

export const ConfigutationGrid = ({disciplines}) => {


    // const {data} = useGetFacturesQuery({currentPage, criterias, sortProperties}, {skip: !checker(criterias)});
    const data = null;



    return <div className="gridContent">

        {(data && data?.results) && <div>
            <div style={{margin: '25px'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage*10+1} - {currentPage*10 + ((Number(currentPage + 1) == Number(data.totalPages))? Number(data.totalElements) - currentPage*10 : 10)} sur {data.totalElements} résultats
                </Typography>
            </div>
            <DataGrid
                rows={data?.results || []}
                columns={columns()}
                pageSize={10}
                autoHeight
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
            />
        </div>}

    </div>
}

