import React, { useEffect } from "lib_ui/react";
import { useSelector } from "lib_ui/react-redux";

import Box from "@mui/material/Box";

import { psRouters, gestionnerRouters } from "./HostRouters";
import StyledMenu from "./subComponents/StyledMenu";
import NavigationItem from "./subComponents/NavigationItem";
import { createUUID } from "shared_lib_ui/Lib";

import { LoadingDots } from "shared_lib_ui/Lib/components";
import { getUser, isPS, isAuthenticated, getBaseClaims } from "shared_lib_ui/host";

import { userProfleSM } from "../utils/userProfleSM";
// import { acquireAccessToken } from "shared_lib_ui/auth";

const Menu = props => {
    const user = useSelector(getUser);
    const isPsUser = useSelector(isPS);
    const isLogged = useSelector(isAuthenticated);
    const baseClaims = useSelector(getBaseClaims);

    let role = null;
    if (isLogged) role = isPsUser ? "PS" : "GESTIONAIRE";

    const HostRouters = userProfleSM({
        entity: "LeftMenu",
        role,
        props: {
            psRouters,
            gestionnerRouters,
            claims: baseClaims || {},
        },
    });

    const { collapsed } = props;

    return (
        <Box id="leftMenu" component="nav">
            {!role && (
                <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <LoadingDots />
                </div>
            )}

            {role && (
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
