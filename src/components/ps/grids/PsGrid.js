import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {useGetEtsQuery} from "../services/psApi";
import {CircularProgress, Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import { selectCriterias } from '../psSlice'
import {columns} from "./psGridColumns";
import {usePrevious} from '../../../utils/status-utils';

import './psGrid.scss';


import mainPS from "../../../../assets/PS.png";
import { allowSearch } from '../../../utils/validator-utils';
import MoreThan200Results from "../../shared/MoreThan200Results";

export const PsGrid = ({disciplines, disciplinesIsFetching}) => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const {data, isFetching, isSuccess, isError, error} = useGetEtsQuery({currentPage, criterias, sortProperties}, {skip: !allowSearch(criterias), forceRefetch: true });

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

    if (isFetching || disciplinesIsFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div className="gridContent">

        {(isSuccess && disciplines) && <div>
            <div style={{margin: '25px'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage*10+1} - {currentPage*10 + ((Number(currentPage + 1) == Number(data?.totPages))? Number(data?.totElements) - currentPage*10 : 10)} sur {data?.totElements} résultats
                </Typography>
            </div>
            <DataGrid
                rows={data.data || []}
                columns={columns(disciplines)}
                pageSize={10}
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
                sx={{ '& .boldValue': { fontWeight: 'bold', },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    },
                }}

                sortingMode="server"
                onSortModelChange={handleOrdering}

            />
        </div>}

        {!data && <div>
            <img  src={mainPS} alt="mainPS" className={'imgContext'}/>
            <h2 style={{color: '#003154', position: 'relative', width: '400px', left: '605px', bottom: '545px'}}>
                Vous y trouverez toutes les informations pertinentes pour les professionnels de la santé du système.
            </h2>
        </div>}

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

        <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>

    </div>
}

