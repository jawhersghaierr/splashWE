import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles} from "@mui/styles";
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

import IconExpandLess from '@mui/icons-material/ExpandLess'
import IconExpandMore from '@mui/icons-material/ExpandMore'

import HostMenuItemComponent from './HostMenuItemComponent'

// React runtime PropTypes
export const HostMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    items: PropTypes.array,
}

const HostMenuItem = props => {
    const { name, link, Icon, items = [] , popItems = [] } = props
    const classes = useStyles()
    const isExpandable = items && items.length > 0
    const [open, setOpen] = React.useState(true)

    function handleClick() {
        setOpen(!open)
    }

    const MenuItemRoot = (
        <HostMenuItemComponent className={classes.menuItem} key={link} link={link} onClick={handleClick} popItems={popItems}>
            {!!Icon && (
                <ListItemIcon className={classes.menuItemIcon}>
                    <Icon/>
                </ListItemIcon>
            )}
            <ListItemText primary={name} inset={!Icon} />
            {isExpandable && !open && <IconExpandMore />}
            {isExpandable && open && <IconExpandLess />}

        </HostMenuItemComponent>
    )

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <HostMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )
}

const useStyles = makeStyles(theme =>
    createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemIcon-root': {
                    color: '#fff',
                },
            },
        },
        menuItemIcon: {
            color: '#1976d2',
        },
    }),
)

export default HostMenuItem
