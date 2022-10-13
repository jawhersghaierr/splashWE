import React, {useState} from 'react'
import Stack from '@mui/material/Stack'
import {DataGrid} from '@mui/x-data-grid';
import {columns} from "./selAssociesGridColumns";
import {useGetSelsAndIdbOfFactureEngNQuery} from "../services/selAndIdbApi";
import {CircularProgress} from "@mui/material";
import {ModalInfo} from "../../shared/ModalInfo";
import RocEnLigneDetailsById from "../../rocEnLigne/RocEnLigneDetailsById";
import '../../shared/styles/grid.scss';
import MoreThan200Results from "../../shared/MoreThan200Results";
import {NoGridResultsAlert} from "../../shared/NoGridResultsAlert";

export const SelAssociesGrid = ({numEng, noModal}) => {

    let {data, isFetching, isSuccess, isError, error} = useGetSelsAndIdbOfFactureEngNQuery(numEng)

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        if (noModal) setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };

    if (isSuccess && !data?.assosiete) return <NoGridResultsAlert/>
    if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div style={{margin: 0}}>
        {isSuccess && data && <DataGrid
                    rows={data.assosiete || []}
                    columns={columns({handleModalOpen})}
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
            {openModal?.data?.id && <RocEnLigneDetailsById modalId={openModal?.data?.id} />}
        </ModalInfo>
        <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>

    </div>
}

