import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { ModalInfo, NoGridResultsAlert, MoreThan200Results } from "../modals";

export const SubGrid = (props) => {
  const { showNoGridResultsAlert, showCircularProgress } = props;
  const { showGrid, showPagination } = props;
  const {
    rows,
    columns,
    pageSize,
    rowsPerPageOptions,
    hideFooter,
    disableColumnMenu,
    disableColumnResize,
    components,
    getRowClassName,
    rowHeight,
    onCellClick,
    sortingMode,
    onSortModelChange,
    openModal,
    handleModalClose,
  } = props;
  const { showModalInfo, showModalComponent, modalComponent } = props;
  const { showMoreThan200Results, data, error, isSuccess, isError } = props;

  if (showNoGridResultsAlert) return <NoGridResultsAlert />;
  if (showCircularProgress)
    return <CircularProgress style={{ margin: "100px 50%" }} />;

  return (
    <div style={{ margin: 0 }}>
      {showGrid && (
        <DataGrid
          rows={rows || []}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions || []}
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
          rowHeight={rowHeight ? rowHeight : 52}
        />
      )}
      {showPagination && (
        <Stack spacing={2} sx={{ margin: "25px" }}>
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
          />
        </Stack>
      )}
      {showModalInfo && (
        <ModalInfo
          openModal={openModal}
          handleModalClose={handleModalClose}
          modalTitle={`modal-title-${openModal?.data?.type}`}
        >
          {showModalComponent && modalComponent}
        </ModalInfo>
      )}
      {showMoreThan200Results && (
        <MoreThan200Results
          data={data}
          error={error}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
    </div>
  );
};
