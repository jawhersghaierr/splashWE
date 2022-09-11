import React from 'react';
import {Typography} from "@mui/material";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {useGetRefsQuery} from "../../services/refsApi";
import {Link} from "react-router-dom";
import './configuration.scss'

export const Configurations = (props) => {

    const {data} = useGetConfigsQuery();
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Configuration</b>
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
                        <Link to={`configuration/${tConf}/${e?.code}`} style={{cursor: 'pointer'}}>{e.label}</Link>
                    </div>)}
                </div>
            )}

        </div>}
    </div>
}
