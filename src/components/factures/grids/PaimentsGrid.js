import React, {useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./paimentsGridColumns";
import {useGetPaiementsFacturesByIdQuery} from "../../paiement/services/paiementsApi";
import {ModalInfo} from "../../../utils/ModalInfo";
import PaiementDetailsById from "../../paiement/PaiementDetailsById";
import VirementDetailsById from "../../virement/VirementDetailsById";
import './facturesGrid.scss';


export const PaimentsGrid = ({factId, nomRefs}) => {

    let {data} = useGetPaiementsFacturesByIdQuery(factId)

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        if (data?.type == 'PAIEMENT' || data?.type == 'VIREMENT') setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };


    return <div style={{margin: 0}}>

        <DataGrid
            rows={data?.elements || []}
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
            sx={{ '& .boldValue': { fontWeight: 'bold', },
                '& .MuiDataGrid-columnHeaderTitle': {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces",
                    lineHeight: 1
                },
            }}
        />
        <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
            {(openModal?.data?.type == 'PAIEMENT') && <PaiementDetailsById modialId={openModal?.data?.id} />}
            {(openModal?.data?.type == 'VIREMENT') && <VirementDetailsById modialId={openModal?.data?.id} />}
        </ModalInfo>
    </div>
}

