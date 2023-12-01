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
                { HostRouters.filter((item)=> item.name).map((item) =>  <NavigationItem {...item} collapsed={collapsed} />) }
            </StyledMenu>
        </Box>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        hostMenu: {
            width: "100%",
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
            // '&:hover': { backgroundColor: theme.palette.primary.main },
        },
    })
);

export default Menu;
