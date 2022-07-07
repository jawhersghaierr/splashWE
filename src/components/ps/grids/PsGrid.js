import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import {useGetEtsQuery} from "../services/psApi";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';


import {
    selectNumCriterias,
    selectCriterias
} from '../psSlice'

import './psGrid.scss'

export const PsGrid = ({handleGetById}) => {

    const criterias = useSelector(selectCriterias);
    const numCriterias = useSelector(selectNumCriterias);
    const [fistSkip, setFirstSkip] = useState(true);
    const prevCriterias = usePrevious(criterias)
    const [currentPage, setCurrentPage] = useState( 0);
    const {data} = useGetEtsQuery({currentPage, criterias}, {skip: fistSkip});

    const handlePageChange = (event, value) => {
        setCurrentPage(value-1)
    };

    useEffect(() => {

        if (numCriterias > 0 ) {
            if (data && JSON.stringify(criterias) !== JSON.stringify(prevCriterias) && currentPage > 0 ) {
                setFirstSkip(true);
                setCurrentPage(0)
            } else {
                setFirstSkip(false)
            }
        }
    }, [criterias, currentPage]);




    //TODO split in const file!
    const columns = [
        // { field: 'id', headerName: 'ID', width: 150 },
        { field: 'numPartenaire', headerName: 'numPartenaire', width: 150 },
        { field: 'raisonSociale', headerName: 'raisonSociale', width: 300 },
        { field: 'disciplines', headerName: 'disciplines', width: 150 },
        { field: 'codePostal', headerName: 'codePostal', width: 150 },
        { field: 'ville', headerName: 'ville', width: 300, renderCell: (params) => (
            <Button>{params.formattedValue}</Button>
        ),},
        { field: 'statutRibs', headerName: 'statutRibs', width: 350, renderCell: (params) => (
            <div>{JSON.stringify(params.formattedValue)}</div>
        )},
    ];


    return <div className="gridContent">

        {data && <div>
            <Typography variant="h6" noWrap component="div" sx={{margin: '0 0 25px 25px', color: '#99ACBB'}}>
                {currentPage*10+1} - {currentPage*10 + ((Number(currentPage + 1) == Number(data.totPages))? Number(data.totElements) - currentPage*10 : 10)} sur {data.totElements} résultats
            </Typography>
            <DataGrid
                rows={data.data || []}
                columns={columns}
                pageSize={10}
                autoHeight
                hideFooter={true}
                onCellClick={(params, event) => {
                    event.defaultMuiPrevented = true;
                    handleGetById(params)
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                }
            />
        </div>}

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

    </div>
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    },[value]);
    return ref.current;
}
export default usePrevious;
