import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { columns } from "./beneficiaireGridColumns";
import { selectCriterias } from "../beneficiaireSlice";
import { useGetBenefQuery } from "../services/beneficiaireApi";
import { usePrevious } from "../../../utils/status-utils";
import { allowSearch } from "../../../utils/validator-utils";
import "./beneficiaireGrid.scss";
import { MainGrid } from "../../shared/grids";
// import { DataGrid } from '@mui/x-data-grid';
// import { CircularProgress, Pagination, Typography } from "@mui/material";
// import { MoreThan200Results, NoSearchResultsAlert } from "../../shared";
// import mainPS from "../../../../assets/PS.png";

export const BeneficiaireGrid = ({ enviroments }) => {
  const criterias = useSelector(selectCriterias);
  const prevCriterias = usePrevious(criterias);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortProperties, setSortProperties] = useState({
    sortDirection: null,
    sortProperty: null,
  });

  const { data, isFetching, isSuccess, isError, error } = useGetBenefQuery(
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
      showNoSearchResultsAlert={
        !isFetching && isSuccess && data?.result?.length == 0
      }
      showCircularProgress={isFetching}
      showGridHeader={true}
      showGrid={!isFetching && isSuccess && data?.totPages && data?.totElements}
      showPagination={!isFetching && isSuccess && data?.totPages > 1}
      showNoData={!data}
      showNoDataAdition={false}
      showDownload={false}
      gridHeaderStyle={{ margin: "25px" }}
      rows={data?.result}
      columns={columns(enviroments)}
      pageSize={20}
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
      rowHeight={85}
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

  // if (!isFetching && isSuccess && data && data?.result?.length == 0) return <NoSearchResultsAlert/>
  // if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

  // return <div className="gridContent">

  //     {!isFetching && isSuccess && data?.totPages && data?.totElements && <div>
  //         <div style={{margin: '25px'}}>
  //             <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
  //                 {currentPage*20+1} - {currentPage*20 + ((Number(currentPage + 1) == Number(data.totPages))? Number(data.totElements) - currentPage*20 : 20)} sur {data.totElements} résultats
  //             </Typography>
  //         </div>
  //         <DataGrid
  //             rows={data?.result || []}
  //             columns={columns(enviroments)}
  //             pageSize={20}
  //             autoHeight
  //             hideFooter={true}
  //             disableColumnMenu={true}
  //             disableColumnResize={false}
  //             components={{
  //                 NoRowsOverlay: () => (
  //                     <Stack height="75px" alignItems="center" justifyContent="center">
  //                         <b>Aucun résultat pour ces critères de recherche</b>
  //                     </Stack>
  //                 )
  //             }}
  //             getRowClassName={(params) =>
  //                 params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
  //             }
  //             onCellClick={(params, event) => {
  //                 event.defaultMuiPrevented = true;
  //             }}

  //             sortingMode="server"
  //             onSortModelChange={handleOrdering}
  //             sx={{
  //                 '& .MuiDataGrid-columnHeaderTitle': {
  //                     textOverflow: "clip",
  //                     whiteSpace: "break-spaces",
  //                     lineHeight: 1
  //                 },
  //                 '& .boldValue': {fontWeight: 'bold',},
  //             }}
  //             rowHeight={85}
  //         />
  //     </div>}

  //     {!data && <img  src={mainPS} alt="mainPS" className={'imgContext'}/>}

  //     {!isFetching && isSuccess && data?.totPages > 1 && <Stack spacing={2} sx={{margin: '25px'}}>
  //         <Pagination
  //             count={data.totPages}
  //             page={currentPage+1}
  //             onChange={handlePageChange}
  //         />
  //     </Stack>}

  //     <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>

  // </div>
};
