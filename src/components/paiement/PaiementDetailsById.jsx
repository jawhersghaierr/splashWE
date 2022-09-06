import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {convertDate, dateConvertNaissance, facturesStatus, statusRow} from "./utils/utils";
import {useEffect} from "react";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {HistoryGrid} from "./grids/HistoryGrid";
import {useGetPaiementByIdQuery} from "./services/paiementsApi";
import {AssociesGrid} from "./grids/AssociesGrid";



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


const oneRowHeader = ({ dateCreation, dateModification}) => {

    return <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
        <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
            <RowInfo label={'Date de creation'} value={convertDate(dateCreation)}/>
        </div>
        <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
            <RowInfo label={'Derniere modification'} value={convertDate(dateModification)}/>
        </div>
    </div>
}




export default function PaiementDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/paiement/:id",
        exact: true,
        strict: false
    });

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null} = useGetPaiementByIdQuery(match?.params?.id);

    const statRow = data?.statutRibs && statusRow(data?.statutRibs) || null
    const shown = data?.statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Détails du paiement</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {data?.idFacture}
            </Typography>

            <Chip label={data?.paiementStatus}  sx={{color: 'black', margin: '15px 0 0 0' }}/>

            <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'Montant RC'} value={data?.rc}/>
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
                    <RowInfo label={'Facture'} value={data?.numFacture}/>
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
                <Tab label="ELEMENT ASSOCIES"  {...a11yProps(0)}/>
                <Tab label="HISTORIQUE"  {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0} data={data}>
                {data && oneRowHeader(data)}
                {(data?.associes && data?.associes.length > 0) && <AssociesGrid data={data?.associes}/>}
            </TabPanel>

            <TabPanel value={value} index={1} data={data}>
                {data && oneRowHeader(data)}
                {(data?.historyElements && data?.historyElements.length > 0) && <HistoryGrid data={data?.historyElements}/>}
            </TabPanel>

        </Box>
    );
}
