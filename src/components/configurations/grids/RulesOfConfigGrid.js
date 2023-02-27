import React from "lib_ui/react";
import { SubGrid } from "shared_lib_ui/Lib";

import Stack from "@mui/material/Stack";
import { columns } from "./rulesOfConfigGridColumns";
import "./configutationGrid.scss";

export const RulesOfConfigGrid = ({ data, nomRefs }) => {
  return (
    <SubGrid
      showNoGridResultsAlert={false}
      showGrid={true}
      rows={data}
      columns={columns(nomRefs)}
      pageSize={20}
      rowsPerPageOptions={[20]}
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

  // return <DataGrid
  //             rows={data || []}
  //             columns={columns(nomRefs)}
  //             pageSize={20}
  //             autoHeight
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
  //             sx={{
  //                 '& .MuiDataGrid-columnHeaderTitle': {
  //                     textOverflow: "clip",
  //                     whiteSpace: "break-spaces",
  //                     lineHeight: 1
  //                 },
  //                 '& .boldValue': { fontWeight: 'bold' }
  //             }}
  //         />
};
