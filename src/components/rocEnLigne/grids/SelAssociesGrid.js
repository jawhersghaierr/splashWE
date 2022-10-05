import React, {useEffect, useRef, useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./selAssociesGridColumns";
import './rocEnLigneGrid.scss';
import {ModalInfo} from "../../shared/ModalInfo";
import RocEnLigneDetailsById from "../RocEnLigneDetailsById";

export const SelAssociesGrid = ({selAssosiete, nomRefs}) => {

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };
console.log('assosiete > ', selAssosiete)

    return <div style={{margin: 0}}>

        <DataGrid
            rows={selAssosiete || []}
            columns={columns({handleModalOpen, nomRefs})}
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
        <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
            {openModal?.data?.id && <RocEnLigneDetailsById modialId={openModal?.data?.id} />}
        </ModalInfo>

    </div>
}

