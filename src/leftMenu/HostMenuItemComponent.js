import React, {forwardRef, useState} from 'react'
import ListItem from '@mui/material/ListItem'
import { NavLink } from 'react-router-dom'

const HostMenuItemComponent = props => {

    const { className, onClick, onMouseEnter, onMouseLeave, link, children} = props

    if (!link || typeof link !== 'string') {
        return (<ListItem
                button
                className={className}
                children={children}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
        />)
    }

    return (
        <div>
            <ListItem
                button
                className={className}
                children={children}

                component={forwardRef((props, ref) => <NavLink
                    exact {...props}
                    innerRef={ref}

                    key={`navlink${link}`}

                />)}
                to={link}
                key={`listItem${link}`}
            />

        </div>
    )
}

export default HostMenuItemComponent
