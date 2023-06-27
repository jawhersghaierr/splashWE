import React from "lib_ui/react";

import { Drawer, useDrawer } from "shared_lib_ui/Lib/layout/drawers";
import Menu from "./Menu";
import MenuHeader from "./MenuHeader";

const HostMenu = () => {
    const { isOpenLeftDrawer, isShownLeftDrawer, openLeftDrawer, closeLeftDrawer } = useDrawer();

    return (
        isShownLeftDrawer && (
            <Drawer variant="permanent" open={isOpenLeftDrawer}>
                <MenuHeader open={isOpenLeftDrawer} openLeftDrawer={openLeftDrawer} closeLeftDrawer={closeLeftDrawer} />
                <Menu collapsed={!isOpenLeftDrawer} />
            </Drawer>
        )
    );
};

export default HostMenu;
