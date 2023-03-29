import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { columns } from "./associesGridColumns";
import VirementDetailsById from "../../virement/VirementDetailsById";
import { useGetRefsQuery } from "../../../services/refsApi";
import { SubGrid } from "../../shared/grids";
import "./paiementsGrid.scss";

export const AssociesGrid = ({ data, noModal }) => {
  const [openModal, setOpenModal] = useState({ open: false, data: null });
  const handleModalOpen = (data = null) => {
    if (noModal) setOpenModal({ open: true, data });
  };
  const handleModalClose = () => {
    setOpenModal({ open: false, data: null });
  };
  const {
    data: nomRefs,
    isFetching: nomRefsIsFetching,
    isSuccess: nomRefsIsSuccess,
  } = useGetRefsQuery();

  return (
    <SubGrid
      showNoGridResultsAlert={!data}
      showGrid={nomRefs}
      rows={data}
      columns={columns({nomRefs, handleModalOpen})}
      pageSize={20}
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
      showModalComponent={openModal?.data?.type == 'VIREMENT'}
      modalComponent={<VirementDetailsById modalId={openModal?.data?.id} />}
    />
  );

};
