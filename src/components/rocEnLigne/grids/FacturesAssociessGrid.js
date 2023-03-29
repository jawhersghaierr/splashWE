import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { columns } from "./facturesAssociessGridColumns";
import { useGetFacturesQuery } from "../../factures/services/facturesApi";
import FacturesDetailsById from "../../factures/FacturesDetailsById";
import { allowSearch } from "../../../utils/validator-utils";
import { SubGrid } from "../../shared/grids";
import "../../shared/styles/grid.scss";

export const FacturesAssociessGrid = ({ engagements, nomRefs, noModal }) => {
  const criterias = { numEng: engagements.join() };
  const [currentPage, setCurrentPage] = useState(0);
  const [sortProperties, setSortProperties] = useState({
    sortDirection: null,
    sortProperty: null,
  });

  const { data, isFetching, isSuccess, isError, error } = useGetFacturesQuery(
    { currentPage, criterias, sortProperties },
    { skip: !allowSearch(criterias) }
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };
  const handleOrdering = (value) => {
    setSortProperties({
      sortProperty: value[0]?.field || null,
      sortDirection: value[0]?.sort?.toUpperCase() || null,
    });
  };

  const [openModal, setOpenModal] = useState({ open: false, data: null });
  const handleModalOpen = (data = null) => {
    if (data && noModal) setOpenModal({ open: true, data });
  };
  const handleModalClose = () => {
    setOpenModal({ open: false, data: null });
  };
  console.log("engagements > ", engagements);
  console.log("data > ", data);

  return (
    <SubGrid
      showNoGridResultsAlert={(isSuccess && data?.meta?.status == 204) || !engagements || engagements?.length == 0}
      showCircularProgress={isFetching}
      showGrid={isSuccess}
      showPagination={true}
      rows={data?.results}
      columns={columns({nomRefs, handleModalOpen})}
      pageSize={20}
      currentPage={currentPage}
      totalPages={data?.totalPages}
      disableColumnMenu={true}
      disableColumnResize={false}
      hideFooter={true}
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
      sortingMode="server"
      onSortModelChange={handleOrdering}
      handlePageChange={handlePageChange}
      showModalInfo={true}
      openModal={openModal}
      handleModalClose={handleModalClose}
      showModalComponent={openModal?.data}
      modalComponent={<FacturesDetailsById modalId={openModal?.data?.id} />}
      showMoreThan200Results={true}
      data={data}
      error={error}
      isSuccess={isSuccess}
      isError={isError}
    />
  );

};
