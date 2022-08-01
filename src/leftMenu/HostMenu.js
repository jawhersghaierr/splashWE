import React from 'react'
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
        Icon: IconBarChart,
    },
    {
        name: 'Remote test App',
        link: '/test',
        Icon: IconBarChart,
    },
    {
        name: 'Hospi App',
        link: '/Hospi',
        Icon: AccountBalance,
    },
]

const HostMenu = () => {
    const classes = useStyles()

    return (
        <List component="nav" className={classes.hostMenu} disablePadding>
            {/* <HostMenuItem {...appMenuItems[0]} /> */}
            {hostMenuItems.map((item, index) => (

                <HostMenuItem {...item} key={index} />
            ))}
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
