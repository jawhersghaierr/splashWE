import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack'

import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./columnsConfigutationGrid";

import {getConfigurations, setConfig} from "../configurationsSlice";
import './configutationGrid.scss';


export const GridConfigutation = ({data, nomRefs, domain, code}) => {
    const dispatch = useDispatch();
    const configItem = (value) => {
        dispatch(setConfig(value));
    };
    const configurations = useSelector(getConfigurations);

    // console.log(data)

    return <div className="gridContent">

        {data && <DataGrid
                rows={data.results || []}
                columns={columns({nomRefs, configurations, domain, code})}
                pageSize={20}
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
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    },
                    '& .boldValue': { fontWeight: 'bold' }
                }}
            />}

    </div>
}

