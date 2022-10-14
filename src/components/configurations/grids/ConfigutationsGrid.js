import React from 'react'
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid';
import { columns } from "./configutationGridColumns";
import { getConfigurations } from "../configurationsSlice";
import { NoSearchResultsAlert } from "../../shared/modals";
import './configutationGrid.scss';

export const ConfigutationsGrid = ({data, nomRefs, domain, code}) => {

    const configurations = useSelector(getConfigurations);

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

