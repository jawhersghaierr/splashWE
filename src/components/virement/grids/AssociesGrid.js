import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import { columns } from "./associesGridColumns";
import VirementDetailsById from "../VirementDetailsById";
import PaiementDetailsById from "../../paiement/PaiementDetailsById";
import { SubGrid } from "../../shared/grids";
import "./virementsGrid.scss";

export const AssociesGrid = ({ data, nomRefs, noModal }) => {
  const [openModal, setOpenModal] = useState({ open: false, data: null });
  const handleModalOpen = (data = null) => {
    if (noModal) setOpenModal({ open: true, data });
  };
  const handleModalClose = () => {
    setOpenModal({ open: false, data: null });
  };

  return (
    <SubGrid
      showNoGridResultsAlert={!data}
      showGrid={data}
      rows={data}
      columns={columns({ nomRefs, handleModalOpen })}
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
      showModalComponent={openModal?.data?.type}
      modalComponent={
        openModal?.data?.type == "PAIEMENT" ? (
          <PaiementDetailsById modalId={openModal?.data?.id} />
        ) : openModal?.data?.type == "VIREMENT" ? (
          <VirementDetailsById modalId={openModal?.data?.id} />
        ) : null
      }
    />
  );

//   if (!data) return <NoGridResultsAlert />;

//   return (
//     <div style={{ margin: 0 }}>
//       {data && (
//         <DataGrid
//           rows={data || []}
//           columns={columns({ nomRefs, handleModalOpen })}
//           pageSize={20}
//           autoHeight
//           disableColumnMenu={true}
//           disableColumnResize={false}
//           components={{
//             NoRowsOverlay: () => (
//               <Stack height="75px" alignItems="center" justifyContent="center">
//                 <b>Aucun résultat pour ces critères de recherche</b>
//               </Stack>
//             ),
//           }}
//           getRowClassName={(params) =>
//             params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
//           }
//           onCellClick={(params, event) => {
//             event.defaultMuiPrevented = true;
//           }}
//           sx={{
//             "& .boldValue": { fontWeight: "bold" },
//             "& .MuiDataGrid-columnHeaderTitle": {
//               textOverflow: "clip",
//               whiteSpace: "break-spaces",
//               lineHeight: 1,
//             },
//           }}
//         />
//       )}
//       <ModalInfo
//         openModal={openModal}
//         handleModalClose={handleModalClose}
//         modalTitle={`modal-title-${openModal?.data?.type}`}
//       >
//         {openModal?.data?.type == "PAIEMENT" && (
//           <PaiementDetailsById modalId={openModal?.data?.id} />
//         )}
//         {openModal?.data?.type == "VIREMENT" && (
//           <VirementDetailsById modalId={openModal?.data?.id} />
//         )}
//       </ModalInfo>
//     </div>
//   );
};
