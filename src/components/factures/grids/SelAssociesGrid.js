import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { columns } from "./selAssociesGridColumns";
import { useGetSelsAndIdbOfFactureEngNQuery } from "../services/selAndIdbApi";
import RocEnLigneDetailsById from "../../rocEnLigne/RocEnLigneDetailsById";
import { SubGrid } from "../../shared/grids";

export const SelAssociesGrid = ({ numEng, noModal }) => {
  let { data, isFetching, isSuccess, isError, error } =
    useGetSelsAndIdbOfFactureEngNQuery(numEng);

  const [openModal, setOpenModal] = useState({ open: false, data: null });
  const handleModalOpen = (data = null) => {
    if (noModal) setOpenModal({ open: true, data });
  };
  const handleModalClose = () => {
    setOpenModal({ open: false, data: null });
  };

  return (
    <SubGrid
      showNoGridResultsAlert={isSuccess && !data?.assosieteList}
      showCircularProgress={isFetching}
      showGrid={isSuccess && data}
      rows={data?.assosieteList}
      columns={columns({ handleModalOpen })}
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
      showModalComponent={openModal?.data?.id}
      modalComponent={<RocEnLigneDetailsById modalId={openModal?.data?.id} />}
      showMoreThan200Results={true}
      data={data}
      error={error}
      isSuccess={isSuccess}
      isError={isError}
    />
  );

};
