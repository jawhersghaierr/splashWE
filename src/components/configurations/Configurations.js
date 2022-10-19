import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {Link} from "react-router-dom";
import './configuration.scss'
import {initCriterias} from "./configurationsSlice";
import {useDispatch} from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import background1 from '../../../assets/Config1.png'
import background2 from '../../../assets/Config2.png'


export const Configurations = (props) => {

    const dispatch = useDispatch();
    const {data} = useGetConfigsQuery();

    useEffect(() => {
        dispatch(initCriterias());
    }, [])

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Configuration</b>
        </Typography>

        {data &&  <div style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', background: '#FFF'}}>

            {data && Object.keys(data).map((tConf,i) =>
                <div style={{
                    backgroundColor: '#f5f8fd',
                    backgroundImage: `url(${(i % 2 == 0)? background1 : background2 })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right bottom',
                    margin: '15px',
                    padding: '0 25px 25px 25px',
                    display: 'block',
                    minWidth: '500px'
                }} key={data[tConf].code}>
                    <h3 style={{marginBottom: '10px', color: '#003154', display: 'flex'}}><SettingsIcon style={{marginRight: '5px'}}/>{data[tConf].label}</h3>
                    {data[tConf]?.items.map(e => <div key={e?.code}>
                        <Link to={`configuration/${tConf}/${e?.code}`} style={{cursor: 'pointer', color: '#00C9E9', paddingLeft: '5px'}}>{e.label}</Link>
                    </div>)}
                </div>
            )}

        </div>}
    </div>
}
