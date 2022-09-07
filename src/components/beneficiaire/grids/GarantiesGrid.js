import React from 'react'

import Stack from '@mui/material/Stack'
import {DataGrid, gridClasses } from '@mui/x-data-grid';

import './beneficiaireGrid.scss';
import {simpleGarantieColumns, complexGarantieColumns} from "./gridGarantiesColumns";

export const GarantiesGrid = ({garanties, nom, simple = true}) => {

    return <div className="gridContent">

        {(garanties && nom) &&
            <DataGrid
                rows={garanties || []}
                columns={simple ? simpleGarantieColumns(nom): complexGarantieColumns(nom)}
                pageSize={10}
                autoHeight
                hideFooter={true}
                disableColumnResize={false}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="75px" alignItems="center" justifyContent="center">
                            <b>Aucun résultat</b>
                        </Stack>
                    )
                }}
                getRowClassName={(params) => {
                    console.log('params ROW ', params)
                    return params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                }}
                // sortingMode="server"
                // onSortModelChange={handleOrdering}
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    },
                    '& .boldValue': { fontWeight: 'bold' }
                }}
                rowHeight={85}
            />}


    </div>
}

