import React, { forwardRef, useState, useEffect } from "lib_ui/react";
import { NavLink, useLocation, matchPath } from "lib_ui/react-router-dom";

import { useTheme } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import StyledMenuListItemButton from "./StyledMenuListItemButton";

const NavigationItem = props => {
    const { name, path, icon: Icon, collapsed, children } = props;

    const theme = useTheme();
    const location = useLocation();

    const match = matchPath(activeLink, {
        path: path,
        strict: true,
    });

    const [activeLink, setActiveLink] = useState(location?.pathname);

    useEffect(() => {
        setActiveLink(location?.pathname);
    }, [location?.pathname]);

    const custonNavLinkStyle = () => {
        return {
            background: checkActiveLink() ? `linear-gradient(to bottom, ${theme.palette.btnGradients.btnBegin}, ${theme.palette.btnGradients.btnEnd})` : "",
        };
    };

    const checkActiveLink = () => {
        const currentLink = activeLink?.split?.("/")?.length > 1 ? "/" + activeLink?.split?.("/")?.at?.(1) : activeLink;
        return activeLink === path || children?.flatMap?.(el => el.path).includes(currentLink) || (match && match?.path !== "/");
    };

    return (
        <StyledMenuListItemButton
            selected={checkActiveLink()}
            id={name}
            to={path}
            key={`listItem${path}`}
            sx={{ width: !collapsed ? 280 : 56 }}
            component={forwardRef((props, ref) => (
                <NavLink exact {...props} innerRef={ref} key={`navlink${path}`} style={custonNavLinkStyle} />
            ))}>
            <ListItemIcon> {Icon && <Icon color={checkActiveLink() ? theme.palette.grey.grey0 : theme.palette.grey.grey7} />} </ListItemIcon>
            {!collapsed && (
                <ListItemText
                    primary={
                        <Typography
                            variant={"bodym"}
                            sx={{
                                color: checkActiveLink() ? theme.palette.grey.grey0 : theme.palette.grey.grey7,
                            }}>
                            {name}
                        </Typography>
                    }
                />
            )}
        </StyledMenuListItemButton>
    );
};

export default NavigationItem;
