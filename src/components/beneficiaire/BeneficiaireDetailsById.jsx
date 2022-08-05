import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetBenefByIdQuery} from "./services/beneficiaireApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";





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
            {data && <div style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                background: 'white',
                margin: 0,
                padding: 0,
                display: 'flex'
            }}>
                {value === index && children}
                {/*{JSON.stringify(data)}*/}
            </div>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}




export default function BeneficiaireDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/beneficiaire/:id",
        exact: true,
        strict: false
    });

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null} = useGetBenefByIdQuery(match?.params?.id);


    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <h3><b>{data?.prenom}&nbsp;{data?.nom}</b></h3>
                {data?.lienFamillialLabel}
            </Typography>

            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                <Chip label={data?.status} sx={{color: 'black', margin: '5px'}}/>
            </Typography>

            <div style={{margin: '25px 0'}}>
                {data?.numeroAdherentIndividuel && <span style={{margin: '5px 25px 5px 0'}}>{`N Adherent individuel : ${data?.numeroAdherentIndividuel}`}</span>}
                {data?.numeroAdherentFamilial && <span style={{margin: '5px 25px 5px 0'}}>{`N Adherent Familial : ${data?.numeroAdherentFamilial}`}</span>}
                {data?.numeroAdherentIndividuel && <span style={{margin: '5px 15px 5px 0'}}>
                    {`Droits ouverts : ${data?.numeroAdherentIndividuel}`}
                </span>}
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
                <Tab label={"Contrat"}  {...a11yProps(1)} />
                <Tab label="Carte et couvertures"  {...a11yProps(2)}/>
                <Tab label="Autres beneficiares"  {...a11yProps(3)}/>
                <Tab label="Historique" {...a11yProps(4)} />

            </Tabs>
            <TabPanel value={value} index={0} data={data} sx={{display: 'flex', flexDirection: 'row'}}>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Identite</b></h3>
                    {data && <div>
                        {data?.prenom && data?.nom && <div>{`Nome et prenom : ${data.prenom} ${data.nom}`}</div>}
                        {data?.rangNaissance && <div>Rang et date de naissance : <Chip label={data.rangNaissance} sx={{margin: '5px'}}/><b>{data.dateNaissance}</b></div>}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Coordinees</b></h3>
                    {data && <div>
                        {data?.adresse && <div>{`Adresse: ${data.adresse}`}</div>}
                        {data?.ville && <div>{`Ville: ${data.ville}`}</div>}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Regime</b></h3>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1} data={data}>
                <div>Item two</div>
            </TabPanel>
            <TabPanel value={value} index={2} data={data} sx={{display: 'flex'}}>
                <div style={{flex: 1}}>Item tree</div>
                <Box style={{backgroundColor: '#f3f3f3', flex: 2, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Coordinees</b></h3>
                    {data && <div>
                        {data?.adresse && <div>{`Adresse: ${data.adresse}`}</div>}
                        {data?.ville && <div>{`Ville: ${data.ville}`}</div>}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 2, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Coordinees</b></h3>
                    {data && <div>
                        {data?.adresse && <div>{`Adresse: ${data.adresse}`}</div>}
                        {data?.ville && <div>{`Ville: ${data.ville}`}</div>}
                    </div>}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={3} data={data}>
                <div>Item four</div>
            </TabPanel>
            <TabPanel value={value} index={4} data={data}>
                <div>Item fifth</div>
            </TabPanel>
            <div style={{minHeight: '300px', background: 'white', padding: '15px', maxWidth: '600px'}}>
                {data && <pre style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    background: 'white',
                    margin: 0,
                    padding: 0
                }}>
                    {JSON.stringify(data)}
                </pre>}
            </div>
        </Box>
    );
}
