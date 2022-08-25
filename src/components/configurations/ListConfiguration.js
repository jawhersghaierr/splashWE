import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {ConfigutationGrid} from "./grids/ConfigutationGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import './configuration.scss'
import {matchPath} from "react-router-dom";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {RowInfo} from "./components/RowInfo";

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

        {data &&  <div style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>

            {data && Object.keys(data).map(tConf =>
                <div style={{
                    backgroundColor: '#FFF',
                    // backgroundColor: '#F6F8FC',
                    margin: '5px',
                    padding: '0 25px',
                    // maxWidth: '450px',
                    display: 'block'
                }} key={data[tConf].code}>
                    <h3 style={{marginBottom: '10px'}}>{data[tConf].label} config</h3>
                    {data[tConf]?.items.map(e => <div key={e?.code}>
                        <RowInfo label={e.label} value={e.url} border={true} />
                    </div>)}
                </div>
            )}

        </div>}

    </div>
}
