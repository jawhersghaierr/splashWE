import React, { forwardRef, useRef, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

import List from "@mui/material/List";
import { drawerWidth } from "../utils/consts";
import HostMenuItem from "./HostMenuItem";
import { MenuList, Popper } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import "./menu.scss";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "../../assets/icons/HomeIcon";
import ROCIcon from "../../assets/icons/ROCIcon";
import PaymentIcon from "../../assets/icons/PaymentIcon";
import VirementIcon from "../../assets/icons/VirementIcon";

import PSIcon from "../../assets/icons/PSIcon";
import BeneficiaireIcon from "../../assets/icons/BeneficiaireIcon";
import ConfigurationIcon from "../../assets/icons/ConfigurationIcon";
import IndusIcon from "../../assets/icons/IndusIcon";
import DevisIcon from "../../assets/icons/DevisIcon";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import { Collapse, ListItemButton } from "@mui/material";

const hostMenuItems = [
    {
        name: 'Dashboard',
        link: '/',
        icon: HomeIcon,
    },
    {
        icon: ConfigurationIcon,
        name: 'Configuration',
        link: '/configuration'
    },
    {
        name: 'PS',
        link: '/PS',
        icon: PSIcon,
    },
    // {
    //     name: 'PS Remote',
    //     link: '/PSremote',
    //     icon: IconPeople,
    // },
    {
        name: 'Bénéficiaires',
        link: '/beneficiaire',
        icon: BeneficiaireIcon,
    },
    {
        name: 'Paiements', icon: PaymentIcon,
        popitems: [
            {name: 'Paiements',icon: PaymentIcon, link: '/paiement'},
            {name: 'Virements',icon: VirementIcon, link: '/virements'},
        ]
    },
    // {
    //     icon: IconBarChart,
    //     name: 'Paiements',
    //     link: '/paiement'
    // },
    // {
    //     icon: IconBarChart,
    //     name: 'Virements',
    //     link: '/virements'
    // },
    {
        name: 'ROC', icon: ROCIcon,
        popitems: [
            {name: 'Services en ligne',icon: DevisIcon, link: '/serviceEnLigne'},
            {name: 'Factures',icon: PaymentIcon, link: '/factures'},
            {name: 'Factures intraitables',icon: IndusIcon, link: '/intraitables'},
        ]
    },
    // {
    //     icon: IconLibraryBooks,
    //     name: 'Services en ligne',
    //     link: '/serviceEnLigne'
    // },
    // {
    //     icon: IconPeople,
    //     name: 'Factures',
    //     link: '/factures'
    // },
    // {
    //     name: 'Intraitables',
    //     link: '/intraitables',
    //     icon: IconBarChart,
    // },

  // {
  //     name: 'Remote test App',
  //     link: '/test',
  //     icon: IconBarChart,
  // },
  // {
  //     name: 'Hospi App',
  //     link: '/Hospi',
  //     icon: AccountBalance,
  // },
];

const RecursiveMenuItem = (props) => {
  const { name, link, icon: Icon } = props;
  const classes = useStyles();
  const [openPopper, setOpenPopper] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const ref = useRef();

  return (
    <List
      /*{...props}*/
      ref={ref}
      component="nav"
      className={openPopper ? classes.active : ""}
      onMouseEnter={() => setOpenPopper(true)}
      onMouseLeave={() => setOpenPopper(false)}
      onClick={() => setOpenPopper(false)}
    >
      {link && (
        <ListItemButton
          component={forwardRef((props, ref) => (
            <NavLink exact {...props} innerRef={ref} key={`navlink${link}`} />
          ))}
          to={link}
          key={`listItem${link}`}
        >
          {!!Icon && (
            <ListItemIcon>
              <Icon
                viewBox="0 0 50 50"
                sx={{ fontSize: "4em !important", height: "100% !important" }}
              />
            </ListItemIcon>
          )}
          <ListItemText primary={name} />
        </ListItemButton>
      )}
      {!link && (
        <ListItemButton
          to={link}
          key={`listItem${link}`}
          onClick={() => setOpenSubMenu(!openSubMenu)}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            {!!Icon && (
              <Icon
                viewBox="0 0 50 50"
                sx={{ fontSize: "4em !important", height: "100% !important" }}
              />
            )}
          </ListItemIcon>
          <ListItemText primary={name} />
          {openSubMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      )}

      {props?.collapsed && props?.popitems && (
        <Popper
          anchorEl={ref.current}
          open={openPopper}
          placement={props.placement ?? "right-start"}
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "viewport",
            },
          }}
          className="popperStyle"
        >
          {props?.popitems.map((item, index) => {
            return (
              <RecursiveMenuItem
                autoFocus={false}
                key={`it_${index}`}
                {...item}
              />
            );
          })}
        </Popper>
      )}

      {!props?.collapsed && props?.popitems && (
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          {props?.popitems.map((item, index) => {
            return (
              <RecursiveMenuItem
                autoFocus={false}
                key={`it_${index}`}
                {...item}
              />
            );
          })}
        </Collapse>
      )}
    </List>
  );
};

const HostMenu = (props) => {
  const classes = useStyles();
  const collapsedClass = props.collapsed ? "collapsed" : "";

  return (
    <List
      component="nav"
      className={classes.hostMenu + " " + collapsedClass}
    >
      <MenuList>
        {hostMenuItems.map((item, index) => (
          <RecursiveMenuItem
            autoFocus={false}
            collapsed={!!props.collapsed}
            key={`it_${index}`}
            {...item}
          />
        ))}
      </MenuList>
    </List>
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
    menuItemIcon: {
      color: "#1976d2",
    },
  })
);

export default HostMenu;
