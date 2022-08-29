import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {GridConfigutation} from "./grids/GridConfigutation";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import './configuration.scss'
import {matchPath} from "react-router-dom";
import {useGetConfigsQuery} from "./services/configurationsApi";



export const Configuration = ({config}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(config?.url)
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
    }, [config])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (<>

            <SearchAccordion code={config?.code} />

            {items && <GridConfigutation data={items}/>}
            <div style={{minHeight: '200px', background: 'white', padding: '15px', maxWidth: '600px', margin: '15px'}}>

                {items && <pre style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    background: 'white',
                    margin: 0,
                    padding: 0
                }}>
                    {JSON.stringify(items)}
                </pre>}
            </div>
        </>);
    }
}
