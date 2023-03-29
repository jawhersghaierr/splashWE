import React from "react";
import Stack from "@mui/material/Stack";
import { columns } from "./historyGridColumns";
import { SubGrid } from "../../shared/grids";
import "./paiementsGrid.scss";

export const HistoryGrid = ({ data, nomRefs }) => {
  return (
    <SubGrid
      showNoGridResultsAlert={!data || data?.length == 0}
      showGrid={true}
      rows={data}
      columns={columns(nomRefs)}
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
    />
  );

};
