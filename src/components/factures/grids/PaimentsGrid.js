import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { useGetPaiementsFacturesByIdQuery } from "../../paiement/services/paiementsApi";
import PaiementDetailsById from "../../paiement/PaiementDetailsById";
import VirementDetailsById from "../../virement/VirementDetailsById";
import { columns } from "./paimentsGridColumns";
import { SubGrid } from "../../shared/grids";

export const PaimentsGrid = ({ factId, nomRefs, noModal }) => {
  let { data, isFetching, isSuccess, isError, error } =
    useGetPaiementsFacturesByIdQuery(factId);

  const [openModal, setOpenModal] = useState({ open: false, data: null });
  const handleModalOpen = (data = null) => {
    if ((data?.type == "PAIEMENT" || data?.type == "VIREMENT") && noModal)
      setOpenModal({ open: true, data });
  };
  const handleModalClose = () => {
    setOpenModal({ open: false, data: null });
  };

  return (
    <SubGrid
      showNoGridResultsAlert={isSuccess && !data?.elementList}
      showCircularProgress={isFetching}
      showGrid={isSuccess}
      rows={data?.elementList}
      columns={columns({ nomRefs, handleModalOpen })}
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
      showModalComponent={openModal?.data?.type}
      modalComponent={
        openModal?.data?.type == "PAIEMENT" ? (
          <PaiementDetailsById modalId={openModal?.data?.id} />
        ) : openModal?.data?.type == "VIREMENT" ? (
          <VirementDetailsById modalId={openModal?.data?.id} />
        ) : null
      }
      showMoreThan200Results={true}
      data={data}
      error={error}
      isSuccess={isSuccess}
      isError={isError}
    />
  );

};
