import React from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./actesGridColumns";
import './facturesGrid.scss';

export const ActesGrid = ({data, nomRefs}) => {
    let _data = {
        id: 'total',
        ligne: <b>Totaux</b>,
        ro: 0,
        depense: 0,
        rc: 0,
        rac: 0,
    }

    data.forEach(el => {
        _data.ro += el.ro
        _data.depense += el.depense
        _data.rc += el.rc
        _data.rac += el.rac
    })

    return <DataGrid
                    rows={[...data, _data] || []}
                    columns={columns(nomRefs)}
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
                    sx={{ '& .boldValue': { fontWeight: 'bold', },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textOverflow: "clip",
                            whiteSpace: "break-spaces",
                            lineHeight: 1
                        },
                    }}


    />
}

