import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Chip} from "@material-ui/core";
import {useGetEtsByIdQuery} from "./services/psApi";

export default function PsDetailsById(id) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {data} = useGetEtsByIdQuery(id);

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Information generales" />
                <Tab label={<div>RIB&nbsp;
                    <Chip label="1 en attante" color="secondary"/>
                </div>} value="/messages" />
                <Tab label="Droits" />
                <Tab label="Historiques" />

            </Tabs>
            {data && <pre style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
            }}>{JSON.stringify(data)}</pre>}
        </Box>
    );
}
