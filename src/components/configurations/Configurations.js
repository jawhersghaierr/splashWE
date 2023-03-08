import React, {useState, useEffect} from 'lib_ui/react'
import {Link} from 'lib_ui/react-router-dom';
import { Switch, Route, useRouteMatch } from "lib_ui/react-router-dom";

import {useDispatch} from "lib_ui/react-redux";
import { addMiddleware } from "lib_ui/redux-dynamic-middlewares";

import {configurationsApi, useGetConfigsQuery} from "./services/configurationsApi";
import configurationsReducer, {initCriterias} from "./configurationsSlice";

import {Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import background1 from '../../../assets/Config1.png'
import background2 from '../../../assets/Config2.png'
import './configuration.scss'


export const Configurations = (props) => {

    const { store } = props;
    let { path, url } = useRouteMatch();
    const [loadDataID, setLoadDataID] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('store: ', store?.asyncReducers?.configurationsApi)

        store.injectReducer("configurations", configurationsReducer);
        store.injectReducer([configurationsApi.reducerPath], configurationsApi.reducer);
        addMiddleware( configurationsApi.middleware );
        if (store) setLoadDataID(true)

        dispatch(initCriterias());
    }, [store?.asyncReducers?.configurationsApi])

    // let data, isFetching, isSuccess
    const {data, isFetching, isSuccess} = configurationsApi.useGetConfigsQuery({ skip: !loadDataID, forceRefetch: true });

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
                        <Link to={`/configuration/${tConf}/${e?.code}`} style={{cursor: 'pointer', color: '#00C9E9', paddingLeft: '5px'}}>{e.label}</Link>
                    </div>)}
                </div>
            )}

        </div>}
    </div>
}
