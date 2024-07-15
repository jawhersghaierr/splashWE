import React from "react";
import { renderCell, convertDate, selfcareStatusesRIB } from "shared_lib_ui/Lib";
import { Chip } from "shared_lib_ui/Lib/components";
import { icons } from "shared_lib_ui/assets";
import { Button, Portal, Typography } from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./cell.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
const Action = ({ row, value }) => {
    ;
    return (
        <div className={"cell"}>
            {row?.status ?
                <Chip label={"Activée"} size="medium" color={"green"} id={"status"} />
                :
                <Chip label={"Désactivée"} size="medium" color={"red"} id={"status"} />
            }


        </div>
    );
};

const ActionSplash = ({ row, handleDisplay, handleDisplayDetails }) => {


    return (
        <div className={"cell"}>
            <Button size="small" onClick={() => handleDisplay(row.id)}>
                <VisibilityIcon />
            </Button>
            <Button size="small" style={{ color: `${row.status ? "red" : "green"}` }}>
                {row?.status ?
                    <StopCircleIcon />
                    :
                    <PlayCircleFilledWhiteIcon />
                }
            </Button>

            <Button size="small">
                <EditIcon />
            </Button>

            <Button size="small">
                <DeleteForeverIcon />
            </Button>

            <Button size="small" onClick={() => handleDisplayDetails(row?.id)}>
                <SettingsIcon />
            </Button>


        </div >
    );
};





export const columns = ({ handleDisplay, handleDisplayDetails }) => [
    {
        field: "id",
        headerName: "ID",
        flex: 1,
        sortable: false,
        renderCell,
        width: 80,
    },
    {
        field: "label",
        headerName: "Libellé",
        flex: 1,
        sortable: false,
        renderCell,
        width: 100,

    },

    {
        field: "date",
        headerName: "Date de création",
        width: 120,
        sortable: false,
        renderCell,
        valueGetter: ({ value }) => value && convertDate(value, true),
    },
    {
        field: "statut",
        headerName: "Statut",
        width: 120,
        sortable: false,
        renderCell,
        valueGetter: ({ row, value }) => <Action row={row} value={value} />,

    },

    {
        field: "",
        headerName: "Actions",
        sortable: false,
        renderCell,
        minWidth: 350,

        valueGetter: ({ row, value }) => <ActionSplash row={row} handleDisplay={handleDisplay} handleDisplayDetails={handleDisplayDetails} />,

    },

];
