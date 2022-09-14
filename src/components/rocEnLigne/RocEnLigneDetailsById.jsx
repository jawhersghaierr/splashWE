import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetRocEnLigneByIdQuery} from "./services/rocEnLigneApi";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {ActesGrid} from "./grids/ActesGrid";
import {SelAssociesGrid} from "./grids/SelAssociesGrid";
import {PaimentsGrid} from "./grids/PaimentsGrid";
import {FluxInfo} from "./components/FluxInfo";

import {convertDate, currencyFormatter, dateConvertNaissance, facturesStatus} from "../../utils/utils";
import {statusRow} from "./utils/utils";
import {useGetRefsQuery} from "../../services/refsApi";


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
export default function RocEnLigneDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/factures/:id",
        exact: true,
        strict: false
    });

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null} = useGetRocEnLigneByIdQuery(match?.params?.id);
    let factLines = []
    if (data?.factLines) data?.factLines.forEach((e, id)=>factLines.push({id, ...e}))

    const statRow = data?.statutRibs && statusRow(data?.statutRibs) || null
    const shown = data?.statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;

    const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();


    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Détails de la facture</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {data?.numFact}
            </Typography>

            <Chip label={`${facturesStatus[data?.status]?.label}`}  sx={{color: 'black', bgcolor: facturesStatus[data?.status]?.color, margin: '15px 0 0 0' }}/>

            <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'Date d\'admission'} value={convertDate(data?.factData?.dateEntree)}/>
                    <RowInfo label={'Bénéficiaire'} value={(data?.ben)?
                        <span><b>{data?.ben?.nom}</b> {data?.ben?.prenom}</span> :
                        <span><b>{data?.benInputData?.nom}</b> {data?.benInputData?.prenom}</span>} />
                    <RowInfo label={'Environnement'} value={data?.numEnv}/>
                    <RowInfo label={'Date de création'} value={convertDate(data?.factTransData?.receivedDate)}/>
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
                    <RowInfo label={'FINESS géographique'} value={data?.ps?.numId}/>
                    <RowInfo label={'Nº adhérent'} value={(data?.ben)? data?.ben?.numAdhInd : data?.benInputData?.numAdh}/>
                    <RowInfo label={'AMC'} value={data?.numClient}/>
                    <RowInfo label={'Dernière modification'} value={convertDate(data?.timestamp)}/>
                </div>
                <div style={{flex: 1, maxWidth: '375px'}}>
                    <RowInfo label={'FINESS juridique'} value={data?.ps?.numJur}/>
                    <RowInfo label={'Date et rang de naissance'}
                             value={(data?.ben)? dateConvertNaissance(data?.ben?.dateNai) : dateConvertNaissance(data?.benInputData?.dateNai)}
                             chip={(data?.ben)? data?.ben?.rangNai : data?.benInputData?.rangNai}
                    />
                    <RowInfo label={'Montant RC'} value={currencyFormatter.format(data?.totalRc)}/>
                </div>
            </div>

            <Tabs
                TabIndicatorProps={{sx: {top: 0, bgcolor: 'black'}}}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}
            >
                <Tab label="Informations generales"  {...a11yProps(0)}/>
                <Tab label={<div>Actes&nbsp;{(data?.factLines && data?.factLines.length) && <Chip label={data?.factLines.length} sx={{color: 'black'}}/>} </div>}  {...a11yProps(1)} />
                <Tab label="Sel associes"  {...a11yProps(2)}/>
                <Tab label="Paiements" {...a11yProps(3)} />
                <Tab label="Flux" {...a11yProps(4)} style={{alignSelf: 'end', marginLeft: 'auto'}}/>
            </Tabs>

            <TabPanel value={value} index={0} data={data}>
                {data && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>
                    <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                        <b>Informations demande</b>
                    </Typography>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '5%'}}>
                            <RowInfo label={'Nº d\'engagement'} value={data?.factData.numEng} border={true} justify={true}/>
                            <RowInfo label={'Date de réception'} value={convertDate(data?.factTransData?.receivedDate)} border={true} justify={true}/>
                            <RowInfo label={'Domaine'} value={data?.factData?.domaine} border={true} justify={true}/>
                            <RowInfo label={'Motif de rejet'} value={data?.errorLabel || data?.errorCode} border={true} justify={true}/>
                        </div>
                        <div style={{flex: 1    }}>
                            <RowInfo label={'Date facture'} value={convertDate(data?.factData.dateFact)} border={true} justify={true}/>
                            <RowInfo label={'ID période de facturation / Nº d\'occurrence'} value={`${data?.factData.idPeriodeFact} - ${data?.factData.occId}`} border={true} justify={true}/>
                            <RowInfo label={'Date accident de travail'} value={data?.factData?.numDateAccident} border={true} justify={true}/>
                            <RowInfo label={'Commentaire'} value={data?.comment} border={true} justify={true}/>
                        </div>
                    </div>

                </Box>}
            </TabPanel>
            <TabPanel value={value} index={1} data={data}>

                {(data?.factLines && factLines.length > 0 && nomRefs) && <ActesGrid data={factLines} nomRefs={nomRefs}/>}

            </TabPanel>

            <TabPanel value={value} index={2} data={data}>
                {data?.factData?.numEng && <SelAssociesGrid numEng={data?.factData.numEng}/>}
            </TabPanel>
            <TabPanel value={value} index={3} data={data}>
                {match?.params?.id && nomRefs && <PaimentsGrid factId={match?.params?.id} nomRefs={nomRefs}/>}
            </TabPanel>

            <TabPanel value={value} index={4} data={data}>

                { data?.factTransData?.factId && <FluxInfo factId={data?.factTransData?.factId}/> }
            </TabPanel>

        </Box>
    );
}
