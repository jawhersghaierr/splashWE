import React, {useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./paimentsGridColumns";
import {useGetPaiementsFacturesByIdQuery} from "../../paiement/services/paiementsApi";
import {ModalInfo} from "../../shared/ModalInfo";
import PaiementDetailsById from "../../paiement/PaiementDetailsById";
import VirementDetailsById from "../../virement/VirementDetailsById";
import './facturesGrid.scss';
import {CircularProgress} from "@mui/material";
import MoreThan200Results from "../../shared/MoreThan200Results";
import {NoGridResultsAlert} from "../../shared/NoGridResultsAlert";


export const PaimentsGrid = ({factId, nomRefs, noModal}) => {

    let {data, isFetching, isSuccess, isError, error} = useGetPaiementsFacturesByIdQuery(factId)

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        if ((data?.type == 'PAIEMENT' || data?.type == 'VIREMENT') && noModal) setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };

    if (isSuccess && !data?.elements) return <NoGridResultsAlert/>
    if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div style={{margin: 0}}>

        {isSuccess && <DataGrid
            rows={data?.elements || []}
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
            sx={{
                '& .boldValue': {fontWeight: 'bold',},
                '& .MuiDataGrid-columnHeaderTitle': {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces",
                    lineHeight: 1
                },
            }}
        />}
        <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
            {(openModal?.data?.type == 'PAIEMENT') && <PaiementDetailsById modalId={openModal?.data?.id} />}
            {(openModal?.data?.type == 'VIREMENT') && <VirementDetailsById modalId={openModal?.data?.id} />}
        </ModalInfo>

        <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>
    </div>
}

