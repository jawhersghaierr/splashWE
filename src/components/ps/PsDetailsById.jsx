import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetEtsByIdQuery} from "./services/psApi";
import {statusRow} from "./utils/utils";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import {Link, matchPath} from "react-router-dom";
import {Button, CircularProgress, Typography} from "@mui/material";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import {useState} from "react";



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
export default function PsDetailsById({location, modalId = null}) {

    const match = matchPath(location?.pathname, {
        path: "/PS/:id",
        exact: true,
        strict: false
    });
    const psID = (modalId)? modalId: match?.params?.id;
    const [value, setValue] = useState(0);
    const {data = null, isFetching, isSuccess} = useGetEtsByIdQuery(psID);
    const statRow = data?.statutRibs && statusRow(data?.statutRibs) || null
    const shown = data?.statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;
    const {data: resultData, isFetching: DisciplineIsFetching, isSuccess: DisciplineIsSuccess} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })
    const handleChange = (event, newValue) => { setValue(newValue) };
    const reShapeDiscipline = (_discipline) => resultData.find(item => item.code.toString() === _discipline)?.libelle || ''

    if ( isFetching || DisciplineIsFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                    <b>{data?.raisonSociale}</b>
                </Typography>

                {!!!modalId && <Link to={`/PS`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" size="medium" className="RoundedEmptyButt" style={{marginRight: '10px'}}>
                        Revenir
                    </Button>
                </Link>}

            </div>
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
                {data && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>
                    <h2><b>Coordonnées</b></h2>
                    {data?.adresse1 && <Typography variant="subtitle1" noWrap component="div" sx={{ color: '#003154', padding: '5px 0' }}>adresse: <b>{data.adresse1}</b></Typography>}
                    {data?.adresse2 && <Typography variant="subtitle1" noWrap component="div" sx={{ color: '#003154', padding: '5px 0' }}>adresse2: <b>{data.adresse2}</b></Typography>}
                    {data?.codePostal && <Typography variant="subtitle1" noWrap component="div" sx={{ color: '#003154', padding: '5px 0' }}>Code Postal: <b>{data.codePostal}</b></Typography>}
                    {data?.ville && <Typography variant="subtitle1" noWrap component="div" sx={{ color: '#003154', padding: '5px 0' }}>Ville: <b>{data.ville}</b></Typography>}
                </Box>}
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
