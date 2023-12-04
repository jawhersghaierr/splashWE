import React from "lib_ui/react";

import Box from "@mui/material/Box";

import HostRouters from "./HostRouters";
import StyledMenu from "./StyledMenu";
import NavigationItem from "./NavigationItem"

const Menu = (props) => {
    
    const { collapsed } = props

    return (
        <Box id="leftMenu" component="nav" >
            <StyledMenu  >
                { HostRouters.filter((item)=> item.name).map((item) =>  <NavigationItem key={item.name} {...item} collapsed={collapsed} />) }
            </StyledMenu>
        </Box>
    );
};

export default Menu;
