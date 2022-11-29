import React, { useState } from "react";
import Stack from "@mui/material/Stack";
// import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./selAssociesGridColumns";
// import { ModalInfo, NoGridResultsAlert } from "../../shared";
import RocEnLigneDetailsById from "../RocEnLigneDetailsById";
import { SubGrid } from "../../shared/grids";

export const SelAssociesGrid = ({ selAssosiete, nomRefs, noModal }) => {
  const [openModal, setOpenModal] = useState({ open: false, data: null });
  const handleModalOpen = (data = null) => {
    if (noModal) setOpenModal({ open: true, data });
  };
  const handleModalClose = () => {
    setOpenModal({ open: false, data: null });
  };

  return (
    <SubGrid
      showNoGridResultsAlert={!selAssosiete || selAssosiete?.length == 0}
      showGrid={true}
      rows={selAssosiete}
      columns={columns({ handleModalOpen, nomRefs })}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableColumnMenu={true}
      disableColumnResize={false}
      components={{
        NoRowsOverlay: () => (
          <Stack height="75px" alignItems="center" justifyContent="center">
            <b>Aucun résultat pour ces critères de recherche</b>
          </Stack>
        ),
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
      }
      onCellClick={(params, event) => {
        event.defaultMuiPrevented = true;
      }}
      showModalInfo={true}
      openModal={openModal}
      handleModalClose={handleModalClose}
      showModalComponent={openModal?.data?.id}
      modalComponent={<RocEnLigneDetailsById modalId={openModal?.data?.id} />}
    />
  );

//   if (!selAssosiete || selAssosiete?.length == 0) return <NoGridResultsAlert/>

//   return <div style={{margin: 0}}>

//       <DataGrid
//           rows={selAssosiete || []}
//           columns={columns({handleModalOpen, nomRefs})}
//           pageSize={20}
//           autoHeight
//           disableColumnMenu={true}
//           disableColumnResize={false}
//           components={{
//               NoRowsOverlay: () => (
//                   <Stack height="75px" alignItems="center" justifyContent="center">
//                       <b>Aucun résultat pour ces critères de recherche</b>
//                   </Stack>
//               )
//           }}
//           getRowClassName={(params) =>
//               params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
//           }
//           onCellClick={(params, event) => {
//               event.defaultMuiPrevented = true;
//           }}
//           sx={{ '& .boldValue': { fontWeight: 'bold', },
//               '& .MuiDataGrid-columnHeaderTitle': {
//                   textOverflow: "clip",
//                   whiteSpace: "break-spaces",
//                   lineHeight: 1
//               },
//           }}

//       />
//       <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-title-${openModal?.data?.type}`}>
//           {openModal?.data?.id && <RocEnLigneDetailsById modalId={openModal?.data?.id} />}
//       </ModalInfo>

//   </div>
};
