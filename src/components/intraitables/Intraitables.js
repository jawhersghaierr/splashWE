import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {IntraitablesGrid} from './grids/IntraitablesGrid'

import './intraitables.scss'

export const Intraitables = (props) => {

    return <div style={{padding: '0', margin: 0}}>

        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Intraitables</b> &nbsp;
        </Typography>

        <SearchAccordion className="searchContainer" />

        <IntraitablesGrid />

    </div>
}
