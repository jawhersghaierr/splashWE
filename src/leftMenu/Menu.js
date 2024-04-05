import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";

import { psRouters, gestionnerRouters } from "./HostRouters";
import StyledMenu from "./subComponents/StyledMenu";
import NavigationItem from "./subComponents/NavigationItem";
import { createUUID } from "shared_lib_ui/Lib";

import { LoadingDots } from "shared_lib_ui/Lib/components";
import { isPS, isAuthenticated, getBaseClaims } from "shared_lib_ui/host";

import { userProfleSM } from "../utils/userProfleSM";

const Menu = props => {
    const isPsUser = useSelector(isPS);
    const isLogged = useSelector(isAuthenticated);
    const baseClaims = useSelector(getBaseClaims);

    let context = null;
    if (isLogged) context = isPsUser ? "PS" : "GESTIONAIRE";

    const HostRouters = userProfleSM({
        entity: "LeftMenu",
        context,
        props: {
            psRouters,
            gestionnerRouters,
            claims: baseClaims || {},
        },
    });

    const { collapsed } = props;

    return (
        <Box id="leftMenu" component="nav">
            {!context && (
                <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <LoadingDots />
                </div>
            )}

            {context && (
                <StyledMenu>
                    {HostRouters.map(item => (
                        <NavigationItem key={createUUID()} {...item} collapsed={collapsed} />
                    ))}
                </StyledMenu>
            )}
        </Box>
    );
};

export default Menu;
