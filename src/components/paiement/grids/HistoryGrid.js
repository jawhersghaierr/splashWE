import React from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./historyGridColumns";
import { NoGridResultsAlert } from "../../shared";
import './paiementsGrid.scss';

export const HistoryGrid = ({data, nomRefs}) => {

    if (!data || data?.length == 0) return <NoGridResultsAlert/>

    return <DataGrid
                    rows={data || []}
                    columns={columns(nomRefs)}
                    pageSize={20}
                    autoHeight
                    disableColumnMenu={true}
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

