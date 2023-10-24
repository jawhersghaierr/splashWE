import React, { forwardRef, useRef, useState, useEffect } from "lib_ui/react";
import { NavLink, useLocation, matchPath } from "lib_ui/react-router-dom";

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

const { HomeIcon, ROCIcon, PaymentIcon, VirementIcon, PSIcon, BeneficiaireIcon, Archive, ThirdPartyPaymentIcon, User } =
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
        link: "/hospidashboard",
        popitems: [
            { name: "Services en ligne ROC", link: "/serviceEnLigne" },
            { name: "Factures", link: "/factures" },
            { name: "Intraitables", link: "/intraitables" },
        ],
    },
    {
        name: "Tiers payant",
        icon: ThirdPartyPaymentIcon,
        link: "/tpsdashboard",
        popitems: [
            { name: "Factures Create", link: "/tpsFactures/create" },
            { name: "Factures", link: "/tpsFactures" },
            { name: "Services TP-AMC", link: "/tpAmcServiceEnLigne" },
        ],
    },
    {
        name: "Paiement",
        icon: PaymentIcon,
        link: "/paiementdashboard",
        // popitems: [
        //     { name: "paiement", link: "/paiement" },
        //     { name: "virements", link: "/virements" },
        // ],
    },
    {
        name: "Indus",
        icon: VirementIcon,
        link: "/indu",
        popitems: [

        ],
    },
    {
        name: "Bénéficiaires",
        icon: BeneficiaireIcon,
        link: "/beneficiaire",
    },
    {
        name: "Professionnels de santé",
        icon: PSIcon,
        link: "/psdashboard",
        popitems: [
            { name: "Professionnels de santé", link: "/ps" },
            { name: "Système de gestion des utilisateurs", link: "/auth" },
        ],
    },
    // {
    //     name: "Auth",
    //     icon: HomeIcon,
    //     link: "/auth",
    // },
];

const RecursiveMenuItem = (props) => {
    const { name, link, icon: Icon, collapsed, popitems, popitem, activeLink, setActiveLink, openedSubMenu, setOpenedSubMenu, openLeftDrawer } = props;

    const classes = useStyles();
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const ref = useRef();
    const theme = useTheme();

    const match = matchPath(activeLink, {
        path: link,
        strict: true,
    });

    useEffect(() => {
        if (popitems?.length) {
            const links = popitems.map((popitem) => popitem.link);
            if (links.includes(activeLink)) {
                setOpenedSubMenu(name);
                setOpenSubMenu(!openSubMenu);
            }
        }
    }, []);

    const custonNavLinkStyle = () => {
        return { backgroundColor:  checkActiveLink() && theme.palette.primary.main, };
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
        openLeftDrawer();
        setActiveLink(link);
    };
 
    const checkActiveLink = () => {
        return activeLink === link ||  popitems?.flatMap?.((el)=> el.link).includes(activeLink) || (match && match?.path !== "/")
    }
 
    return (
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
                            <Icon
                                color={
                                    checkActiveLink()
                                        ? theme.palette.grey.grey0
                                        : theme.palette.grey.grey7
                                }
                            />
                        </ListItemIcon>
                    )}
                    {!collapsed && (
                        <ListItemText
                            primary={
                                <Typography
                                    variant={ (checkActiveLink() && popitem )? "bodyb" : "bodym"}
                                    sx={{
                                        color:
                                        checkActiveLink()
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
 
            {collapsed && popitems && (
                <Popper
                    anchorEl={ref.current}
                    className="popperStyle"
                    open={false}
                    placement={props.placement ?? "right-start"}
                    modifiers={{
                        flip: { enabled: true },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: "viewport",
                        },
                    }}
                >
                    {popitems.map((item) => (
                        <RecursiveMenuItem
                            autoFocus={false}
                            key={`it_${item?.name}`}
                            popitem
                            activeLink={activeLink}
                            setActiveLink={setActiveLink}
                            openedSubMenu={openedSubMenu}
                            setOpenedSubMenu={setOpenedSubMenu}
                            openLeftDrawer={openLeftDrawer}
                            {...item}
                        />
                    ))}
                </Popper>
            )}
        </>
    );
};

const Menu = (props) => {
    const location = useLocation();
    const classes = useStyles();
    const { collapsed, openLeftDrawer} = props
    const collapsedClass = collapsed ? "collapsed" : "";
    const { height } = useWindowDimensions();

    const [activeLink, setActiveLink] = useState(location?.pathname);
    const [openedSubMenu, setOpenedSubMenu] = useState(null);

    useEffect(() => {
        setActiveLink(location?.pathname);
    }, [location?.pathname]);

    return (
        <Box id="leftMenu" component="nav" className={classes.hostMenu + " " + collapsedClass}>
            <MenuList
                disablePadding
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
                    "& .MuiListItemButton-root:hover": {
                        backgroundColor: (theme) => theme.palette.primary.hover,
                    },
                }}
            >
                {hostMenuItems.map((item) => (
                    <RecursiveMenuItem
                        autoFocus={false}
                        collapsed={!!collapsed}
                        key={`it_${item?.name}`}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                        openedSubMenu={openedSubMenu}
                        setOpenedSubMenu={setOpenedSubMenu}
                        openLeftDrawer={openLeftDrawer}
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
