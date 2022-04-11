import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import List from '@mui/material/List'

import IconDashboard from '@mui/icons-material/Dashboard'
import AccountBalance from '@mui/icons-material/AccountBalance'
import IconPeople from '@mui/icons-material/People'
import IconBarChart from '@mui/icons-material/BarChart'
import IconLibraryBooks from '@mui/icons-material/LibraryBooks'

import HostMenuItem from './HostMenuItem'

const hostMenuItems = [
    {
        name: 'Dashboard',
        link: '/',
        Icon: IconDashboard,
    },
    {
        name: 'ROC App',
        link: '/Roc',
        Icon: AccountBalance,
    },
    {
        name: 'PS App',
        link: '/PS',
        Icon: IconPeople,
    },
    {
        name: 'Beneficiary App',
        link: '/Beneficiary',
        Icon: IconBarChart,
    },
    {
        name: 'Nested Links',
        Icon: IconLibraryBooks,
        items: [
            {
                name: 'Level 2',
            },
            {
                name: 'Level 2',
                items: [
                    {
                        name: 'Level 3',
                    },
                    {
                        name: 'Level 3',
                    },
                ],
            },
        ],
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

const drawerWidth = 240

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
