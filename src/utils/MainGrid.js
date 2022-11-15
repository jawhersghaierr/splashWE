import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Link, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  NoSearchResultsAlert,
  MoreThan200Results,
} from "../components/shared/modals";
import mainPS from "../../assets/PS.png";
import download from "../../assets/download-blue.svg";

export const MainGrid = (props) => {
  const { showNoSearchResultsAlert, showCircularProgress } = props;
  const { showGrid, showNoData } = props;
  const { showDownload, downloadHref } = props;
  const {
    gridHeaderStyle,
    rows,
    columns,
    pageSize,
    currentPage,
    hideFooter,
    disableColumnMenu,
    disableColumnResize,
    components,
    getRowClassName,
    onCellClick,
    sortingMode,
    onSortModelChange,
    handlePageChange,
  } = props;
  const {data, error, isSuccess, isError} = props;

  if (showNoSearchResultsAlert) return <NoSearchResultsAlert />;
  if (showCircularProgress)
    return <CircularProgress style={{ margin: "100px 50%" }} />;

  return (
    <div className="gridContent">
      {showGrid && (
        <>
          <div>
            <div style={gridHeaderStyle}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: "#99ACBB" }}
              >
                {currentPage * pageSize + 1} -{" "}
                {currentPage * pageSize +
                  (Number(currentPage + 1) == Number(data.totalPages)
                    ? Number(data.totalElements) - currentPage * pageSize
                    : pageSize)}{" "}
                sur {data.totalElements} résultats
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
                >
                  Еxporter
                </Button>
              )}
            </div>
            <DataGrid
              rows={rows || []}
              columns={columns}
              pageSize={pageSize}
              autoHeight
              hideFooter={hideFooter}
              disableColumnMenu={disableColumnMenu}
              disableColumnResize={disableColumnResize}
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
            />
          </div>
          <Stack spacing={2} sx={{ margin: "25px" }}>
            <Pagination
              count={data.totalPages}
              page={currentPage + 1}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      )}
      {showNoData && (
        <div>
          <img src={mainPS} alt="mainPS" className={"imgContext"} />
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
        </div>
      )}
      <MoreThan200Results
        data={data}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
};
