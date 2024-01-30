import React from "lib_ui/react";
import Box from "@mui/material/Box";
import { LogoSvg, icons } from "shared_lib_ui/assets";
import { isOxantis } from "shared_lib_ui/Lib";
const { ArrowSquareLeft, ArrowSquareRight } = icons;

const MenuHeader = props => {
    const { open, openLeftDrawer, closeLeftDrawer } = props;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", backgroundColor: "#FFF !important" }}>
            {!open && (
                <ArrowSquareRight
                    onClick={openLeftDrawer}
                    viewBox="0 0 50 50"
                    sx={{ margin: "1.4em 0.9em 0.6em", fontSize: "2.5em !important", cursor: "pointer" }}
                />
            )}
            {open && (
                <Box sx={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "self-end" }}>
                    {!isOxantis && <LogoSvg width={"87%"} style={{ alignSelf: "self-end!important" }} />}
                    <ArrowSquareLeft
                        viewBox="0 0 50 50"
                        onClick={closeLeftDrawer}
                        sx={{ flex: "1 0 auto", margin: "1.4em 25px 0.6em 0!important", fontSize: "2.5em !important", cursor: "pointer" }}
                    />
                    {isOxantis && <div style={{ width: "58%" }}></div>}
                </Box>
            )}
        </Box>
    );
};

export default MenuHeader;
