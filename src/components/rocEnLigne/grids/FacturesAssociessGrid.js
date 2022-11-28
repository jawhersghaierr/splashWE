import React, {useEffect, useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./facturesAssociessGridColumns";
import Pagination from "@mui/material/Pagination";
import {CircularProgress} from "@mui/material";
import {useGetFacturesQuery} from "../../factures/services/facturesApi";
import FacturesDetailsById from "../../factures/FacturesDetailsById";
import { allowSearch } from '../../../utils/validator-utils';
import { ModalInfo, MoreThan200Results, NoGridResultsAlert } from "../../shared";
import '../../shared/styles/grid.scss';


export const FacturesAssociessGrid = ({engagements, nomRefs, noModal}) => {

    const criterias = {numEng: engagements.join()}
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });


    const {data, isFetching, isSuccess, isError, error} = useGetFacturesQuery({currentPage, criterias, sortProperties}, {skip: !allowSearch(criterias)});

    const handlePageChange = (event, value) => {
        setCurrentPage(value-1)
    };
    const handleOrdering = ( value) => {
        setSortProperties({
            sortProperty: value[0]?.field || null,
            sortDirection: value[0]?.sort?.toUpperCase() || null
        })
    };

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        if (data && noModal) setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };
    console.log('engagements > ', engagements)
    console.log('data > ', data)

    if ((isSuccess && data?.meta?.status == 204) || !engagements || engagements?.length == 0) return <NoGridResultsAlert/>
    if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div style={{margin: 0}}>
        {isSuccess && <DataGrid
            rows={data?.results || []}
            columns={columns({nomRefs, handleModalOpen})}
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

            sortingMode="server"
            onSortModelChange={handleOrdering}

            sx={{
                '& .boldValue': {fontWeight: 'bold',},
                '& .MuiDataGrid-columnHeaderTitle': {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces",
                    lineHeight: 1
                },
            }}
        />}

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totalPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}

        <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
            {(openModal?.data) && <FacturesDetailsById modalId={openModal?.data?.id} />}
        </ModalInfo>

        <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>

    </div>
}

