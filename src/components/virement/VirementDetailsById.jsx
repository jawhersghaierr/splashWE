import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {matchPath} from "react-router-dom";
import {CircularProgress, Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {useGetVirementsByIdQuery} from "./services/virementsApi";
import {paiementsVirementStatus} from "../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../utils/convertor-utils";
import {AssociesGrid} from "./grids/AssociesGrid";
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


const oneRowHeader = ({ creationDate, statusDate}) => {

    return <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
        <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
            <RowInfo label={'Date de création'} value={<b>{convertDate(creationDate)}</b>}/>
        </div>
        <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
            <RowInfo label={'Dernière modification'} value={<b>{convertDate(statusDate)}</b>}/>
        </div>
    </div>
}




export default function VirementDetailsById({location, modialId = null}) {

    const match = matchPath(location?.pathname, {
        path: "/virements/:id",
        exact: true,
        strict: false
    });

    const virementID = (modialId)? modialId: match?.params?.id;

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null, isFetching, isSuccess} = useGetVirementsByIdQuery(virementID);
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Détails du virement</b>
            </Typography>
            {(isFetching || nomRefsIsFetching) && <CircularProgress style={{margin: '100px 50%'}}/>}
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {data?.idFacture}
            </Typography>

            {isSuccess && nomRefs && <Chip label={nomRefs?.PAIEMENT_VIREMENT_STATUS[data?.status]}
                   sx={{color: 'black', margin: '15px 0 0 0', bgcolor: paiementsVirementStatus[data?.status]?.color || 'rgba(0, 0, 0, 0.08)'}}/>}

            {isSuccess && <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'Nº virement'} value={data?.numVirement}/>
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
                    <RowInfo label={'Nº décompte'} value={data?.numDecompte}/>
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
                    <RowInfo label={'Montant'} value={currencyFormatter.format(data?.mntVirement)}/>
                </div>
            </div>}

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
                <Tab label="Paiements associes"  {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0} data={data}>
                {data && oneRowHeader(data)}
                {data && data?.virementGeneralInfo && <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>
                    <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                        <b>Détail</b>
                    </Typography>
                    {isFetching && <CircularProgress style={{margin: '100px 50%'}}/>}
                    {isSuccess && <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '5%'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <RowInfo label={'IBAN'} value={data?.virementGeneralInfo?.iban} border={true}
                                         justify={true}/>
                                <div style={{marginLeft: '35px', maxWidth: '300px'}}>
                                    <RowInfo label={'BIC'} value={data?.virementGeneralInfo?.bic} border={true}
                                             justify={true}/>
                                </div>
                            </div>
                            <RowInfo label={'Titulaire'} value={data?.virementGeneralInfo?.titulaire} border={true}
                                     justify={true}/>
                            <RowInfo label={'Date d\'émission'}
                                     value={convertDate(data?.virementGeneralInfo?.dateTraitement) || ''} border={true}
                                     justify={true}/>
                        </div>
                        <div style={{flex: 1}}>
                            <RowInfo label={'Emetteur'} value={data?.virementGeneralInfo?.emetteur} border={true}
                                     justify={true}/>
                            <RowInfo label={'Nº PS à payer'} value={data?.virementGeneralInfo?.numPsAPayer}
                                     border={true} justify={true}/>
                            <RowInfo label={'Date de rapprochement bancaire'}
                                     value={convertDate(data?.virementGeneralInfo?.dateReconciliationBancaire)}
                                     border={true} justify={true}/>
                        </div>
                    </div>}

                </Box>}

            </TabPanel>

            <TabPanel value={value} index={1} data={data}>
                {isFetching && <CircularProgress style={{margin: '100px 50%'}}/>}
                {data && oneRowHeader(data)}
                {(data?.associatedElements && data?.associatedElements.length > 0 && nomRefs) && <AssociesGrid data={data?.associatedElements} nomRefs={nomRefs}/>}
            </TabPanel>

        </Box>
    );
}



