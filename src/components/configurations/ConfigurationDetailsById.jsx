import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useEffect, useState} from "react";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {RulesOfConfigGrid} from "./grids/RulesOfConfigGrid";
import {useGetRefsQuery} from "../../services/refsApi";
import {convertDate, factureConfigurationStatus} from "../../utils/utils";
import {useGetConfigsQuery} from "./services/configurationsApi";


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

function separetedMails (data) {
    if (data && data.length > 0) return <span>
        {data.split(';')
            .map( (el, i) =><span key={`to_${i}`} style={{display: 'block'}}>{el}</span>
        )}
    </span>
    return data
}

export default function ConfigurationDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:domain?/:code?/:id?",
        exact: true,
        strict: false
    });

    const {data: LOC, isFetching: LOCIsFetching, isSuccess: LOCIsSuccess} = useGetConfigsQuery(); // LOC === listOfConfigs
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    const {domain, code, id} = match?.params
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(0);

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

    const handleChange = (event, newValue) => { setValue(newValue) };

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Configuration&nbsp;</b>{data?.label}
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {nomRefs && nomRefs.FACTURE_CONFIGURATION_TYPE[data?.type] || data?.type}
            </Typography>

            <Chip label={nomRefs && nomRefs.FACTURE_CONFIGURATION_STATUS[data?.status] || data?.status} sx={{color: 'black', bgcolor: factureConfigurationStatus[data?.status]?.color, margin: '15px 0 0 0'}}/>

            <div style={{display: 'flex', flexDirection: 'column', margin: '25px 0 25px 0'}}>
                <RowInfo
                    label={'Période de validité'}
                    value={`${convertDate(data?.startDate)}${(data?.endDate)? ' - ' :''}${convertDate(data?.endDate)}`}
                    justify={true}/>
                {domainForPanel !== 'delai' && <RowInfo label={'Détails du paramètre'}
                          value={data?.motif || <div style={{whiteSpace: 'pre-line'}}>{data?.content?.join('\n')}</div>}
                          justify={true}/>}
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
                <Tab label="Elements associes"  {...a11yProps(0)}/>
            </Tabs>

            <TabPanel value={value} index={0}>
                {(domainForPanel !== 'email') && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'
                }}>

                    <RowInfo label={'Nombre de règles'} value={data?.rules?.length}/>
                    {domainForPanel == 'delai' && <RowInfo label={'Détails du paramètre'}
                                                           value={data?.motif || <div style={{whiteSpace: 'pre-line'}}>
                                                               {data?.content} mois
                                                           </div>} justify={true}/>}

                    {isLoaded && <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '5%'}}>
                            {data?.rules && nomRefs && <RulesOfConfigGrid data={data?.rules} nomRefs={nomRefs}/>}
                        </div>
                    </div>}

                </Box>}
                {(domainForPanel == 'email') && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'
                }}>
                    <h3><b>Détails du paramètres</b></h3>
                    <RowInfo label={'Objet du email'} value={data?.subject}/>
                    <RowInfo label={'Corps du email'} value={data?.body} justify={true}/>
                    <RowInfo label={'Expéditeur du email'} value={data?.from}/>
                    <RowInfo label={'Destinataire du email'} value={separetedMails(data?.to)}/>

                </Box>}

                {JSON.stringify(data)}
            </TabPanel>

        </Box>
    );
}
