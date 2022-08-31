import React, {useRef, useState} from 'react'
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import List from '@mui/material/List'

import IconDashboard from '@mui/icons-material/Dashboard'
import AccountBalance from '@mui/icons-material/AccountBalance'
import IconPeople from '@mui/icons-material/People'
import IconBarChart from '@mui/icons-material/BarChart'
import IconLibraryBooks from '@mui/icons-material/LibraryBooks'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {drawerWidth} from '../utils/consts'
import HostMenuItem from './HostMenuItem'
import {ListItemIcon, ListItemText, MenuList, Paper, Popover, Popper, Typography} from "@material-ui/core";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import Box from "@mui/material/Box";
import {bindHover} from "material-ui-popup-state/core";
import MenuItem from "@mui/material/MenuItem";

const hostMenuItems = [
    {
        name: 'Dashboard',
        link: '/',
        Icon: IconDashboard,
    },
    {
        name: 'PS App',
        link: '/PS',
        Icon: IconPeople,
    },
    // {
    //     name: 'PS Remote',
    //     link: '/PSremote',
    //     Icon: IconPeople,
    // },
    {
        name: 'Beneficiaire App',
        link: '/beneficiaire',
        Icon: IconPeople,
    },
    {
        Icon: IconPeople,
        name: 'Factures',
        link: '/factures'
    },
    {
        Icon: IconBarChart,
        name: 'Configuration',
        link: '/configuration'
    },
    {
        name: 'ROC Intraitables',
        link: '/intraitables',
        Icon: IconBarChart,
        popItems: [
            {name: 'Services en ligne', link: '/ligne'},
            {name: 'Factures', link: '/factures'},
            {name: 'Configuration Intraiteables', link: '/intraitFactures'},
        ]
    },
    {
        Icon: IconLibraryBooks,
        name: 'Paiements',
    },
    {
        Icon: IconLibraryBooks,
        name: 'Virements',
    },
    // {
    //     name: 'Remote test App',
    //     link: '/test',
    //     Icon: IconBarChart,
    // },
    // {
    //     name: 'Hospi App',
    //     link: '/Hospi',
    //     Icon: AccountBalance,
    // },
]


const RecursiveMenuItem = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const Icon = props.icon
    return (
        <MenuItem
            {...props}
            ref={ref}
            className={open ? classes.active : ""}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <Icon/>
            <span>{props.label}</span>
            <Popper
                anchorEl={ref.current}
                open={open}
                placement={props.placement ?? "right"}
                modifiers={{
                    flip: {
                        enabled: true
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: "viewport"
                    }
                }}
            >
                children
            </Popper>
        </MenuItem>
    );
};

const HostMenu = () => {
    const classes = useStyles()
    return (
        <List component="nav" className={classes.hostMenu} disablePadding>
            {/* <HostMenuItem {...appMenuItems[0]} /> */}
            {hostMenuItems.map((item, index) => (
                <HostMenuItem {...item} key={index} />
            ))}

            {/*<MenuList>*/}
            {/*    {hostMenuItems.map((item, index) =>*/}
            {/*        <RecursiveMenuItem autoFocus={false} label={item.name} key={`it_${index}`} icon={item.Icon}/>*/}
            {/*    )}*/}
            {/*</MenuList>*/}
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
        },
        menuItemIcon: {
            color: '#1976d2',
        },
    }),
)



export default HostMenu
