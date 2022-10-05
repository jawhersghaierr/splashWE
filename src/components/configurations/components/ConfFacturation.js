import React, {useState} from 'react'
import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {convertDate} from "../../../utils/convertor-utils";
import {factureConfigurationStatus} from "../../../utils/status-utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {RulesOfConfigGrid} from "../grids/RulesOfConfigGrid";
import {RowInfo} from "../../beneficiaire/components/RowInfo";
import {DetailsFactureMailConf} from "./DetailsFactureMailConf";

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

export const ConfFacturation = ({data, nomRefs, domain, code, id, domainForPanel, error}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    return <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
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

                {domainForPanel !== 'delai' && domain !== 'roc' && <RowInfo label={'Détails du paramètre'}
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

                {domainForPanel !== 'delai' && <RowInfo label={'Nombre de règles'} value={data?.rules?.length}/>}
                {domainForPanel == 'delai' && <RowInfo label={'Détails du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}> {data?.content} mois </div>} justify={true}/>}

                {domainForPanel !== 'delai' && <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{flex: 1, marginRight: '5%'}}>
                        {data?.rules && nomRefs && <RulesOfConfigGrid data={data?.rules} nomRefs={nomRefs}/>}
                    </div>
                </div>}

            </Box>}
            {(domainForPanel == 'email') && <DetailsFactureMailConf data={data} />}

            {/*{JSON.stringify(data)}*/}
        </TabPanel>

    </Box>
}

