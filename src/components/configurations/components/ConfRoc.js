import React, {useState} from 'react'
import {Link} from "react-router-dom";

import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {DetailsRocConfAMC} from "./DetailsRocConfAMC";
import {DetailsRocConfTypeConvention} from "./DetailsRocConfTypeConvention";
import {RowInfo} from "./RowInfo";
import {convertDate} from "../../../utils/convertor-utils";
import {factureConfigurationStatus} from "../../../utils/status-utils";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[5],
        fontSize: 14,
        // minWidth: 225,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
}));


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

export const ConfRoc = ({data, nomRefs, domain, code, id, domainForPanel, currentConfigs, error}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };


    let environnements = null

    if (code == 'limit-sim' && data && data?.environments && data?.environments.length > 0 && nomRefs?.RLTN_CLIENT_ENV) {

        let tmpEnv = []
        data.environments.forEach( env => tmpEnv.push(nomRefs?.RLTN_ENV_CLIENT[env]) )
        tmpEnv = [...new Set(tmpEnv)]

        if (tmpEnv.length > 0) {
            environnements = []
            tmpEnv.forEach( env => environnements.push(nomRefs?.CLIENT[env]))
        }
    }

    if (code == 'amc' && nomRefs?.RLTN_CLIENT_ENV[data?.content]) {
        if (nomRefs?.RLTN_CLIENT_ENV[data?.content].length > 1) {
            environnements = <span><LightTooltip
                title={<div style={{whiteSpace: 'pre-line'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h3 style={{margin: '5px'}}><b>Environnements</b></h3>
                        <div style={{
                            minWidth: '225px',
                            paddingLeft: '5px'
                        }}> {nomRefs?.RLTN_CLIENT_ENV[data?.content].join('\n')} </div>
                    </div>
                </div>}
                placement="top"
                arrow>
                <Chip label={nomRefs?.RLTN_CLIENT_ENV[data?.content].length}/>
            </LightTooltip>&nbsp;environnements</span>
        } else if(nomRefs?.RLTN_CLIENT_ENV[data?.content].length == 1) environnements = nomRefs?.RLTN_CLIENT_ENV[data?.content][0]
    }

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
            {data?.label}
        </Typography>,
    ];

    return <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>

        {/*<Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>*/}
        {/*    {data?.type}*/}
        {/*</Typography>*/}

        <Chip label={nomRefs && nomRefs.FACTURE_CONFIGURATION_STATUS[data?.status] || data?.status} sx={{color: 'black', bgcolor: factureConfigurationStatus[data?.status]?.color, margin: '15px 0 0 0'}}/>

        <div style={{display: 'flex', flexDirection: 'row', margin: '25px 0', maxWidth: '1280px'}}>
            <RowInfo label={'Code'} value={data?.id} border={false} id={data?.id} field="id" />
            {(code == 'delai' || code == 'limit-sim') &&
            <RowInfo
                label={'Période de validité'}
                value={`${convertDate(data?.startDate)}${(data?.endDate)? ' - ' :''}${convertDate(data?.endDate)}`}
                styles={{flex: 2}} border={false} id={data?.id} field="endDate" />}

            {code == 'limit-sim' &&
            <RowInfo
                label={'AMC'}
                value={environnements && <div style={{whiteSpace: 'pre-line'}}>{environnements.join('\n')}</div> || ''}
                styles={{flex: 2}} border={false} id={data?.id} field="environnements" />}

            {code == 'type-convention' &&
            <RowInfo label={'Période de validité'}
                      value={`${convertDate(data?.startDate)}${(data?.endDate) ? ' - ' : ''}${convertDate(data?.endDate)}`}
                      border={false} styles={{flex: 2}} id={data?.id} field="endDate" />}

            {nomRefs && code == 'amc' && <RowInfo label={'Groupement clients'} value={nomRefs.RLTN_CLIENT_GROUP[data?.content] || data?.content} border={false}
                id={data?.id} field="content" />}

            {code == 'amc' && <RowInfo label={'Environnements'} value={environnements} justify={true} border={false} id={data?.id} field="environnements" />}

            {domainForPanel !== 'delai' && domain !== 'roc' &&
                <RowInfo label={'Détail du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}>{data?.content?.join('\n')}</div>} border={false}
                id={data?.id} field="content" />}
        </div>

        <Tabs
            TabIndicatorProps={{sx: {top: 0, bgcolor: 'black'}}}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}
        >
            <Tab label="Detail du parametre"  {...a11yProps(0)}/>
        </Tabs>

        <TabPanel value={value} index={0}>
            {code == 'amc' && <DetailsRocConfAMC data={data}/>}
            {code == 'limit-sim' && nomRefs && <DetailsRocConfTypeConvention data={data} nomRefs={nomRefs}/>}
            {code == 'type-convention' &&
                <Box style={{
                    backgroundColor: '#F6F8FC', flex: 1,
                    minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
                }}>
                    <RowInfo label={'Type de convention'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}> {data?.content}</div>} id={data?.id} field="content" />
                </Box>}
            {code == 'delai' &&
                <Box style={{
                    backgroundColor: '#F6F8FC', flex: 1,
                    minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
                }}>
                    <RowInfo label={'Détail du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}> {data?.content} {data?.contentType} </div>}
                        id={data?.id} field="content_contentType" />
                </Box>}
            {/*{JSON.stringify(data)}*/}
        </TabPanel>

    </Box>
}

