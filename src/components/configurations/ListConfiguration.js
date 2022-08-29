import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {GridConfigutation} from "./grids/GridConfigutation";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import './configuration.scss'
import {matchPath} from "react-router-dom";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {RowInfo} from "./components/RowInfo";
import {Link} from "@material-ui/core";
import {Configuration} from "./Configuration";

export const ListConfiguration = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:id",
        exact: true,
        strict: false
    });

    const {data} = useGetConfigsQuery();

    const [config, setConfig] = useState(null);

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
                    margin: '15px',
                    padding: '0 25px 25px 25px',
                    // maxWidth: '450px',
                    display: 'block'
                }} key={data[tConf].code}>
                    <h3 style={{marginBottom: '10px'}}>{data[tConf].label}</h3>
                    {data[tConf]?.items.map(e => <div key={e?.code}>
                        <Link to={`#`} onClick={()=>setConfig(e)} style={{cursor: 'pointer'}}>{e.label}</Link>
                        {/*<RowInfo label={e.label} value={<Link to={`#`}>e.url</Link>} border={true} />*/}
                    </div>)}
                </div>
            )}

        </div>}

        {config && <Configuration config={config}/>}

    </div>
}
