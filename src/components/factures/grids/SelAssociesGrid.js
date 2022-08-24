import React, {useEffect, useRef, useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./selAssociesGridColumns";
import './facturesGrid.scss';
import {useGetSelsAndIdbOfFactureEngNQuery} from "../services/selAndIdbApi";

export const SelAssociesGrid = ({numEng}) => {
    console.log('numEng > ', numEng)

    let {data} = useGetSelsAndIdbOfFactureEngNQuery(numEng)


    return <div style={{margin: 0}}>

        {data && <DataGrid
                    rows={data || []}
                    columns={columns()}
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

        />}

    </div>
}

