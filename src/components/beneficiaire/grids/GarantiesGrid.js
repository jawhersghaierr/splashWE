import React from "react";
import Stack from "@mui/material/Stack";
import {
  simpleGarantieColumns,
  complexGarantieColumns,
} from "./gridGarantiesColumns";
import { SubGrid } from "../../shared/grids";

export const GarantiesGrid = ({ garanties, nom, simple = true }) => {
  return (
    <SubGrid
      showNoGridResultsAlert={garanties == 0}
      showGrid={garanties && nom}
      rows={garanties}
      columns={simple ? simpleGarantieColumns(nom): complexGarantieColumns(nom)}
      pageSize={10}
      rowsPerPageOptions={[10]}
      hideFooter={false}
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
    />
  );
};
