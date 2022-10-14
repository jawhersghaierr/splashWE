import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import { useGetIntraitablesQuery } from "../services/intraitablesApi";
import { CircularProgress, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import { selectCriterias } from '../intraitablesSlice'
import { columns } from "./columnsIntraitablesGrid";
import { usePrevious } from '../../../utils/status-utils';
import { allowSearch } from '../../../utils/validator-utils';
import { MoreThan200Results, NoSearchResultsAlert } from "../../shared/modals";
import './intraitablesGrid.scss';
import mainPS from "../../../../assets/PS.png";

export const IntraitablesGrid = () => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const {data, isFetching, isSuccess, isError, error} = useGetIntraitablesQuery({currentPage, criterias, sortProperties}, {skip: !allowSearch(criterias)});

    const handlePageChange = (event, value) => {
        setCurrentPage(value-1)
    };
    const handleOrdering = ( value) => {
        setSortProperties({
            sortProperty: value[0]?.field || null,
            sortDirection: value[0]?.sort?.toUpperCase() || null

        })
    };

    useEffect(() => {
        if (data && JSON.stringify(criterias) !== JSON.stringify(prevCriterias) && currentPage > 0 ) {
            setCurrentPage(0)
        }
    }, [criterias, currentPage]);

    console.log('data > ', data)
    if (!isFetching && isSuccess  && (!data || data?.meta?.status == 204)) return <NoSearchResultsAlert/>
    if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div className="gridContent">
        {isSuccess && <div style={{margin: '25px'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage*20+1} - {currentPage*20 + ((Number(currentPage + 1) == Number(data?.totalPages))? Number(data?.totalElements) - currentPage*20 : 20)} sur {data?.totallements} résultats
                </Typography>
            </div>}
        {isSuccess && <DataGrid
                rows={data?.data || []}
                columns={columns()}
                pageSize={20}
                autoHeight
                hideFooter={true}
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

                sortingMode="server"
                onSortModelChange={handleOrdering}
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

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totalPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

        <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>
        {!isSuccess && <img  src={mainPS} alt="mainPS" className={'imgContext'}/>}
    </div>
}

