import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {ConfigutationGrid} from "./grids/ConfigutationGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import './configuration.scss'
import {matchPath} from "react-router-dom";
import {useGetConfigsQuery} from "./services/configurationsApi";

export const ListConfiguration = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:id",
        exact: true,
        strict: false
    });

    const {data} = useGetConfigsQuery();

    console.log('data > ', data)

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Configuration</b> &nbsp;
            {match?.params?.id}
        </Typography>

        {(data && data?.facturation?.items) && data.facturation.items.map(e=><div>
            {e.label} ::      {e.url} <br/>
        </div>)}

    </div>
}
