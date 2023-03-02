import React from "react";
import Chip from "@mui/material/Chip";
import { paiementsStatus } from "../../../utils/status-utils";
import { convertDate } from "../../../utils/convertor-utils";
import { renderCell } from "../../../utils/utils";

export const columns = (nomRefs) => [
  {
    field: "date",
    headerName: "Date et heure de l'événement",
    flex: 2,
    mixWidth: "100px",
    renderCell,
    valueGetter: ({ value }) => convertDate(value, true),
  },
  {
    field: "evenement",
    headerName: "Evénement",
    flex: 1,
    renderCell,
    valueGetter: ({ value }) => nomRefs?.COMMON_HISTORY_TYPE[value] || value,
  },
  {
    field: "status",
    headerName: "Statut",
    flex: 1,
    renderCell,
    valueGetter: ({ value }) => (
      <Chip
        label={paiementsStatus[value]?.label}
        sx={{ color: "black", bgcolor: paiementsStatus[value]?.color }}
      />
    ),
  },
  {
    field: "libelle",
    headerName: "Détails",
    flex: 1,
    renderCell,
    valueGetter: ({ value }) => nomRefs?.PAIEMENT_DETAILS[value] || value,
  },
];
