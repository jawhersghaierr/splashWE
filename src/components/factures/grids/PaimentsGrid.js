import React from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./paimentsGridColumns";
import './facturesGrid.scss';
import {useGetPaiementsFacturesByIdQuery} from "../services/paiementsApi";


export const PaimentsGrid = ({numFac}) => {

    let {data} = useGetPaiementsFacturesByIdQuery(numFac)


    return <div style={{margin: 0}}>

        <DataGrid
            rows={data?.elements || []}
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

    </div>
}

