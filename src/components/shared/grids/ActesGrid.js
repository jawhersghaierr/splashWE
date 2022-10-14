import React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./actesGridColumns";
import "../styles/grid.scss";
import {NoGridResultsAlert} from "../modals/NoGridResultsAlert";

export const ActesGrid = ({ data, nomRefs }) => {
  let _data = {
    id: "total",
    ligne: <b>Totaux</b>,
    montantRo: 0,
    depenseReelle: 0,
    montantRC: 0,
    montantRAC: 0,
  };

  data.forEach((el) => {
    _data.montantRo += el.montantRo;
    _data.depenseReelle += el.depenseReelle;
    _data.montantRC += el.montantRC;
    _data.montantRAC += el.montantRAC;
  });

  if (!data) return <NoGridResultsAlert/>

  return (
    <DataGrid
      rows={[...data, _data] || []}
      columns={columns(nomRefs)}
      pageSize={20}
      rowsPerPageOptions={[20]}
      autoHeight
      disableColumnResize={false}
      disableColumnMenu={true}
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
      sx={{
        "& .boldValue": { fontWeight: "bold" },
        "& .MuiDataGrid-columnHeaderTitle": {
          textOverflow: "clip",
          whiteSpace: "break-spaces",
          lineHeight: 1,
        },
      }}
    />
  );
};
