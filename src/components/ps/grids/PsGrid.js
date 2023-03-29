import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { useGetEtsQuery } from "../services/psApi";
import { selectCriterias } from "../psSlice";
import { columns } from "./psGridColumns";
import { usePrevious } from "../../../utils/status-utils";
import { allowSearch } from "../../../utils/validator-utils";
import { MainGrid } from "../../shared/grids";
import "./psGrid.scss";

export const PsGrid = ({ disciplines, disciplinesIsFetching }) => {
  const criterias = useSelector(selectCriterias);
  const prevCriterias = usePrevious(criterias);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortProperties, setSortProperties] = useState({
    sortDirection: null,
    sortProperty: null,
  });

  const { data, isFetching, isSuccess, isError, error } = useGetEtsQuery(
    { currentPage, criterias, sortProperties },
    { skip: !allowSearch(criterias), forceRefetch: true }
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

  useEffect(() => {
    if (
      data &&
      JSON.stringify(criterias) !== JSON.stringify(prevCriterias) &&
      currentPage > 0
    ) {
      setCurrentPage(0);
    }
  }, [criterias, currentPage]);

  return (
    <MainGrid
      showNoSearchResultsAlert={isSuccess && (!data || data.totElements == 0)}
      showCircularProgress={isFetching || disciplinesIsFetching}
      showGridHeader={true}
      showGrid={isSuccess && disciplines}
      showPagination={data}
      showNoData={!data}
      showNoDataAdition={true}
      showDownload={false}
      gridHeaderStyle={{ margin: "25px" }}
      rows={data?.data}
      columns={columns(disciplines)}
      pageSize={10}
      totalPages={data?.totPages}
      totalElements={data?.totElements}
      currentPage={currentPage}
      hideFooter={true}
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
      sortingMode="server"
      onSortModelChange={handleOrdering}
      handlePageChange={handlePageChange}
      showMoreThan200Results={true}
      data={data}
      error={error}
      isSuccess={isSuccess}
      isError={isError}
    />
  );

};
