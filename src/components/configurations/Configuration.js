import React, {useEffect, useState} from 'react';
import SearchAccordion from "./searches/SearchAccordion";
import {ConfigutationsGrid} from "./grids/ConfigutationsGrid";
import ConfigurationDetailsById from "./ConfigurationDetailsById";
import './configuration.scss'

export const Configuration = ({config, nomRefs}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [configItem, setConfigItem] = useState(null);

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

    useEffect(() => {
        console.log('configItem > ', configItem)
        console.log('config > ', config)
    }, [configItem])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (<>

            <SearchAccordion code={config?.code} nomRefs={nomRefs}/>

            {items && !configItem && <ConfigutationsGrid data={items?.results} nomRefs={nomRefs} configItem={setConfigItem} config={config}/>}}
            {configItem && <ConfigurationDetailsById configItem={configItem} config={config} />}
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
