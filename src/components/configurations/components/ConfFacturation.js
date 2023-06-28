import React, { useState } from 'lib_ui/react'
import {Link} from 'lib_ui/react-router-dom';


import {
    Box,
    Chip,
    Typography,
    Tab, Tabs,
} from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { RulesOfConfigGrid } from "../grids/RulesOfConfigGrid";
import { RowInfo } from "./RowInfo";
import { DetailsFactureMailConf } from "./DetailsFactureMailConf";

import {
    NoGridResultsAlert,
    convertDate,
    factureConfigurationStatus
} from "shared_lib_ui/Lib";


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

export const ConfFacturation = ({data, nomRefs, domain, code, id, domainForPanel, error, currentConfigs, isFetching}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/configuration" style={{textDecoration: 'none'}} >
            <Typography variant="h6" noWrap component="div" sx={{color: '#4C6F87'}}>
                <b>Configuration</b>
            </Typography>
        </Link>,
        <Link key="2" color="inherit" to={`/configuration/${domain}/${code}`} style={{textDecoration: 'none'}}>
            <Typography variant="h6" noWrap component="div" sx={{color: '#4C6F87'}}>
                <b>{currentConfigs?.label}</b>
            </Typography>
        </Link>,
        <Typography key="3" variant="h6" noWrap component="div" sx={{color: '#4C6F87'}}>
            {data?.libelle}
        </Typography>,
    ];


    return <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>

        <Chip label={nomRefs && nomRefs.FACTURE_CONFIGURATION_STATUS[data?.status] || data?.status} sx={{color: 'black', bgcolor: factureConfigurationStatus[data?.status]?.color, margin: '15px 0 0 0'}}/>

        <div style={{display: 'flex', flexDirection: 'rows', margin: '25px 0 25px 0'}}>
            <RowInfo label={'Code'} value={data?.id} id={data?.id} field="id" />

            <RowInfo label={'Période de validité'}
                value={`${convertDate(data?.dateDebut)}${(data?.dateFin)? ' - ' :''}${convertDate(data?.dateFin)}`} id={data?.id} field="startDate_endDate" />

                {/*{domainForPanel !== 'delai' && domain !== 'roc' && <RowInfo label={'Détails du paramètre'}*/}
                {/*     value={data?.motif || <div style={{whiteSpace: 'pre-line'}}>{data?.content?.join('\n')}</div>} />}*/}
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

                {domainForPanel !== 'delai' && <RowInfo label={'Nombre de règles'} value={data?.rules?.length} id={data?.id} field="rules" />}
                {domainForPanel == 'delai' && <RowInfo label={'Détail du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}> {data?.content} mois </div>} id={data?.id} field="content" />}

                {domainForPanel !== 'delai' && <div style={{display: 'flex', flexDirection: 'row'}}>
                    {data?.rules && data?.rules.length > 0 && nomRefs && <div style={{minWidth: '100%'}}><RulesOfConfigGrid data={data?.rules} nomRefs={nomRefs}/></div>}
                    {(!data?.rules || data?.rules?.length == 0) && nomRefs && <NoGridResultsAlert/>}
                </div>}

            </Box>}
            {(domainForPanel == 'email') && <DetailsFactureMailConf data={data} />}

        </TabPanel>

    </Box>
}

