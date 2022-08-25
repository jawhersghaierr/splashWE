import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetFactureByIdQuery} from "./services/configurationsApi";
import {statusRow} from "./utils/utils";
import {useEffect} from "react";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {RowInfo} from "./components/RowInfo";


function TabPanel(props) {
    const { children, value, index, data, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{minHeight: '300px', background: 'white', padding: '15px'}}>
            {data && <pre style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                background: 'white',
                margin: 0,
                padding: 0
            }}>
                {value === index && children}
                {/*{JSON.stringify(data)}*/}
            </pre>}
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
        path: "/factures/:id",
        exact: true,
        strict: false
    });

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null} = useGetFactureByIdQuery(match?.params?.id);
    let factLines = []
    if (data?.factLines) data?.factLines.forEach((e, id)=>factLines.push({id, ...e}))

    const statRow = data?.statutRibs && statusRow(data?.statutRibs) || null
    const shown = data?.statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;

    const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })

    // useEffect(() => {
    //     console.log(resultData);
    // }, [resultData]);

    const reShapeDiscipline = (_discipline) => resultData.find(item => item.code.toString() === _discipline)?.libelle || ''


    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Details de la configuration</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                some text
            </Typography>

            <Chip label={'data?.status'} sx={{color: 'black', margin: '15px 0 0 0'}}/>

            <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'some text 1'} value={'some sub value 1'}/>
                    <RowInfo label={'some text 2'} value={'some sub value 2'} />
                    <RowInfo label={'some text 3'}
                             value={'some sub value 3'}
                             chip={'chip 3'}
                    />
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
                <Tab label="Informations generales"  {...a11yProps(0)}/>
                <Tab label={<div>Info&nbsp;{(true) && <Chip label={'info'} sx={{color: 'black'}}/>} </div>}  {...a11yProps(1)} />
                <Tab label="Other tab 2"  {...a11yProps(2)}/>
                <Tab label="Other tab 3" {...a11yProps(3)} />
            </Tabs>

            <TabPanel value={value} index={0} data={data}>
                {data && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>
                    <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                        <b>Informations</b>
                    </Typography>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '5%'}}>
                            <RowInfo label={'some text 1'} value={'some sub value 1'}/>
                            <RowInfo label={'some text 2'} value={'some sub value 2'} />
                            <RowInfo label={'some text 3'}
                                     value={'some sub value 3'}
                                     chip={'chip 3'}
                            />
                        </div>
                        <div style={{flex: 1    }}>
                            <RowInfo label={'some text 1'} value={'some sub value 1'}/>
                            <RowInfo label={'some text 2'} value={'some sub value 2'} />
                            <RowInfo label={'some text 3'}
                                     value={'some sub value 3'}
                                     chip={'chip 3'}
                            />
                        </div>
                    </div>

                </Box>}
            </TabPanel>
            <TabPanel value={value} index={1} data={data}>

                <RowInfo label={'some text 1'} value={'some sub value 1'}/>
                <RowInfo label={'some text 2'} value={'some sub value 2'} />
                <RowInfo label={'some text 3'}
                         value={'some sub value 3'}
                         chip={'chip 3'}
                />

            </TabPanel>

            <TabPanel value={value} index={2} data={data}>
                <RowInfo label={'some text 1'} value={'some sub value 1'}/>
                <RowInfo label={'some text 2'} value={'some sub value 2'} />
                <RowInfo label={'some text 3'}
                         value={'some sub value 3'}
                         chip={'chip 3'}
                />
            </TabPanel>
            <TabPanel value={value} index={3} data={data}>
                <RowInfo label={'some text 1'} value={'some sub value 1'}/>
                <RowInfo label={'some text 2'} value={'some sub value 2'} />
                <RowInfo label={'some text 3'}
                         value={'some sub value 3'}
                         chip={'chip 3'}
                />
            </TabPanel>

        </Box>
    );
}
