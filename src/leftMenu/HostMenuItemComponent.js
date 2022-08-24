import React, {forwardRef, useState} from 'react'
import ListItem from '@mui/material/ListItem'
import { NavLink, NavLinkProps } from 'react-router-dom'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindTrigger, bindMenu, bindPopover} from 'material-ui-popup-state';
import {bindHover} from "material-ui-popup-state/core";
import {Popover, Typography} from "@material-ui/core";
import Box from "@mui/material/Box";

const HostMenuItemComponent = props => {
    const { className, onClick, onMouseEnter, onMouseLeave, link, children, popItems} = props

    // console.log('popItems > ', popItems)
    const [isShown, setIsShown] = useState(false);



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
