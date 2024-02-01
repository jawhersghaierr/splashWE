import React from "lib_ui/react";
import { useSnackbar } from "lib_ui/notistack";
import { Button } from "@mui/material";

const TestModals = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Button onClick={() => enqueueSnackbar("You're first test is ready", { variant: "yellowAlert" })}>Show yellowAlert snackbar</Button>
            <Button onClick={() => enqueueSnackbar("You're second test is ready", { variant: "noGridResultsAlertMsg" })}>Show reportComplete snackbar</Button>
        </div>
    );
};

export default TestModals;
