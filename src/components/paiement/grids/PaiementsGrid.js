import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import { selectCriterias } from '../paiementSlice'
import {columns} from "./paiementGridColumns";
import {checker} from '../utils/utils'
import {usePrevious} from '../../../utils/utils'
import mainPS from "../../../../assets/PS.png";
import {useGetPaiementsQuery} from "../services/paiementsApi";

import './paiementsGrid.scss';

export const PaiementsGrid = ({disciplines}) => {

    const criterias = useSelector(selectCriterias);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const size = 20;

    const {data} = useGetPaiementsQuery({currentPage, criterias, sortProperties}, {skip: !checker(criterias)});

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


    return <div className="gridContent">

        {(data && data?.results) && <div>
            <div style={{margin: '25px'}}>
                <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
                    {currentPage * size + 1} - {currentPage * size + ((Number(currentPage + 1) == Number(data.totalPages))? Number(data.totalElements) - currentPage * size : size)} sur {data.totalElements} résultats
                </Typography>
            </div>
            <DataGrid
                rows={data?.results || []}
                columns={columns()}
                pageSize={size}
                autoHeight
                hideFooter={true}
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
                sx={{ '& .boldValue': { fontWeight: 'bold', },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    },
                }}
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
                count={data.totalPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

    </div>
}

