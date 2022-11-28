import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { Button, CircularProgress, Link, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./rocEnLigneGridColumns";
import { selectCriterias } from "../rocEnLigneSlice";
import { useGetRocEnLigneQuery } from "../services/rocEnLigneApi";
import { usePrevious } from "../../../utils/status-utils";
import { useGetRefsQuery } from "../../../services/refsApi";
// import { NoSearchResultsAlert, MoreThan200Results } from "../../shared/modals";
// import mainPS from "../../../../assets/PS.png";
import '../../shared/styles/grid.scss';
import {env_IP, ports} from "../../../../env-vars";
import {baseUrl} from "../services/rocEnLigneApi";
import {addCriteriasForGetRequest} from "../../../utils/utils";
import {reshapeCriterias} from "../../factures/utils/utils";
import {reverseMapRocEnLigne} from "./rocEnLigneGridColumns";
// import download from "../../../../assets/icons/download-blue.svg";

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
  const downloadHref = `http://${env_IP}:${
    ports.download
  }/api/v1/download?target=${baseUrl}/${addCriteriasForGetRequest({
    url: "sel/search/",
    filters: reshapeCriterias({ criterias }),
    prepareForDownload: true,
  })}&columns=${Object.values(reverseMapRocEnLigne)}&mapping=${Object.keys(
    reverseMapRocEnLigne
  )}&dateFormat=dateNaiss`;

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
        !isFetching &&
        isSuccess &&
        (!data?.results || data?.results?.length == 0)
      }
      showCircularProgress={isFetching || nomRefsIsFetching}
      showGrid={isSuccess && data?.results && nomRefs}
      showNoData={!data}
      showDownload={true}
      downloadHref={downloadHref}
      gridHeaderStyle={{
        margin: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      rows={data?.results}
      columns={columns({ nomRefs })}
      pageSize={size}
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
      data={data}
      error={error}
      isSuccess={isSuccess}
      isError={isError}
    />
  );
  // if (!isFetching && isSuccess && (!data?.results || data?.results?.length == 0)) return <NoSearchResultsAlert/>
  // if (isFetching || nomRefsIsFetching) return  <CircularProgress style={{margin: '100px 50%'}}/>

  // return <div className="gridContent">

  //     {(isSuccess && data?.results && nomRefs) && <div>
  //         <div style={{margin: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
  //             <Typography variant="h6" noWrap component="div" sx={{color: '#99ACBB'}}>
  //                 {currentPage * size + 1} - {currentPage * size + ((Number(currentPage + 1) == Number(data.totalPages))? Number(data.totalElements) - currentPage * size : size)} sur {data.totalElements} résultats
  //             </Typography>
  //             <Button
  //                 variant="contained"
  //                 startIcon={<img src={download} width={22} style={{marginTop: '4px', color: 'white'}} />}
  //                 component={Link}
  //                 href={`http://${env_IP}:${ports.download}/api/v1/download?target=${baseUrl}/${addCriteriasForGetRequest({
  //                     url: 'sel/search/',
  //                     filters: reshapeCriterias({criterias}),
  //                     prepareForDownload: true
  //                 })}&columns=${Object.values(reverseMapRocEnLigne)}&mapping=${Object.keys(reverseMapRocEnLigne)}&dateFormat=dateNaiss`}
  //                 className="RoundedEmptyButt"
  //                 download="result.csv"
  //             >
  //                 Еxporter
  //             </Button>
  //         </div>
  //         <DataGrid
  //             rows={data?.results || []}
  //             columns={columns({nomRefs})}
  //             pageSize={size}
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
  //             sx={{ '& .boldValue': { fontWeight: 'bold', },
  //                 '& .MuiDataGrid-columnHeaderTitle': {
  //                     textOverflow: "clip",
  //                     whiteSpace: "break-spaces",
  //                     lineHeight: 1
  //                 },
  //             }}
  //         />
  //     </div>}

  //     {!data && <div>
  //         <img  src={mainPS} alt="mainPS" className={'imgContext'}/>
  //         <h2 style={{color: '#003154', position: 'relative', width: '400px', left: '605px', bottom: '545px'}}>
  //             Vous y trouverez toutes les informations pertinentes pour les professionnels de la santé du système.
  //         </h2>
  //     </div>}

  //     {isSuccess && data?.results && nomRefs && <Stack spacing={2} sx={{margin: '25px'}}>
  //         <Pagination
  //             count={data.totalPages}
  //             page={currentPage+1}
  //             onChange={handlePageChange}
  //         />
  //     </Stack>}
  //     <MoreThan200Results data={data} error={error} isSuccess={isSuccess} isError={isError}/>

  // </div>
};
