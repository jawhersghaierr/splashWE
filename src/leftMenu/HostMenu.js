import React from "react";

import { Drawer, useDrawer } from "shared_lib_ui/Lib/layout/drawers";
import Menu from "./Menu";
import MenuHeader from "./MenuHeader";
import { UserAccess } from "shared_lib_ui/auth";
import { useSelector } from "react-redux";
import { getPlatformsAndContexts } from "shared_lib_ui/host";

const HostMenu = () => {
    const { isOpenLeftDrawer, isShownLeftDrawer, openLeftDrawer, closeLeftDrawer } = useDrawer();
    const { codePlateform } = useSelector(getPlatformsAndContexts);

    return (
        isShownLeftDrawer && (
            <Drawer variant="permanent" open={isOpenLeftDrawer}>
                {codePlateform && <MenuHeader open={isOpenLeftDrawer} openLeftDrawer={openLeftDrawer} closeLeftDrawer={closeLeftDrawer} />}
                {codePlateform && <Menu collapsed={!isOpenLeftDrawer} openLeftDrawer={openLeftDrawer} />}
                <UserAccess isColapsed={!isOpenLeftDrawer} />
            </Drawer>
        )
    );
};

export default HostMenu;
