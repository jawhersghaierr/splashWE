import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import { useGetEnvironmentsQuery } from "../../services/referentielApi";
import {IntraitablesGrid} from './grids/IntraitablesGrid'

import './intraitables.scss'
import {matchPath} from "react-router-dom";

export const Intraitables = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/intraitables/:id",
        exact: true,
        strict: false
    });

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>ROC - Intraitables</b> &nbsp;
            {match?.params?.id}
        </Typography>
        <SearchAccordion className="searchContainer" />

        <IntraitablesGrid />

    </div>
}
