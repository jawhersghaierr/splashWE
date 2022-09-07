import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {VirementsGrid} from "./grids/VirementsGrid";

import './Virement.scss'
import {matchPath} from "react-router-dom";

export const Virement = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/paiement/:id",
        exact: true,
        strict: false
    });

    return <div style={{padding: '0', margin: 0}}>

        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Virement</b> &nbsp;
            {match?.params?.id}
        </Typography>

        <SearchAccordion className="searchContainer"/>

        <VirementsGrid/>

    </div>
}
