import React from "react";
import Stack from "@mui/material/Stack";
// import { DataGrid } from "@mui/x-data-grid";
import {
  simpleGarantieColumns,
  complexGarantieColumns,
} from "./gridGarantiesColumns";
// import { NoGridResultsAlert } from "../../shared";
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
    />
  );

  // if (garanties == 0) return <NoGridResultsAlert/>

  // return <div>

  //     {(garanties && nom) &&
  //         <DataGrid
  //             rows={garanties || []}
  //             columns={simple ? simpleGarantieColumns(nom): complexGarantieColumns(nom)}
  //             pageSize={10}
  //             autoHeight
  //             hideFooter={true}
  //             disableColumnMenu={true}
  //             disableColumnResize={false}
  //             components={{
  //                 NoRowsOverlay: () => (
  //                     <Stack height="75px" alignItems="center" justifyContent="center">
  //                         <b>Aucun résultat</b>
  //                     </Stack>
  //                 )
  //             }}
  //             getRowClassName={(params) => {
  //                 return params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
  //             }}
  //             sx={{
  //                 '& .MuiDataGrid-columnHeaderTitle': {
  //                     textOverflow: "clip",
  //                     whiteSpace: "break-spaces",
  //                     lineHeight: 1
  //                 },
  //                 '& .boldValue': { fontWeight: 'bold' }
  //             }}
  //             rowHeight={85}
  //         />}

  // </div>
};
