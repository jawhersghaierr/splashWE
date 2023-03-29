import React from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { columns } from "./configutationGridColumns";
import { getConfigurations } from "../configurationsSlice";
import "./configutationGrid.scss";
import { MainGrid } from "../../shared/grids";

export const ConfigutationsGrid = ({
  data,
  nomRefs,
  domain,
  code,
  error,
  isSuccess,
  isError,
}) => {
  const configurations = useSelector(getConfigurations);

  return (
    <MainGrid
      showNoSearchResultsAlert={!data || data?.results?.length == 0}
      showCircularProgress={false}
      showGridHeader={false}
      showGrid={isSuccess && data?.results?.length > 0 && nomRefs}
      showPagination={false}
      showNoData={false}
      rows={data.results}
      columns={columns({nomRefs, configurations, domain, code})}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableColumnMenu={true}
      disableColumnResize={false}
      initialState={{
        sorting: {
          sortModel: [{ field: "label", sort: "asc" }],
        },
      }}
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
      showMoreThan200Results={true}
      data={data}
      error={error}
      isSuccess={isSuccess}
      isError={isError}
    />
  );
};
