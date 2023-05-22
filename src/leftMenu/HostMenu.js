import React, { forwardRef, useRef, useState } from "lib_ui/react";
import { NavLink } from "lib_ui/react-router-dom";

import { makeStyles, createStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { MenuList, Popper } from "@material-ui/core";
import { Typography, Collapse, ListItemButton, List } from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { drawerWidth } from "shared_lib_ui/Lib";

import { icons } from "shared_lib_ui/assets";
import "./menu.scss";

const {
  AddCircle,
  HomeIcon,
  ROCIcon,
  PaymentIcon,
  VirementIcon,
  PSIcon,
  BeneficiaireIcon,
  ConfigurationIcon,
  IndusIcon,
  DevisIcon,
  PecIcon,
  GestionIcon,
  ReferentielIcon,
} = icons;

const hostMenuItems = (theme) => [
  {
    name: "Créer une fiche",
    link: "/",
    icon: AddCircle,
    color: theme.palette.primary.main,
  },
  {
    name: "Accueil",
    link: "/",
    icon: HomeIcon,
  },
  {
    name: "ROC",
    icon: ROCIcon,
    popitems: [
      { name: "Services en ligne", icon: ROCIcon, link: "/serviceEnLigne" },
      { name: "Factures", icon: ROCIcon, link: "/factures" },
      { name: "Factures intraitables", icon: ROCIcon, link: "/intraitables" },
    ],
  },
  {
    icon: ConfigurationIcon,
    name: "Paramétrage",
    link: "/configuration",
  },
  {
    icon: DevisIcon,
    name: "Devis",
    link: "/",
  },
  {
    icon: PecIcon,
    name: "PEC",
    link: "/",
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
    name: "Gestion des remboursements",
    icon: GestionIcon,
    link: "/",
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
  {
    name: "Référentiel",
    icon: ReferentielIcon,
    link: "/",
  },
];

const RecursiveMenuItem = (props) => {
  const { name, link, icon: Icon, color, collapsed, popitems } = props;
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
          id={name}
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
                sx={{
                  margin: "0.5em 0.3em auto 1.1em",
                  fontSize: "2.5em !important",
                  height: "100% !important",
                }}
              />
            </ListItemIcon>
          )}
          {!collapsed && (
            <ListItemText
              primary={
                <Typography
                  variant="bodym"
                  sx={{
                    color: (theme) =>
                      `${color ? color : theme.palette.grey.grey7}`,
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
          to={link}
          key={`listItem${link}`}
          onClick={() => setOpenSubMenu(!openSubMenu)}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            {!!Icon && (
              <Icon
                viewBox="0 0 50 50"
                sx={{
                  margin: "0.5em 0.3em auto 1.1em",
                  fontSize: "2.5em !important",
                  height: "100% !important",
                }}
              />
            )}
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary={
                <Typography
                  variant="bodym"
                  sx={{
                    color: (theme) =>
                      `${color ? color : theme.palette.grey.grey7}`,
                  }}
                >
                  {name}
                </Typography>
              }
            />
          )}
          {!collapsed && (openSubMenu ? <ExpandLess /> : <ExpandMore />)}
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
              {...item}
            />
          ))}
        </Popper>
      )}

      {!collapsed && popitems && (
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          {popitems.map((item, index) => (
            <RecursiveMenuItem
              autoFocus={false}
              key={`it_${index}`}
              {...item}
            />
          ))}
        </Collapse>
      )}
    </List>
  );
};

const HostMenu = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const collapsedClass = props.collapsed ? "collapsed" : "";

  return (
    <List component="nav" className={classes.hostMenu + " " + collapsedClass}>
      <MenuList>
        {hostMenuItems(theme).map((item, index) => (
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
    }
  })
);

export default HostMenu;
