import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { columns } from "./rocEnLigneGridColumns";
import { selectCriterias } from "../rocEnLigneSlice";
import { useGetRocEnLigneQuery } from "../services/rocEnLigneApi";
import { usePrevious } from "../../../utils/status-utils";
import { useGetRefsQuery } from "../../../services/refsApi";
import { baseUrl } from "../services/rocEnLigneApi";
import { addCriteriasForGetRequest } from "../../../utils/utils";
import { reshapeCriterias } from "../utils/utils";
import { reverseMapRocEnLigne } from "./rocEnLigneGridColumns";
import { MainGrid } from "../../shared/grids";
import "../../shared/styles/grid.scss";

export const RocEnLigneGrid = () => {
  const criterias = useSelector(selectCriterias);
  const prevCriterias = usePrevious(criterias);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortProperties, setSortProperties] = useState({
    sortDirection: null,
    sortProperty: null,
  });

  const size = 20;

  const { data, isFetching, isSuccess, isError, error } = useGetRocEnLigneQuery(
    { currentPage, criterias, sortProperties }
  );
  const {
    data: nomRefs,
    isFetching: nomRefsIsFetching,
    isSuccess: nomRefsIsSuccess,
  } = useGetRefsQuery();

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };
  const handleOrdering = (value) => {
    setSortProperties({
      sortProperty: value[0]?.field || null,
      sortDirection: value[0]?.sort?.toUpperCase() || null,
    });
  };
  const downloadHref = `${window?._env_?.apiUrls?.downloadSelAndIdb}/download?target=${baseUrl}/${addCriteriasForGetRequest({
    url: "sel/rechercher",
    filters: reshapeCriterias({ criterias }),
    prepareForDownload: true,
  })}&columns=${Object.values(reverseMapRocEnLigne)}&mapping=${Object.keys(
    reverseMapRocEnLigne
  )}&dateFormat=dateNaissance`;

    useEffect(() => {

            if (data && JSON.stringify(criterias) !== JSON.stringify(prevCriterias) && currentPage > 0 ) {
                setCurrentPage(0)
            }

    }, [criterias, currentPage]);

    const [alertForMoreThan10000ResultsForDownload, setAlertForMoreThan10000ResultsForDownload] = useState(false);
    const openAlertForMoreThan10000ResultsForDownload = () => {
        setAlertForMoreThan10000ResultsForDownload(true)
    }
    const closeAlertForMoreThan10000ResultsForDownload = () => {
        setAlertForMoreThan10000ResultsForDownload(false)
    }

  return (
    <MainGrid
      showNoSearchResultsAlert={
        !isFetching &&
        isSuccess &&
        (!data?.resultList || data?.resultList?.length == 0)
      }
      showCircularProgress={isFetching || nomRefsIsFetching}
      showGridHeader={true}
      showGrid={isSuccess && data?.resultList && nomRefs}
      showPagination={isSuccess && data?.resultList && nomRefs}
      showNoData={!data}
      showNoDataAdition={true}
      showDownload={true}
      downloadHref={downloadHref}
      gridHeaderStyle={{
        margin: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      rows={data?.resultList}
      columns={columns({ nomRefs })}
      pageSize={size}
      currentPage={currentPage}
      totalPages={data?.totalPages}
      totalElements={data?.totalElements}
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
      showMoreThan10000ResultsForDownload={true}
      alertForMoreThan10000ResultsForDownload={alertForMoreThan10000ResultsForDownload}
      openAlertForMoreThan10000ResultsForDownload={openAlertForMoreThan10000ResultsForDownload}
      closeAlertForMoreThan10000ResultsForDownload={closeAlertForMoreThan10000ResultsForDownload}
    />
  );

};
