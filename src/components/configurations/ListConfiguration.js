import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Typography} from "@mui/material";
import {matchPath} from "react-router-dom";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {useGetRefsQuery} from "../../services/refsApi";
import './configuration.scss'
import {GridConfigutation} from "./grids/GridConfigutation";
import SearchAccordion from "./searches/SearchAccordion";
import {selectCriterias} from './configurationsSlice'


export const ListConfiguration = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:domain/:code",
        exact: true,
        strict: true
    });

    const {domain, code} = match?.params
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();
    const {data: LOC, isFetching: LOCIsFetching, isSuccess: LOCIsSuccess} = useGetConfigsQuery(); // LOC === listOfConfigs

    let moreCriterias = null
    if (code) moreCriterias = code?.includes('control') || null
    let url = null;
    const criterias = useSelector(selectCriterias);

    useEffect(() => {

        if (domain && code && LOCIsSuccess && LOC[domain]) {
            url = LOC[domain]?.items?.find(e=>e.code==code)?.url || null
        }

        if (url) {

            let filters = {...criterias}

            if (criterias?.referenceDate && criterias?.referenceDate != '' && criterias?.referenceDate != undefined) {
                filters.referenceDate = new Date(criterias?.referenceDate).toLocaleDateString('sv');
            }

            if (criterias?.status && criterias?.status !== '' && criterias?.status !== undefined) filters.status = 'A'
            if(filters) {
                Object.keys(filters).forEach( (key, ii)=>{
                    if (filters[key] && filters[key] !== 'null' && filters[key] !== undefined && filters[key] !== '') {
                        url += `${(url.includes('?'))? '&' : '?'}${key}=${filters[key]}`;
                    }
                })
            }
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

    }, [domain, code, LOC, nomRefs, criterias])


    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Configuration List</b> &nbsp;
        </Typography>
        {code && <SearchAccordion code={code} nomRefs={nomRefs} moreCriterias={moreCriterias}/>}

        {items && nomRefs && <GridConfigutation data={items} nomRefs={nomRefs} domain={domain} code={code}/>}

    </div>
}
