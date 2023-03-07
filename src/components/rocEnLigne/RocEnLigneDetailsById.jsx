import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetRocEnLigneByIdQuery} from "./services/rocEnLigneApi";
import {matchPath, Link} from "react-router-dom";
import {Button, CircularProgress, Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {ActesGrid} from "../shared/grids";
import {SelAssociesGrid} from "./grids/SelAssociesGrid";
import {FacturesAssociessGrid} from "./grids/FacturesAssociessGrid";
import {FluxInfo} from "./components/FluxInfo";

import {rocStatus} from "../../utils/status-utils";
import {dateConvertNaissanceRAW, convertDate, currencyFormatter} from "../../utils/convertor-utils";
import {useGetRefsQuery} from "../../services/refsApi";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
                padding: 0
            }}>
                {value === index && children}
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
export default function RocEnLigneDetailsById({location, modalId = null}) {

    const match = matchPath(location?.pathname, {
        path: "/serviceEnLigne/:id",
        exact: true,
        strict: false
    });

    const rocID = (modalId)? modalId: match?.params?.id;

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    const {data = null, isFetching, isSuccess} = useGetRocEnLigneByIdQuery(rocID);

    let acteList = []
    if (data?.acteList) data?.acteList.forEach((e, id)=>acteList.push({id, ...e}))

    let engagements = []
    if (data?.common?.numeroEngagement) engagements.push(data?.common?.numeroEngagement)
    if (data?.assosieteList) {
        data?.assosieteList.forEach(e => e?.numeroEngagement && engagements.push(e.numeroEngagement))
    }

    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                    <b>Détail de la demande {data?.common && data?.common?.typeDemande}</b>
                </Typography>
                {!!!modalId && <Link to={`/serviceEnLigne`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" size="medium" className="RoundedEmptyButt" style={{marginRight: '10px'}}>
                        Revenir
                    </Button>
                </Link>}
            </div>
            {isFetching && <CircularProgress style={{margin: '100px auto'}}/>}
            {isSuccess && <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {data?.common?.numeroEngagement}
            </Typography>}

            {isSuccess && <Chip label={`${rocStatus[data?.common?.statut]?.label || data?.common?.statut}`}
                   sx={{color: 'black', bgcolor: rocStatus[data?.common?.statut]?.color, margin: '15px 0 0 0'}}/>}

            {isSuccess &&<div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '455px'}}>
                    <RowInfo label={'Date d\'admission'} value={convertDate(data?.common?.dateAdmission)} id={rocID} field="dateAdmission" />
                    <RowInfo label={'Bénéficiaire'} value={
                        <span>{data?.common?.beneficiaireNom}&nbsp;{data?.common?.beneficiairePrenom} </span>} id={rocID} field="beneficiaireNom_beneficiairePrenom" />
                    <RowInfo label={'Environnement'} value={data?.common?.numeroEnvironnement} id={rocID} field="numeroEnvironnement" />
                    <RowInfo label={'N° facturation'} value={data?.common?.numeroFacturation} id={rocID} field="numeroFacturation" />
                </div>
                <div style={{flex: 1, marginRight: '25px', maxWidth: '425px'}}>
                    <RowInfo label={'FINESS géographique'} value={data?.common?.finessGeographique} id={rocID} field="finessGeographique" />
                    <RowInfo label={'Nº adhérent'} value={data?.common?.numeroAdherent} id={rocID} field="numeroAdherent" />
                    <RowInfo label={'AMC'} value={data?.common?.numeroAmc} id={rocID} field="numeroAmc" />
                </div>
                <div style={{flex: 1, maxWidth: '375px'}}>
                    <RowInfo label={'FINESS juridique'} value={data?.common?.finessJuridique} id={rocID} field="finessJuridique" />
                    <RowInfo label={'Date et rang de naissance'}
                             value={data?.common?.dateNaissance && dateConvertNaissanceRAW(data?.common?.dateNaissance)}
                             chip={data?.common?.rangNaissance && data?.common?.rangNaissance || null}
                             id={rocID}
                             field="dateNaissance"
                    />
                    <RowInfo label={'Montant RC'}
                             value={data?.common?.montantRc && currencyFormatter.format(data?.common?.montantRc)}
                             id={rocID}
                             field="montantRc"
                    />
                </div>
            </div>}

            <Tabs
                TabIndicatorProps={{sx: {top: 0, bgcolor: 'black'}}}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}
            >
                <Tab label="INFORMATIONS GENERALES"  {...a11yProps(0)}/>
                <Tab label={<div>Actes&nbsp;{(data?.common?.typeDemande !== 'IDB' && data?.acteList && data?.acteList.length) &&
                <Chip label={data?.acteList.length} sx={{color: 'black'}}/>} </div>}  {...a11yProps(1)}
                      disabled={!(data?.common?.typeDemande && data?.common?.typeDemande !== 'IDB')}/>
                <Tab label="SEL ASSOCIES"  {...a11yProps(2)}/>
                <Tab label="FACTURES ASSOCIEES" {...a11yProps(3)} />
                <Tab label="FLUX" {...a11yProps(4)} style={{alignSelf: 'end', marginLeft: 'auto'}}/>
            </Tabs>

            <TabPanel value={value} index={0} data={data}>
                {data && <Box style={{
                    backgroundColor: '#F6F8FC',
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>

                    {(isFetching || nomRefsIsFetching) && <CircularProgress style={{margin: '100px auto'}}/>}
                    <div style={{display: 'flex', flexDirection: 'column', flex: 2}}>

                        {(isSuccess && nomRefsIsSuccess) &&

                            <div style={{flex: 2, marginRight: '5%'}}>
                                <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                                    <b>Informations demande</b>
                                </Typography>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div style={{flex: 1, marginRight: '5%'}}>
                                        <RowInfo label={'Date de réception'}
                                                 value={data?.info?.demande?.dateReception && convertDate(data?.info?.demande?.dateReception)}
                                                 border={true} justify={true}
                                                 id={rocID} field="dateReception" />
                                        <RowInfo label={'ID période de facturation / Nº d\'occurrence'}
                                                 value={data?.info?.demande?.idPeriodeFacturationNumOccurence} border={true}
                                                 justify={true} id={rocID} field="idPeriodeFacturationNumOccurence" />
                                        <RowInfo label={'Nature d\'assurance'} value={data?.info?.demande?.natureAssurance}
                                                 border={true} justify={true} id={rocID} field="natureAssurance" />
                                        <RowInfo label={'Nature interruption séjour'}
                                                 value={data?.info?.demande?.natureInterruptionSejour} border={true}
                                                 justify={true} id={rocID} field="natureInterruptionSejour" />
                                        <RowInfo label={'Indicateur parcours de soins'}
                                                 value={data?.info?.demande?.indicateurParcours} border={true} justify={true}
                                                 id={rocID} field="indicateurParcours" />
                                        <RowInfo label={'Motif de rejet'}
                                                 value={data?.info?.demande?.motifRejets} border={true}
                                                 justify={true} id={rocID} field="motifRejets" />
                                    </div>

                                    <div style={{flex: 1}}>
                                        <RowInfo label={'Domaine'}
                                                 value={nomRefs && nomRefs?.ROC_DOMAINS[data?.info?.demande?.domaine] || data?.info?.demande?.domaine}
                                                 border={true} justify={true} id={rocID} field="domaine" />
                                        <RowInfo label={'Période des prestations'}
                                                 value={`${convertDate(data?.info?.demande?.periodePrestationDebut)} - ${convertDate(data?.info?.demande?.periodePrestationFin)}`}
                                                 border={true} justify={true} id={rocID} field="periodePrestationDebut_periodePrestationFin" />
                                        <RowInfo label={'Contexte d\'échange'} value={data?.info?.demande?.contexteEchange}
                                                 border={true} justify={true} id={rocID} field="contexteEchange" />
                                        <RowInfo label={'N° dossier hospitalisation'} value={data?.info?.demande?.numeroDossier}
                                                 border={true} justify={true} id={rocID} field="numeroDossier" />
                                        <RowInfo label={'Date accident de travail'}
                                                 value={data?.info?.demande?.dateAccidentTravail && convertDate(data?.info?.demande?.dateAccidentTravail)}
                                                 border={true} justify={true} id={rocID} field="dateAccidentTravail" />
                                        <RowInfo label={'Sous-motif de rejet'} value={data?.info?.demande?.messageRejets}
                                                 border={true} justify={true} id={rocID} field="messageRejets" />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    {isSuccess && <div style={{flex: 1}}>
                        <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                            <b>Informations établissement</b>
                        </Typography>
                        <div style={{margin: 0}}>
                            <RowInfo label={'Raison sociale'} value={data?.info?.ets?.raisonSociale} border={true}
                                     justify={true} id={rocID} field="raisonSociale" />
                            <RowInfo label={'Nom contact ETS '} value={data?.info?.ets?.nomContact} border={true}
                                     justify={true} id={rocID} field="nomContact" />
                            <RowInfo label={'Nº téléphone contact ETS'} value={data?.info?.ets?.telephone} border={true}
                                     justify={true} id={rocID} field="telephone" />
                            <RowInfo label={'Mail contact ETS'} value={data?.info?.ets?.email} border={true}
                                     justify={true} id={rocID} field="email" />
                        </div>
                    </div>}

                </Box>}
            </TabPanel>

            {data?.common?.typeDemande !== 'IDB' && <TabPanel value={value} index={1} data={data}>
                {(acteList?.length > 0 && nomRefs) && <ActesGrid data={acteList} nomRefs={nomRefs}/>}
                {(isFetching || nomRefsIsFetching) && <CircularProgress style={{margin: '100px auto'}}/>}
            </TabPanel>}

            <TabPanel value={value} index={2} data={data}>
                {(isFetching || nomRefsIsFetching) && <CircularProgress style={{margin: '100px auto'}}/>}
                {isSuccess && nomRefsIsSuccess && <SelAssociesGrid selAssosiete={data?.assosieteList} nomRefs={nomRefs} noModal={!!!modalId}/>}
            </TabPanel>

            <TabPanel value={value} index={3} data={data}>
                {(isFetching || nomRefsIsFetching) && <CircularProgress style={{margin: '100px auto'}}/>}
                {isSuccess && nomRefsIsSuccess && <FacturesAssociessGrid engagements={engagements} nomRefs={nomRefs} noModal={!!!modalId}/>}
            </TabPanel>

            <TabPanel value={value} index={4} data={data}>
                { rocID && <OpenInNewIcon sx={{color: '#99ACBB', cursor: 'pointer', float: 'right'}} onClick={()=>
                    window.open(`FluxInfo/${rocID}`, 'FluxInfo', "height=735,width=1350,toolbar=no,menubar=no,scrollbars=no,location=no,status=no")
                }/> }
                { rocID && <FluxInfo factId={rocID}/> }
            </TabPanel>

        </Box>
    );
}
