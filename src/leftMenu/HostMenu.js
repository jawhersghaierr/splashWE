import React, {forwardRef, useRef, useState} from 'react'
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import List from '@mui/material/List'
import IconDashboard from '@mui/icons-material/Dashboard'
import IconPeople from '@mui/icons-material/People'
import IconBarChart from '@mui/icons-material/BarChart'
import IconLibraryBooks from '@mui/icons-material/LibraryBooks'
import {drawerWidth} from '../utils/consts'
import HostMenuItem from './HostMenuItem'
import {MenuList, Popper} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import './menu.scss'
import ListItem from "@mui/material/ListItem";
import {NavLink} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const hostMenuItems = [
    {
        name: 'Dashboard',
        link: '/',
        icon: IconDashboard,
    },
    {
        icon: IconBarChart,
        name: 'Configuration',
        link: '/configuration'
    },
    {
        name: 'PS',
        link: '/PS',
        icon: IconPeople,
    },
    // {
    //     name: 'PS Remote',
    //     link: '/PSremote',
    //     icon: IconPeople,
    // },
    {
        name: 'Beneficiaire',
        link: '/beneficiaire',
        icon: IconPeople,
    },
    {
        name: 'Paiements', icon: IconBarChart,
        popitems: [
            {name: 'Paiements',icon: IconBarChart, link: '/paiement'},
            {name: 'Virements',icon: IconBarChart, link: '/virements'},
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
        name: 'ROC', icon: IconBarChart,
        popitems: [
            {name: 'Services en ligne',icon: IconLibraryBooks, link: '/serviceEnLigne'},
            {name: 'Factures',icon: IconPeople, link: '/factures'},
            {name: 'Factures intraitables',icon: IconBarChart, link: '/intraitables'},
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
    const { name, link, icon: Icon } = props
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const ref = useRef();

    return (
        <div className={'menuItem'}>
            <MenuItem {...props}
                ref={ref}
                className={open ? classes.active : ""}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={() => setOpen(false)}>

                {link && <ListItem
                    button
                    component={forwardRef((props, ref) => <NavLink
                        exact {...props}
                        innerRef={ref}
                        key={`navlink${link}`}
                    />)}
                    to={link}
                    key={`listItem${link}`}>
                        {!!Icon && (
                            <ListItemIcon className={classes.menuItemIcon}>
                                <Icon/>
                            </ListItemIcon>
                        )}
                        <ListItemText primary={name} />
                </ListItem>}
                {!link && <ListItem
                    button
                    to={link}
                    key={`listItem${link}`}>
                        {!!Icon && (
                            <ListItemIcon className={classes.menuItemIcon}>
                                <Icon/>
                            </ListItemIcon>
                        )}
                        <ListItemText primary={name} />
                </ListItem>}


                {props?.popitems && <Popper
                    anchorEl={ref.current}
                    open={open}
                    placement={props.placement ?? "right-start"}
                    modifiers={{
                        flip: {
                            enabled: true
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: "viewport"
                        }
                    }} className={'poperStyle'}>
                    {props?.popitems.map((item, index) => {

                        return <RecursiveMenuItem
                            autoFocus={false}
                            key={`it_${index}`}
                            {...item}/>
                    })}

                </Popper>}
            </MenuItem>
        </div>
    );
};

const HostMenu = () => {
    const classes = useStyles()
    return (
        <List component="nav" className={classes.hostMenu} disablePadding>

            {/*{hostMenuItems.map((item, index) => (*/}
            {/*    <HostMenuItem {...item} key={index} />*/}
            {/*))}*/}

            <MenuList>
                {hostMenuItems.map((item, index) =>
                    <RecursiveMenuItem
                        autoFocus={false}
                        key={`it_${index}`}
                        {...item}/>
                )}
            </MenuList>
        </List>
    )
}

const useStyles = makeStyles(theme =>
    createStyles({
        hostMenu: {
            width: '100%',
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
            // '&:hover': { backgroundColor: theme.palette.primary.main },
        },
        menuItemIcon: {
            color: '#1976d2',
        },
    }),
)


export default HostMenu
