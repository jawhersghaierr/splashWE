import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Link, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { NoSearchResultsAlert, MoreThan200Results, MoreThan10000ResultsForDownload } from "../modals";
import mainPS from "../../../../assets/PS.png";
import download from "../../../../assets/icons/download-blue.svg";

export const MainGrid = (props) => {
  const { showNoSearchResultsAlert, showCircularProgress } = props;
  const {
    showGridHeader,
    showGrid,
    showPagination,
    showNoData,
    showNoDataAdition,
  } = props;
  const { showDownload, downloadHref } = props;
  const {
    gridHeaderStyle,
    initialState,
    rows,
    columns,
    pageSize,
    rowsPerPageOptions,
    totalPages,
    totalElements,
    currentPage,
    hideFooter,
    disableColumnMenu,
    disableColumnResize,
    components,
    getRowClassName,
    rowHeight,
    onCellClick,
    sortingMode,
    onSortModelChange,
    handlePageChange,
  } = props;
  const { showMoreThan200Results, data, error, isSuccess, isError } = props;
  const {
    showMoreThan10000ResultsForDownload,
    alertForMoreThan10000ResultsForDownload,
    openAlertForMoreThan10000ResultsForDownload,
    closeAlertForMoreThan10000ResultsForDownload,
  } = props;

  if (showNoSearchResultsAlert) return <NoSearchResultsAlert />;
  if (showCircularProgress)
    return <CircularProgress style={{ margin: "100px 50%" }} />;

  return (
    <div className="gridContent">
      {showGrid && (
        <>
          <div>
            {showGridHeader && (
              <div style={gridHeaderStyle}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: "#99ACBB" }}
                >
                  {currentPage * pageSize + 1} -{" "}
                  {currentPage * pageSize +
                    (Number(currentPage + 1) == Number(totalPages)
                      ? Number(totalElements) - currentPage * pageSize
                      : pageSize)}{" "}
                  sur {totalElements} résultats
                </Typography>
                {showDownload && (
                  <Button
                    variant="contained"
                    startIcon={
                      <img
                        src={download}
                        width={22}
                        style={{ marginTop: "4px", color: "white" }}
                      />
                    }
                    component={Link}
                    href={downloadHref}
                    className="RoundedEmptyButt"
                    download="result.csv"
                    onClick={openAlertForMoreThan10000ResultsForDownload}
                  >
                    Еxporter
                  </Button>
                )}
              </div>
            )}
            <DataGrid
              rows={rows || []}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={rowsPerPageOptions || []}
              autoHeight
              hideFooter={hideFooter}
              disableColumnMenu={disableColumnMenu}
              disableColumnResize={disableColumnResize}
              initialState={initialState}
              components={components}
              getRowClassName={getRowClassName}
              onCellClick={onCellClick}
              sortingMode={sortingMode}
              onSortModelChange={onSortModelChange}
              sx={{
                "& .boldValue": { fontWeight: "bold" },
                "& .MuiDataGrid-columnHeaderTitle": {
                  textOverflow: "clip",
                  whiteSpace: "break-spaces",
                  lineHeight: 1,
                },
              }}
              rowHeight={rowHeight ? rowHeight : 52}
            />
          </div>
          {showPagination && (
            <Stack spacing={2} sx={{ margin: "25px" }}>
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={handlePageChange}
              />
            </Stack>
          )}
        </>
      )}
      {showNoData && (
        <div>
          <img src={mainPS} alt="mainPS" className={"imgContext"} />
          {showNoDataAdition && (
            <h2
              style={{
                color: "#003154",
                position: "relative",
                width: "400px",
                left: "605px",
                bottom: "545px",
              }}
            >
              Vous y trouverez toutes les informations pertinentes pour les
              professionnels de la santé du système.
            </h2>
          )}
        </div>
      )}
      {showMoreThan200Results && (
        <MoreThan200Results
          data={data}
          error={error}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
      {showMoreThan10000ResultsForDownload && (
        <MoreThan10000ResultsForDownload
          open={alertForMoreThan10000ResultsForDownload}
          handleMsgClose={closeAlertForMoreThan10000ResultsForDownload}
        />
      )}
    </div>
  );
};
