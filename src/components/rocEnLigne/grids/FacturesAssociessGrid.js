import React, {useEffect, useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./facturesAssociessGridColumns";
import './rocEnLigneGrid.scss';
import {ModalInfo} from "../../../utils/ModalInfo";
import {useGetFacturesQuery} from "../../factures/services/facturesApi";
import {checker} from "../../factures/utils/utils";
import Pagination from "@mui/material/Pagination";
import FacturesDetailsById from "../../factures/FacturesDetailsById";


export const FacturesAssociessGrid = ({engagements, nomRefs}) => {

    const criterias = {numEng: engagements.join()}
    const [currentPage, setCurrentPage] = useState( 0);
    const [sortProperties, setSortProperties] = useState({
        sortDirection: null,
        sortProperty: null
    });

    const size = 20;

    const {data} = useGetFacturesQuery({currentPage, criterias, sortProperties}, {skip: !checker(criterias)});

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
        if (data) setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };

    return <div style={{margin: 0}}>

        <DataGrid
            rows={data?.results || []}
            columns={columns({nomRefs, handleModalOpen})}
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

        {data && <Stack spacing={2} sx={{margin: '25px'}}>
            <Pagination
                count={data.totalPages}
                page={currentPage+1}
                onChange={handlePageChange}
            />
        </Stack>}


        <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
            {(openModal?.data) && <FacturesDetailsById modialId={openModal?.data?.id} />}
        </ModalInfo>

    </div>
}
