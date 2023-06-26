import React, { forwardRef, useRef, useState, useEffect } from "lib_ui/react";
import { NavLink, useLocation } from "lib_ui/react-router-dom";

import { makeStyles, createStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Popper } from "@material-ui/core";
import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import { Typography, Collapse, ListItemButton } from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { drawerWidth, useWindowDimensions } from "shared_lib_ui/Lib";

import { icons } from "shared_lib_ui/assets";
import "./menu.scss";

const { HomeIcon, ROCIcon, PaymentIcon, VirementIcon, PSIcon, BeneficiaireIcon, ThirdPartyPaymentIcon, ConfigurationIcon, GestionIcon } =
    icons;

const hostMenuItems = [
    {
        name: "Accueil",
        link: "/",
        icon: HomeIcon,
    },
    {
        name: "Hospitalisation",
        icon: ROCIcon,
        popitems: [
            { name: "Services en ligne ROC", link: "/serviceEnLigne" },
            { name: "Factures", link: "/factures" },
            { name: "Intraitables", link: "/intraitables" },
        ],
    },
    {
        name: "Tiers payant",
        icon: ThirdPartyPaymentIcon,
        popitems: [],
    },
    {
        icon: ConfigurationIcon,
        name: "OCAM",
        link: "/configuration",
    },
    {
        name: "Paiements",
        icon: PaymentIcon,
        link: "/paiement",
    },
    {
        name: "Virements",
        icon: VirementIcon,
        link: "/virements",
    },
    {
        name: "Espace gestion",
        icon: GestionIcon,
        popitems: [],
    },
    {
        name: "Bénéficiaires",
        icon: BeneficiaireIcon,
        link: "/beneficiaire",
    },
    {
        name: "Professionnel de santé",
        icon: PSIcon,
        link: "/PS",
    },
];

