import React, {useState} from 'react'
import Chip from '@mui/material/Chip';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {convertDate, factureConfigurationStatus} from "../../../utils/utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {RowInfo} from "../../beneficiaire/components/RowInfo";
import {DetailsRocConfAMC} from "./DetailsRocConfAMC";
import {DetailsRocConfTypeConvention} from "./DetailsRocConfTypeConvention";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";

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

export const ConfRoc = ({data, nomRefs, domain, code, id, domainForPanel, error}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };


    let RLTN_CLIENT_ENV = {}
    let environnements = null

        nomRefs?.RLTN_CLIENT_ENV.forEach(nom => RLTN_CLIENT_ENV = {...RLTN_CLIENT_ENV, ...nom})

    if (code == 'amc' && RLTN_CLIENT_ENV[data?.content]) {
        if (RLTN_CLIENT_ENV[data?.content].length > 1) {
            environnements = <span><LightTooltip
                title={<div style={{whiteSpace: 'pre-line'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h3 style={{margin: '5px'}}><b>Environnements</b></h3>
                        <div style={{
                            minWidth: '225px',
                            paddingLeft: '5px'
                        }}> {RLTN_CLIENT_ENV[data?.content].join('\n')} </div>
                    </div>
                </div>}
                placement="top"
                arrow>
                <Chip label={RLTN_CLIENT_ENV[data?.content].length}/>
            </LightTooltip>&nbsp;environnements</span>
        } else if(RLTN_CLIENT_ENV[data?.content].length == 1) environnements = RLTN_CLIENT_ENV[data?.content][0]
    }

    return <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
        <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
            <b>Configuration&nbsp;</b>{data?.content}-{data?.label}
        </Typography>
        <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
            {data?.type}
        </Typography>

        <Chip label={nomRefs && nomRefs.FACTURE_CONFIGURATION_STATUS[data?.status] || data?.status} sx={{color: 'black', bgcolor: factureConfigurationStatus[data?.status]?.color, margin: '15px 0 0 0'}}/>

        <div style={{display: 'flex', flexDirection: 'row', margin: '25px 0', maxWidth: '1280px'}}>
            <RowInfo label={'Code'} value={data?.id} border={false}/>
            {code == 'delai' || code == 'limit-sim' &&
            <RowInfo
                label={'Période de validité'}
                value={`${convertDate(data?.startDate)}${(data?.endDate)? ' - ' :''}${convertDate(data?.endDate)}`}
                styles={{flex: 2}} border={false}/>}

            {code == 'type-convention' &&
            <RowInfo label={'Période de validité'}
                      value={`${convertDate(data?.startDate)}${(data?.endDate) ? ' - ' : ''}${convertDate(data?.endDate)}`}
                      border={false} styles={{flex: 2}}/>}

            {nomRefs && code == 'amc' && <RowInfo label={'Groupement clients'} value={nomRefs.RLTN_CLIENT_GROUP[data?.content] || data?.content} border={false}/>}
            {/*// data?.content =>RLTN_CLIENT_GROUP  */}

            {code == 'amc' && <RowInfo label={'Environnements'} value={environnements} justify={true} border={false}/>}
            {/*// data?.content =>RLTN_CLIENT_ENV  */}

            {domainForPanel !== 'delai' && domain !== 'roc' &&
                <RowInfo label={'Détails du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}>{data?.content?.join('\n')}</div>} border={false}/>}
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
                    <RowInfo label={'Détails du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}> {data?.content} mois </div>}/>
                </Box>}
            {code == 'delai' &&
                <Box style={{
                    backgroundColor: '#F6F8FC', flex: 1,
                    minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
                }}>
                    <RowInfo label={'Détails du paramètre'} value={data?.motif || <div style={{whiteSpace: 'pre-line'}}> {data?.content} mois </div>} justify={true}/>
                </Box>}
            {/*{JSON.stringify(data)}*/}
        </TabPanel>

    </Box>
}

