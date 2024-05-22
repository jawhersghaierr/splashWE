import React, { forwardRef, useRef, useState, useEffect } from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import StyledMenuListItemButton from "./StyledMenuListItemButton";

const component = ({ props, ref, path, customNavLinkStyle }) =>
    forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref} key={`navlink${path}`} style={customNavLinkStyle} />);

const NavigationItem = props => {
    const { name, path, icon: Icon, collapsed, children } = props;

    const ref = useRef();
    const theme = useTheme();
    const location = useLocation();

    const [activeLink, setActiveLink] = useState(location?.pathname);

    const match = matchPath(activeLink, {
        path: path,
        strict: true,
    });

    useEffect(() => {
        setActiveLink(location?.pathname);
    }, [location?.pathname]);

    const customNavLinkStyle = () => {
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
            component={component({ props, ref, path, customNavLinkStyle })}>
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
