import * as React from 'react';
import {useEffect, useState} from "react";
import {matchPath} from "react-router-dom";
import {useGetRefsQuery} from "../../services/refsApi";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {ConfFacturation} from "./components/ConfFacturation";
import {ConfRoc} from "./components/ConfRoc";

export default function ConfigurationDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:domain?/:code?/:id?",
        exact: true,
        strict: false
    });

    // LOC === listOfConfigs
    const {data: LOC, isFetching: LOCIsFetching, isSuccess: LOCIsSuccess} = useGetConfigsQuery();
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    const {domain, code, id} = match?.params
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    let domainForPanel = null;

    if (code && code !== undefined) {
        if (code.includes('email')) domainForPanel = 'email'
        if (code.includes('delai')) domainForPanel = 'delai'
        if (code.includes('control')) domainForPanel = 'control'
    }

    let url = null;

    useEffect(() => {

        if (domain && code && id && LOCIsSuccess && LOC[domain]) {
            url = LOC[domain]?.items?.find(e=>e.code==code)?.url?.split('?')[0] || null
        }

        if (url && id) {
            fetch(`${url}/${id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        if (result?.rules) result?.rules.map((e,id)=>e.id = id)
                        setData(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

    }, [domain, code, id, LOCIsSuccess])

    if (!isLoaded && nomRefsIsSuccess && nomRefs) return 'Loading ...'

    console.log('domain > ', domain)
    switch (domain) {
        case 'hft': return <ConfFacturation data={data} nomRefs={nomRefs} code={code} domain={domain} id={id} domainForPanel={domainForPanel} error={error}/>
        case 'roc': return <ConfRoc data={data} nomRefs={nomRefs} code={code} domain={domain} id={id} domainForPanel={domainForPanel} error={error}/>

    }

    return (
        <ConfFacturation data={data} nomRefs={nomRefs} code={code} domain={domain} id={id} domainForPanel={domainForPanel} error={error}/>
    );
}
