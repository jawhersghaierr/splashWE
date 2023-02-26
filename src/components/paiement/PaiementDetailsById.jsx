import React, {useState} from 'react';
import {matchPath, Link} from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {Button, CircularProgress, Typography} from "@mui/material";

import {RowInfo} from "./components/RowInfo";
import {useGetPaiementByIdQuery} from "./services/paiementsApi";
import { AssociesGrid, HistoryGrid } from "./grids";
import {paiementsStatus} from "../../utils/status-utils";
import {convertDate, currencyFormatter} from "../../utils/convertor-utils";
import {useGetRefsQuery} from "../../services/refsApi";
import { ModalInfo, VirtLink } from "../shared";
import FacturesDetailsById from "../factures/FacturesDetailsById";


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


const oneRowHeader = ({ dateCreation, dateModification, id }) => {

    return <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
        <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
            <RowInfo label={'Date de création'} value={convertDate(dateCreation)} id={id} field="dateCreation" />
        </div>
        <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
            <RowInfo label={'Dernière modification'} value={convertDate(dateModification)} id={id} field="dateModification" />
        </div>
    </div>
}

export default function PaiementDetailsById({location, modalId = null}) {

    const [openModal, setOpenModal] = useState({open: false, data: null});
    const handleModalOpen = (data = null) => {
        if (!modalId) setOpenModal({open: true, data});
    };
    const handleModalClose = () => {
        setOpenModal({open: false, data: null});
    };

    const match = matchPath(location?.pathname, {
        path: "/paiement/:id",
        exact: true,
        strict: false
    });
    const paiementID = (modalId)? modalId: match?.params?.id;

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null, isFetching, isSuccess} = useGetPaiementByIdQuery(paiementID);

    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    if (isFetching || nomRefsIsFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                    <b>Détails du paiement</b>
                </Typography>

                {!!!modalId && <Link to={`/paiement`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" size="medium" className="RoundedEmptyButt" style={{marginRight: '10px'}}>
                        Revenir
                    </Button>
                </Link>}

            </div>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {nomRefs && nomRefs.PAIEMENT_TYPE[data?.paiementType] || data?.paiementType}
            </Typography>

            <Chip label={paiementsStatus[data?.paiementStatus]?.label}  sx={{color: 'black', margin: '15px 0 0 0', bgcolor: paiementsStatus[data?.paiementStatus]?.color }}/>

            <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '375px'}}>
                    <RowInfo label={'Montant RC'} value={currencyFormatter.format(data?.rc)} id={paiementID} field="rc" />
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '405px'}}>
                    <RowInfo label={'Facture'} value={ <VirtLink label={data?.numFacture || ' '} onclick={() => handleModalOpen({id: data?.numFacture})}
                    id={paiementID} field="dateModification" /> }/>
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
                <Tab label="ELEMENTS ASSOCIES"  {...a11yProps(0)}/>
                <Tab label="HISTORIQUE"  {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0} data={data}>
                {data && oneRowHeader(data)}
                <AssociesGrid data={data?.associatedElements} noModal={!!!modalId}/>
            </TabPanel>

            <TabPanel value={value} index={1} data={data}>
                {data && oneRowHeader(data)}
                {(data?.historyElements && data?.historyElements.length > 0 && nomRefs) && <HistoryGrid data={data?.historyElements} nomRefs={nomRefs}/>}
            </TabPanel>

            <ModalInfo openModal={openModal} handleModalClose={handleModalClose} modalTitle={`modal-Payement-${openModal?.data?.id}`}>
                {data && openModal?.data?.id  && <FacturesDetailsById modalId={openModal?.data?.id} />}
            </ModalInfo>

        </Box>
    );
}
