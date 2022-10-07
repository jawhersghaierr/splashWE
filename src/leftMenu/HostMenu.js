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
import PaiementDetailsById from "../components/paiement/PaiementDetailsById";

const hostMenuItems = [
    {
        name: 'Dashboard',
        link: '/',
        Icon: IconDashboard,
    },
    {
        Icon: IconBarChart,
        name: 'Configuration',
        link: '/configuration'
    },
    {
        name: 'PS',
        link: '/PS',
        Icon: IconPeople,
    },
    // {
    //     name: 'PS Remote',
    //     link: '/PSremote',
    //     Icon: IconPeople,
    // },
    {
        name: 'Beneficiaire',
        link: '/beneficiaire',
        Icon: IconPeople,
    },
    {
        name: 'Paiements',
        popItems: [
            {name: 'Paiements',Icon: IconBarChart, link: '/paiement'},
            {name: 'Virements',Icon: IconBarChart, link: '/virements'},
        ]
    },
    {
        Icon: IconBarChart,
        name: 'Paiements',
        link: '/paiement'
    },
    {
        Icon: IconBarChart,
        name: 'Virements',
        link: '/virements'
    },
    {
        name: 'ROC',
        popItems: [
            {name: 'Services en ligne',Icon: IconLibraryBooks, link: '/serviceEnLigne'},
            {name: 'Factures',Icon: IconPeople, link: '/factures'},
            {name: 'Configuration Intraiteables',Icon: IconBarChart, link: '/intraitables'},
        ]
    },
    {
        Icon: IconLibraryBooks,
        name: 'Services en ligne',
        link: '/serviceEnLigne'
    },
    {
        Icon: IconPeople,
        name: 'Factures',
        link: '/factures'
    },
    {
        name: 'Intraitables',
        link: '/intraitables',
        Icon: IconBarChart,
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
    const ref = useRef();

    const Icon = props.icon
    return (
        <div style={{background: '#1A4565', color: '#fff', border: 0, borderTopRightRadius: '15px'}}>
            <MenuItem {...props}
                ref={ref}
                className={open ? classes.active : ""}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={() => setOpen(false)}>

                {props.icon && <Icon style={{marginRight: '5px'}}/>}
                <span>{props.label}</span>
                {props?.popItems && <Popper
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
                    }}>
                    {props?.popItems.map((item, index) => {
                        console.log(item?.popItems)
                        return <RecursiveMenuItem
                            autoFocus={false}
                            popItems={item?.popItems}
                            label={item.name}
                            key={`it_${index}`}
                            icon={item.Icon}/>
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
            {/* <HostMenuItem {...appMenuItems[0]} /> */}

            {/*{hostMenuItems.map((item, index) => (*/}
            {/*    <HostMenuItem {...item} key={index} />*/}
            {/*))}*/}

            <MenuList>
                {hostMenuItems.map((item, index) =>
                    <RecursiveMenuItem
                        autoFocus={false}
                        popItems={item?.popItems}
                        label={item.name}
                        key={`it_${index}`}
                        icon={item.Icon}/>
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
        },
        menuItemIcon: {
            color: '#1976d2',
        },
    }),
)



export default HostMenu
