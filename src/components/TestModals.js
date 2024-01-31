import React from "lib_ui/react";
import { useSnackbar } from "lib_ui/notistack";
import { Button } from "@mui/material";

const TestModals = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Button onClick={() => enqueueSnackbar("You're test is ready", { variant: "yellowAlert" })} id={"tst"} variant={"text"}>
            Show snackbar
        </Button>
    );
};

export default TestModals;