const RecursiveMenuItem = (props) => {
    const { name, link, icon: Icon, collapsed, popitems, popitem, activeLink, setActiveLink, openedSubMenu, setOpenedSubMenu } = props;

    const classes = useStyles();
    const [openPopper, setOpenPopper] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const ref = useRef();
    const theme = useTheme();

    useEffect(() => {
        if (popitems && popitems.length) {
            const links = popitems.map((popitem) => popitem.link);
            if (links.includes(activeLink)) {
                setOpenedSubMenu(name);
                setOpenSubMenu(!openSubMenu);
            }
        }
    }, []);

    const custonNavLinkStyle = () => {
        if (activeLink === link && !popitem) {
            return {
                backgroundColor: activeLink === link && theme.palette.primary.main,
            };
        }

        return {};
    };

    const handleLinkClick = (currentOpenedSubMenu) => {
        if (popitem) {
            const menuItem = hostMenuItems.find((item) => {
                const _popitems = item.popitems || [];
                const _popitem = _popitems.find((item) => item.name === name);

                if (_popitem) {
                    return item;
                }
                return null;
            });

            if (menuItem) {
                setOpenedSubMenu(menuItem.name);
            }
        }

        if (openedSubMenu !== currentOpenedSubMenu || !popitem) {
            setOpenedSubMenu(null);
        }
        setActiveLink(link);
    };

    const handleCollapsedClick = () => {
        setOpenedSubMenu(name);
        setOpenSubMenu(!openSubMenu);
        const links = popitems.map((popitem) => popitem.link);
        if (!links.includes(activeLink)) {
            setActiveLink(null);
        }
    };

    return (
        // <ListItem
        //     /*{...props}*/
        //     ref={ref}
        //     className={openPopper ? classes.active : ""}
        //     onMouseEnter={() => setOpenPopper(true)}
        //     onMouseLeave={() => setOpenPopper(false)}
        //     onClick={() => setOpenPopper(false)}
        //     sx={{ width: 280}}
        // >
        <>
            {link && (
                <ListItemButton
                    id={name}
                    component={forwardRef((props, ref) => (
                        <NavLink exact {...props} innerRef={ref} key={`navlink${link}`} style={custonNavLinkStyle} />
                    ))}
                    to={link}
                    key={`listItem${link}`}
                    sx={{
                        width: !popitem ? (!collapsed ? 280 : 56) : 190,
                        margin: "0 auto",
                        borderRadius: "12px",
                        padding: "8px 16px !important",
                    }}
                    onClick={() => handleLinkClick(openedSubMenu)}
                >
                    {!!Icon && (
                        <ListItemIcon>
                            <Icon color={`${activeLink === link ? theme.palette.grey.grey0 : theme.palette.grey.grey7}`} />
                        </ListItemIcon>
                    )}
                    {!collapsed && (
                        <ListItemText
                            primary={
                                <Typography
                                    variant={activeLink === link ? (popitem ? "bodyb" : "bodym") : "bodym"}
                                    sx={{
                                        color:
                                            activeLink === link
                                                ? popitem
                                                    ? theme.palette.primary.main
                                                    : theme.palette.grey.grey0
                                                : theme.palette.grey.grey7,
                                    }}
                                >
                                    {name}
                                </Typography>
                            }
                        />
                    )}
                </ListItemButton>
            )}
            {!link && (
                <ListItemButton
                    id={name}
                    key={`listItem${link}`}
                    sx={{
                        width: !collapsed ? 280 : 56,
                        margin: "8px auto",
                        borderRadius: "12px",
                        padding: "8px 16px !important",
                        backgroundColor: openedSubMenu === name && theme.palette.primary.main,
                    }}
                    onClick={handleCollapsedClick}
                >
                    <ListItemIcon className={classes.menuItemIcon}>
                        {!!Icon && <Icon color={openedSubMenu === name ? theme.palette.grey.grey0 : theme.palette.grey.grey7} />}
                    </ListItemIcon>
                    {!collapsed && (
                        <ListItemText
                            primary={
                                <Typography
                                    variant="bodym"
                                    sx={{
                                        color: openedSubMenu === name ? theme.palette.grey.grey0 : theme.palette.grey.grey7,
                                    }}
                                >
                                    {name}
                                </Typography>
                            }
                        />
                    )}
                    {!collapsed &&
                        (openSubMenu ? (
                            <ArrowDropUpIcon sx={{ color: openedSubMenu === name ? theme.palette.grey.grey0 : theme.palette.grey.grey7 }} />
                        ) : (
                            <ArrowDropDownIcon
                                sx={{ color: openedSubMenu === name ? theme.palette.grey.grey0 : theme.palette.grey.grey7 }}
                            />
                        ))}
                </ListItemButton>
            )}

            {collapsed && popitems && (
                <Popper
                    anchorEl={ref.current}
                    className="popperStyle"
                    open={openPopper}
                    placement={props.placement ?? "right-start"}
                    modifiers={{
                        flip: { enabled: true },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: "viewport",
                        },
                    }}
                >
                    {popitems.map((item, index) => (
                        <RecursiveMenuItem
                            autoFocus={false}
                            key={`it_${index}`}
                            popitem
                            activeLink={activeLink}
                            setActiveLink={setActiveLink}
                            openedSubMenu={openedSubMenu}
                            setOpenedSubMenu={setOpenedSubMenu}
                            {...item}
                        />
                    ))}
                </Popper>
            )}

            {!collapsed && popitems && (
                <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                    <MenuList>
                        {popitems.map((item, index) => (
                            <RecursiveMenuItem
                                autoFocus={false}
                                key={`it_${index}`}
                                popitem
                                activeLink={activeLink}
                                setActiveLink={setActiveLink}
                                openedSubMenu={openedSubMenu}
                                setOpenedSubMenu={setOpenedSubMenu}
                                {...item}
                            />
                        ))}
                    </MenuList>
                </Collapse>
            )}
        </>
        // </ListItem>
    );
};

const Menu = (props) => {
    const location = useLocation();
    const classes = useStyles();
    const collapsedClass = props.collapsed ? "collapsed" : "";
    const { height } = useWindowDimensions();

    const [activeLink, setActiveLink] = useState(location?.pathname);
    const [openedSubMenu, setOpenedSubMenu] = useState(null);

    return (
        <Box component="nav" className={classes.hostMenu + " " + collapsedClass}>
            <MenuList
                disablePadding={true}
                sx={{
                    height: height - 300,
                    overflowY: "auto",
                    overflowX: "hidden",
                    marginRight: "10px",
                    scrollbarWidth: "thin" /* Firefox 63 compatibility */,
                    "&::-webkit-scrollbar": {
                        width: "6px !important",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#F5F5F5 !important",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "10px !important",
                        boxShadow: "inset 0 0 6px rgba(0,0,0,.3) !important",
                        backgroundColor: "#F5F5F5 !important",
                    },
                }}
            >
                {hostMenuItems.map((item, index) => (
                    <RecursiveMenuItem
                        autoFocus={false}
                        collapsed={!!props.collapsed}
                        key={`it_${index}`}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                        openedSubMenu={openedSubMenu}
                        setOpenedSubMenu={setOpenedSubMenu}
                        {...item}
                    />
                ))}
            </MenuList>
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
