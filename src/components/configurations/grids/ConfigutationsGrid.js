import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {CircularProgress, Typography} from "@mui/material";
import Stack from '@mui/material/Stack'

import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./configutationGridColumns";

import {getConfigurations, setConfig} from "../configurationsSlice";
import './configutationGrid.scss';

import {NoSearchResultsAlert} from "../../shared/NoSearchResultsAlert";



export const ConfigutationsGrid = ({data, nomRefs, domain, code}) => {
    const dispatch = useDispatch();
    const configItem = (value) => {
        dispatch(setConfig(value));
    };

    const configurations = useSelector(getConfigurations);
console.log(data)
    if (!data || data?.result?.length == 0) return <NoSearchResultsAlert/>

    return <div className="gridContent">

        <DataGrid
                rows={data.results || []}
                columns={columns({nomRefs, configurations, domain, code})}
                pageSize={20}
                autoHeight
                disableColumnMenu={true}
                disableColumnResize={false}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'label', sort: 'asc' }],
                    },
                }}
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
            />

    </div>
}

