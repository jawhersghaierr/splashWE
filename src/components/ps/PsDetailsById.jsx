import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetEtsByIdQuery} from "./services/psApi";
import {statusRow} from "./utils/utils";
import {useEffect} from "react";

export default function PsDetailsById({content: {id, statutRibs}}) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const {id = null, statutRibs: ribs} = content;

    const {data} = (id && id !== undefined)? useGetEtsByIdQuery(id) : null;
    console.log(id, ' : ', statutRibs);
    // debugger
    const statRow = statutRibs && statusRow(statutRibs) || null
    const shown = statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;

    useEffect(() => {

        console.log(statRow);
        console.log('^^^^^^^^^^^^^^^^^^^^');
    }, [statRow]);

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Tabs
                TabIndicatorProps={{sx: {top: 0}}}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white'}}}
            >
                <Tab label="Information generales" />
                <Tab label={<div>RIB&nbsp;
                    {/*<Chip label="1 en attante" sx={{ bgcolor: '#FF5D5D', color: 'white' }} color={'primary'}/>*/}
                    {statutRibs && <Chip label={`${statRow[shown]?.count} ${statRow[shown]?.label}`}
                           sx={{bgcolor: statRow[shown]?.color, color: 'black'}}/>}
                </div>} value="/messages" />
                <Tab label="Droits" />
                <Tab label="Historiques" />

            </Tabs>
            {data && <pre style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                background: 'white',
                margin: 0,
                padding: 0
            }}>{JSON.stringify(data)}</pre>}
        </Box>
    );
}
