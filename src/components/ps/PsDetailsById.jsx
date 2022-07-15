import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetEtsByIdQuery} from "./services/psApi";
import {statusRow} from "./utils/utils";
import {useEffect} from "react";


export default function PsDetailsById({disciplines: disciplinesList, content: {id, statutRibs, disciplines}}) {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let {data = null} = useGetEtsByIdQuery(id);

    const statRow = statutRibs && statusRow(statutRibs) || null
    const shown = statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;

    useEffect(() => {

        console.log(disciplinesList);
        console.log('^^^^^^^^^^^^^^^^^^^^');
    }, [statRow, disciplinesList]);

    const reShapeDiscipline = (_discipline) => disciplinesList.find(item => item.code.toString() === _discipline)?.libelle || ''

    return (

        <Box sx={{ bgcolor: 'background.paper'}}>
            <div>
                {disciplines && disciplines.map((e, i)=><Chip label={reShapeDiscipline(e)} sx={{color: 'black'}} sx={{margin: '15px'}} key={`chip_${i}`}/>)}
                {data && <div sx={{display: 'block', padding: '15px', margin: '15px'}}>Numero partenaire <b>{data.numPartenaire}</b> Finess Juridique: <b>{data.finessJuridique}</b></div>}
            </div>
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
