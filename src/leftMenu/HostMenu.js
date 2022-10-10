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
        name: 'Paiements', Icon: IconBarChart,
        popItems: [
            {name: 'Paiements',Icon: IconBarChart, link: '/paiement'},
            {name: 'Virements',Icon: IconBarChart, link: '/virements'},
        ]
    },
    // {
    //     Icon: IconBarChart,
    //     name: 'Paiements',
    //     link: '/paiement'
    // },
    // {
    //     Icon: IconBarChart,
    //     name: 'Virements',
    //     link: '/virements'
    // },
    {
        name: 'ROC', Icon: IconBarChart,
        popItems: [
            {name: 'Services en ligne',Icon: IconLibraryBooks, link: '/serviceEnLigne'},
            {name: 'Factures',Icon: IconPeople, link: '/factures'},
            {name: 'Factures intraitables',Icon: IconBarChart, link: '/intraitables'},
        ]
    },
    // {
    //     Icon: IconLibraryBooks,
    //     name: 'Services en ligne',
    //     link: '/serviceEnLigne'
    // },
    // {
    //     Icon: IconPeople,
    //     name: 'Factures',
    //     link: '/factures'
    // },
    // {
    //     name: 'Intraitables',
    //     link: '/intraitables',
    //     Icon: IconBarChart,
    // },

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
    const { name, link, Icon, items = [] , popItems = [] } = props
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
                    }} className={'poperStyle'}>
                    {props?.popItems.map((item, index) => {

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
