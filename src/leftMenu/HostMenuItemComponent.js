import React, { forwardRef } from 'react'
import ListItem from '@mui/material/ListItem'
import { NavLink, NavLinkProps } from 'react-router-dom'

const HostMenuItemComponent = props => {
    const { className, onClick, link, children } = props

    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                button
                className={className}
                children={children}
                onClick={onClick}
            />
        )
    }

    return (
        <ListItem
            button
            className={className}
            children={children}
            component={forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref} />)}
            to={link}
        />
    )
}

export default HostMenuItemComponent
