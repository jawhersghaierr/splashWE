import React, {useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./associesGridColumns";
import VirementDetailsById from "../../virement/VirementDetailsById";
import {useGetRefsQuery} from "../../../services/refsApi";
import { ModalInfo, NoGridResultsAlert } from "../../shared";
import './paiementsGrid.scss';

export const AssociesGrid = ({data, noModal}) => {

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        if (noModal) setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    if (!data) return <NoGridResultsAlert/>

    return <div style={{margin: 0}}>

        {nomRefs && <DataGrid
                    rows={data || []}
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
                    sx={{ '& .boldValue': { fontWeight: 'bold', },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textOverflow: "clip",
                            whiteSpace: "break-spaces",
                            lineHeight: 1
                        },
                    }}
        />}

        <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
            {(openModal?.data?.type == 'VIREMENT') && <VirementDetailsById modalId={openModal?.data?.id} />}
        </ModalInfo>
    </div>
}

