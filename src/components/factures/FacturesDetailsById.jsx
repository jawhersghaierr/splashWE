import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetFactureByIdQuery} from "./services/facturesApi";
import {statusRow} from "./utils/utils";
import {useEffect} from "react";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {RowInfo} from "./components/RowInfo";
import {ActesGrid} from "./grids/ActesGrid";



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
export default function FacturesDetailsById(props) {

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
                <b>Details de la facture</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {data?.numFact}
            </Typography>
            <Chip label={data?.status} sx={{color: 'black'}}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{flex: 1}}>
                    <RowInfo label={'Date d\'admission'} value={data?.factData?.dateEntree}/>
                    <RowInfo label={'Beneficiaire'} value={(data?.ben)?
                        <span><b>{data?.ben?.nom}</b> {data?.ben?.prenom}</span> :
                        <span><b>{data?.benInputData?.nom}</b> {data?.benInputData?.prenom}</span>} />
                    <RowInfo label={'Enviroment'} value={data?.numEnv}/>
                    <RowInfo label={'Date de creation'} value={data?.factTransData?.receivedDate}/>
                </div>
                <div style={{flex: 1}}>
                    <RowInfo label={'FINESS Géographique'} value={data?.ps?.numId}/>
                    <RowInfo label={'Nº Adherant'} value={(data?.ben)? data?.ben?.numAdhInd : data?.benInputData?.numAdh}/>
                    <RowInfo label={'AMC'} value={data?.numClient}/>
                    <RowInfo label={'Derniere modification'} value={data?.timestamp}/>
                </div>
                <div style={{flex: 1}}>
                    <RowInfo label={'FINESS juridique'} value={data?.ps?.numJur}/>
                    <RowInfo label={'Rang et date de naissance'}
                             value={(data?.ben)? data?.ben?.dateNai : data?.benInputData?.dateNai}
                             chip={(data?.ben)? data?.ben?.rangNai : data?.benInputData?.rangNai}
                    />
                    <RowInfo label={'Montant RC'} value={`${data?.totalRc} €`}/>
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
                <Tab label={<div>Actes&nbsp;{(data?.factLines && data?.factLines.length) && <Chip label={data?.factLines.length} sx={{color: 'black'}}/>} </div>}  {...a11yProps(1)} />
                <Tab label="Sel associes"  {...a11yProps(2)}/>
                <Tab label="Paiements" {...a11yProps(3)} />

            </Tabs>
            <TabPanel value={value} index={0} data={data}>
                {data && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>

                    <h2><b>Informations demande</b></h2>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '25px'}}>
                            <RowInfo label={'Nº d\'angagemant'} value={data?.factData.numEng} border={true} justify={true}/>
                            <RowInfo label={'Date de reception'} value={data?.factTransData?.receivedDate} border={true} justify={true}/>
                            <RowInfo label={'Domaine'} value={data?.factData?.domaine} border={true} justify={true}/>
                            <RowInfo label={'Motif de reje'} value={data?.errorLabel} border={true} justify={true}/>
                        </div>
                        <div style={{flex: 1    }}>
                            <RowInfo label={'Date facture'} value={data?.factData.dateFact}/>
                            <RowInfo label={'ID periode de facturation - Nº d\'occurance'} value={`${data?.factData.idPeriodeFact} - ${data?.factData.occId}`} border={true} justify={true}/>
                            <RowInfo label={'Date accident de travai'} value={data?.factData?.numDateAccident} border={true} justify={true}/>
                            <RowInfo label={'Message de reje'} value={data?.comment} border={true} justify={true}/>
                        </div>
                    </div>

                </Box>}
            </TabPanel>
            <TabPanel value={value} index={1} data={data}>

                {(data?.factLines && factLines.length > 0) && <ActesGrid data={factLines}/>}

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
