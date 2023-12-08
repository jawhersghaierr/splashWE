import React from "lib_ui/react";
import {useSelector} from "lib_ui/react-redux";

import Box from "@mui/material/Box";

import {psRouters, gestionnerRouters} from "./HostRouters";
import StyledMenu from "./StyledMenu";
import NavigationItem from "./NavigationItem"
import { createUUID } from 'shared_lib_ui/Lib';

import { LoadingDots } from "shared_lib_ui/Lib/components";
import {getUser} from "shared_lib_ui/host";

import {userProfleSM} from "../utils/userProfleSM";
const Menu = (props) => {
    
    const user = useSelector(getUser);
    
    let role =  null
    if (user?.idTokenClaims) role = user?.idTokenClaims?.extension_finess ? "PS" : "GESTIONAIRE"

    const HostRouters = userProfleSM({ entity: 'LeftMenu', role, props: {psRouters, gestionnerRouters} })
    
    const { collapsed } = props

    return (
        <Box id="leftMenu" component="nav" >
            {!role && <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LoadingDots />
            </div>}
            
            {role && <StyledMenu>
                {HostRouters.filter((item) => item.name).map((item) => <NavigationItem key={createUUID()} {...item}
                                                                                       collapsed={collapsed}/>)}
            </StyledMenu>}
        </Box>
    );
};

export default Menu;
