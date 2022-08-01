import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetEtsByIdQuery} from "./services/psApi";
import {statusRow} from "./utils/utils";
import {useEffect} from "react";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';



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
export default function PsDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/PS/:id",
        exact: true,
        strict: false
    });

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null} = useGetEtsByIdQuery(match?.params?.id);

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
                <b>{data?.raisonSociale}</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                ROC
            </Typography>
            <div>
                {(data?.disciplines && resultData) && data?.disciplines.map((e, i)=><Chip label={reShapeDiscipline(e)} sx={{color: 'black'}} sx={{margin: '10px 10px 10px 0'}} key={`chip_${i}`}/>)}
                {data &&
                    <div style={{display: 'flex', alignItems: 'center', padding: '15px 0', margin: '15px 0', height: '50px'}}>
                        Nº de partenaire&nbsp;:&nbsp;<b style={{color: '#00C9E9'}}>{data.numPartenaire}</b> &nbsp;
                        <Tooltip
                            title={'Finess Géographique'}
                            placement="top" arrow>
                            <InfoOutlinedIcon/>
                        </Tooltip>
                        <span style={{marginLeft: '50px'}}>Finess Juridique&nbsp;:&nbsp;<b style={{color: '#00C9E9'}}>{data.finessJuridique}</b></span>
                    </div>}
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
                <Tab label={<div>RIB&nbsp;
                    {data?.statutRibs && <Chip label={`${statRow[shown]?.count} ${statRow[shown]?.label}${(statRow[shown]?.count > 1)? 's' : ''}`}
                           sx={{bgcolor: statRow[shown]?.color, color: 'black'}}/>}
                </div>}  {...a11yProps(1)} />
                <Tab label="Droits"  {...a11yProps(2)}/>
                <Tab label="Historique" {...a11yProps(3)} />

            </Tabs>
            <TabPanel value={value} index={0} data={data}>
                <h3><b>Coordonnes</b></h3>
                {data && <div>
                    <p>{`adresse: ${data.adresse1}`}</p>
                    {data?.adresse2 && <p>{`adresse2: ${data.adresse2}`}</p>}
                    {data?.codePostal || data?.ville &&
                        <p>
                            {data?.codePostal && <span>
                                {`Code Postal: ${data.codePostal}`}
                            </span>}
                            {data?.ville && <span>
                                {`Ville: ${data.ville}`}
                            </span>}
                        </p>
                    }
                </div>}
            </TabPanel>
            <TabPanel value={value} index={1} data={data}>
                {/*<div>Item two</div>*/}
            </TabPanel>
            <TabPanel value={value} index={2} data={data}>
                {/*<div>Item tree</div>*/}
            </TabPanel>
            <TabPanel value={value} index={3} data={data}>
                {/*<div>Item four</div>*/}
            </TabPanel>

        </Box>
    );
}
