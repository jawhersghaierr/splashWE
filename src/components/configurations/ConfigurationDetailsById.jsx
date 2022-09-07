import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useEffect, useState} from "react";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {ConfigutationGrid} from "./grids/GridRulesOfConfig";


function TabPanel(props) {
    const { children, value, index, data, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{minHeight: '300px', background: 'white', padding: '15px'}}>

            {value === index && children}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default function ConfigurationDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:id",
        exact: true,
        strict: false
    });
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (match?.params?.id) {
            fetch(`http://10.241.25.10:8005/api/v1/configurations/${match.params.id}`)
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
    }, [])

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Configuration > {match?.params?.id}</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                type: {data?.type}
            </Typography>

            <Chip label={data?.status} sx={{color: 'black', margin: '15px 0 0 0'}}/>

            <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'Code'} value={data?.code}/>
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'Periode de validate'} value={data?.timestamp}/>
                </div>
            </div>

            <Tabs
                TabIndicatorProps={{sx: {top: 0, bgcolor: 'black'}}}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                // aria-label="scrollable auto tabs example"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}
            >
                <Tab label="Elemnts associes"  {...a11yProps(0)}/>
            </Tabs>

            <TabPanel value={value} index={0}>
                <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>

                    <RowInfo label={'Nombre de regies'} value={data?.rules?.length}/>

                    {isLoaded && <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '5%'}}>
                            {data?.rules && <ConfigutationGrid data={data?.rules}/>}

                            {JSON.stringify(data)}
                        </div>
                    </div>}

                </Box>
            </TabPanel>

        </Box>
    );
}
