import React from "react";
import { renderCell, convertDate, selfcareStatusesRIB } from "shared_lib_ui/Lib";
import { Chip } from "shared_lib_ui/Lib/components";
import { Button } from "@mui/material";

import "./cell.scss";

import ReplayIcon from "@mui/icons-material/Replay";
const Action = ({ row, value }) => {
    ;
    return (
        <div className={"cell"}>
            {row?.consulted ?
                <Chip label={"Consultée"} size="medium" color={"green"} id={"status"} />
                :
                <Chip label={"non consultée"} size="medium" color={"red"} id={"status"} />
            }


        </div>
    );
};

const ActionSplash = ({ row, handleActive }) => {


    return (
        <div>
            {row?.consulted &&
                <Button
                    type="button"
                    variant="contained"
                    size="medium"
                    style={{ marginRight: "10px", marginLeft: "20px" }}
                    onClick={() => handleActive(row?.id)}

                >
                    <ReplayIcon />
                    {"Revoke"}
                </Button>
            }



        </div >
    );
};





export const columns = ({ handleActive }) => [

    {
        field: "email",
        headerName: "Email Utilisateur",
        sortable: false,
        renderCell,
        width: 300,

    },

    {
        field: "dateSeen",
        headerName: "Date de consultation",
        width: 200,
        sortable: false,
        renderCell,
        valueGetter: ({ value }) => value && convertDate(value, true),
    },
    {
        field: "consulted",
        headerName: "Etat",
        width: 150,
        sortable: false,
        renderCell,
        valueGetter: ({ row, value }) => <Action row={row} value={value} />,

    },

    {
        field: "",
        headerName: "Actions",
        sortable: false,
        renderCell,
        minWidth: 200,

        valueGetter: ({ row, value }) => <ActionSplash row={row} handleActive={handleActive} />,

    },

];
