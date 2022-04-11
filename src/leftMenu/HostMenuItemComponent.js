import React, { forwardRef } from 'react'
import ListItem from '@mui/material/ListItem'
import { NavLink, NavLinkProps } from 'react-router-dom'

// export interface AppMenuItemComponentProps {
//     className?: string
//     link?: string | null // because the InferProps props allows null value
//     onClick?: (event: React.MouseEvent<HTMLElement>) => void
// }

const HostMenuItemComponent = props => {
    const { className, onClick, link, children } = props

    // If link is not set return the orinary ListItem
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
