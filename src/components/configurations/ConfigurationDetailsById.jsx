import React, {useState, useEffect} from 'lib_ui/react'
import {matchPath} from 'lib_ui/react-router-dom';

import { refsApi } from "shared_lib_ui/services";

import {useGetConfigsQuery} from "./services/configurationsApi";
import {ConfFacturation} from "./components/ConfFacturation";
import {ConfRoc} from "./components/ConfRoc";
import {CircularProgress} from "@mui/material";

export default function ConfigurationDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:domain?/:code?/:id?",
        exact: true,
        strict: false
    });

    // LOC === listOfConfigs
    const {data: LOC, isFetching: LOCIsFetching, isSuccess: LOCIsSuccess} = useGetConfigsQuery();
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = refsApi?.useGetRefsQuery();

    const {domain, code, id} = match?.params
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);
    const [currentConfigs, setCurrentConfigs] = useState({});

    let domainForPanel = null;

    if (code && code !== undefined) {
        if (code.includes('email')) domainForPanel = 'email'
        if (code.includes('delai')) domainForPanel = 'delai'
        if (code.includes('control')) domainForPanel = 'control'
    }

    let url = null;

    useEffect(() => {

        if (domain && code && id && LOCIsSuccess && LOC[domain]) {
            const current = LOC[domain]?.items?.find(e=>e.code==code)
            setCurrentConfigs(current)
            url = current?.url?.split('?')[0] || null
        }

        if (url && id) {
            setIsFetching(true)
            fetch(`${url}/${id}`)
                .then(res => {
                    setIsFetching(false)
                    if (res.ok && res.status == 204) return {results:[]}
                    return res.json()
                })
                .then(
                    (result) => {
                        setIsLoaded(true);
                        if (result?.rules) result?.rules.map((e,id)=>e.id = id + 1)
                        setData(result);
                    },
                    (error) => {
                        setIsFetching(false)
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

    }, [domain, code, id, LOCIsSuccess])

    if ((LOCIsFetching || nomRefsIsFetching || isFetching) && !nomRefs && !domain) return <CircularProgress style={{margin: '100px 50%'}}/>

    switch (domain) {
        case 'hft': return <ConfFacturation data={data} nomRefs={nomRefs} code={code} domain={domain} id={id} domainForPanel={domainForPanel} currentConfigs={currentConfigs} error={error} />
        case 'roc': return <ConfRoc data={data} nomRefs={nomRefs} code={code} domain={domain} id={id} domainForPanel={domainForPanel} currentConfigs={currentConfigs} error={error} />

    }

    return (<div>no route</div>);
}
