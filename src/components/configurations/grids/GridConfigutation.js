import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Stack from '@mui/material/Stack'
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

import {columns} from "./columnsConfigutationGrid";
import './configutationGrid.scss';


export const GridConfigutation = ({data}) => {


    return <div className="gridContent">

        {(data && data?.results) && <DataGrid
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
            />}

    </div>
}

