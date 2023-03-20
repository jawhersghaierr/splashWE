import React, {useEffect, useState} from 'react';
import {Link, matchPath} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetBenefByIdQuery} from "./services/beneficiaireApi";
import {Button, CircularProgress, Typography} from "@mui/material";
import {DroitInfoBox} from "./components/DroitInfoBox";
import {GarantiesGrid} from "./grids/GarantiesGrid";
import {useGetDcsQuery, useGetGarantiesQuery, useGetReseauxQuery, useGetEnvironmentsQuery, useGetSousGarantiesQuery} from "../../services/referentielApi";
import {useGetRefsQuery} from "../../services/refsApi";
import {RowInfo} from "./components/RowInfo";
import {usePrevious, benefStatuses} from "../../utils/status-utils";
import {dateConvertNaissanceRAW, convertDate} from "../../utils/convertor-utils";
import {NoGridResultsAlert} from "../shared";


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




export default function BeneficiaireDetailsById({location, modalId = null}) {

    const match = matchPath(location?.pathname, {
        path: "/beneficiaire/:id",
        exact: true,
        strict: false
    });
    const benefId = (modalId)? modalId: match?.params?.id;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => { setValue(newValue) };

    const prevId = usePrevious(benefId)
    useEffect(() => {

        if (prevId !== benefId ) {
            setValue(0)
        }

    }, [prevId, benefId]);
    const {data = null, isFetching, isSuccess} = useGetBenefByIdQuery(benefId);
    const {data: nomEnviroments} = useGetEnvironmentsQuery();
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();
    const {data: nomGaranties, isFetching: nomGarantiesIsFetching, isSuccess: nomGarantiesIsSuccess} = useGetGarantiesQuery();
    const {data: nomSousGaranties, isFetching: nomSousGarantiesIsFetching, isSuccess: nomSousGarantiesIsSuccess} = useGetSousGarantiesQuery();
    const {data: nomReseaux, isFetching: nomReseauxIsFetching, isSuccess: nomReseauxIsSuccess} = useGetReseauxQuery();
    const {data: nomDCS, isFetching: nomDCSIsFetching, isSuccess: nomDCSIsSuccess} = useGetDcsQuery();

    let adress, dateFin, telephone, email, garanties, garantiesComplex;

    if (data) {

        let {adresse, dateFermetureDroits, dateDesactivationDroits } = data;
        dateFermetureDroits = dateFermetureDroits && new Date(dateFermetureDroits) || null;
        dateDesactivationDroits = dateDesactivationDroits && new Date(dateDesactivationDroits) || null;

        if (dateFermetureDroits instanceof Date && !isNaN(dateFermetureDroits)
            && dateDesactivationDroits instanceof Date && !isNaN(dateDesactivationDroits)) {
            dateFin = (dateFermetureDroits > dateDesactivationDroits)? dateDesactivationDroits : dateFermetureDroits;
        } else {
            dateFin = dateFermetureDroits;
        }

        adress = adresse ? `${adresse?.numeroVoie} ${adresse?.nomVoie} ${adresse?.batimentresidence} ${adresse?.appartementEscalierEtage} ${adresse?.complementAdresse} ${adresse?.codePostal} ${adresse?.ville} ${adresse?.pays}` : "";
        telephone = adresse?.telephone;
        email = adresse?.email;

        if (data?.garantieList && nomRefs && nomGaranties && nomSousGaranties) {
            garanties = [];
            garantiesComplex = [];
            data?.garantieList.forEach((_garan, id) => {
                let garantie = nomGaranties.filter(e=>e.code == _garan.garantie)[0];

                if (garantie?.type == 'TP simple') {
                    garanties.push({id, ..._garan})
                } else {
                    if (_garan.dcsFormulas && _garan.dcsFormulas.length > 0) {
                        _garan.dcsFormulas.forEach((e, i)=>garantiesComplex.push({..._garan, id:`${id}_${i}`, dcs:nomRefs.DCS[e?.codeDcs], formula: e?.formula}))
                    } else garantiesComplex.push({id, ..._garan});
                }
            });
        }

    }


    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                    <b>{data?.nom}&nbsp;{data?.prenom}</b>
                </Typography>

                {!!!modalId && <Link to={`/beneficiaire`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" size="medium" className="RoundedEmptyButt" style={{marginRight: '10px'}}>
                        Revenir
                    </Button>
                </Link>}

            </div>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                {data?.lienFamillialLabel}
            </Typography>

            {isSuccess && <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                <Chip label={benefStatuses[data?.status]?.label}
                      sx={{bgcolor: benefStatuses[data?.status]?.color, margin: '5px'}}/>
            </Typography>}

            {isFetching && <CircularProgress/>}
            {!isFetching && isSuccess && <div style={{
                margin: '25px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                maxWidth: '870px'
            }}>
                <span style={{margin: '5px'}}>Nº Adhérent individuel : <b id={"numeroAdherentIndividuel_" + benefId}>{data?.numeroAdherentIndividuel}</b></span>
                <span style={{margin: '5px'}}>Nº Adhérent familial : <b id={"numeroAdherentFamilial_" + benefId}>{data?.numeroAdherentFamilial}</b></span>
                <span style={{margin: '5px'}}>
                    Droits ouverts : <b id={"dateOuvertureDroits_" + benefId}>{convertDate(data?.dateOuvertureDroits)} - {dateFin?.toLocaleDateString('en-GB')}</b>
                </span>
            </div>}

            <Tabs
                TabIndicatorProps={{sx: {top: 0, bgcolor: 'black'}}}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}>

                <Tab label="Informations generales"  {...a11yProps(0)}/>
                <Tab label={"Contrat"}  {...a11yProps(1)} />
                <Tab label="Carte et couvertures"  {...a11yProps(2)}/>
                <Tab label="AUTRES BENEFICIAIRES"  {...a11yProps(3)}/>
                <Tab label="Historique" {...a11yProps(4)} disabled/>
            </Tabs>

            <TabPanel value={value} index={0} data={data} sx={{display: 'flex', flexDirection: 'row'}}>
                <Box style={{backgroundColor: '#F6F8FC', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Identité</b></h3>
                    {isFetching && <CircularProgress/>}
                    {data && <div>
                        {(data?.prenom && data?.nom) && <RowInfo label={'Nom et prénom'} value={`${data.nom} ${data.prenom}`} id={benefId} field="nom_prenom" />}
                        {(data?.rangNaissance && data?.dateNaissance) &&
                        <RowInfo label={'Date et rang de naissance'} value={dateConvertNaissanceRAW(data?.dateNaissance)} chip={data.rangNaissance} id={benefId} field="dateNaissance" />}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#F6F8FC', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Coordonnées</b></h3>
                    {isFetching && <CircularProgress/>}
                    {data && <div>
                            <RowInfo label={'Adresse'} value={adress} id={benefId} field="adress" />
                            <RowInfo label={'Téléphone'} value={telephone} id={benefId} field="telephone" />
                            <RowInfo label={'E-mail'} value={<Link to={''} onClick={() => window.location =`mailTo:${email}`}>{email}</Link>} id={benefId} field="email" />
                        </div>}
                </Box>
                <Box style={{backgroundColor: '#F6F8FC', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Régime</b></h3>
                    {isFetching && <CircularProgress/>}
                    {data && <div>
                        <RowInfo label={'Grand Régime'} value={data?.codeGrandRegime} id={benefId} field="codeGrandRegime" />
                        <RowInfo label={'Caisse'} value={data?.caisseAffiliation} id={benefId} field="caisseAffiliation" />
                        <RowInfo label={'Centre gestion AMO'} value={data?.centreGestionAmo} id={benefId} field="centreGestionAmo" />
                    </div>}
                </Box>
            </TabPanel>

            <TabPanel value={value} index={1} data={data}>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <Box style={{backgroundColor: '#F6F8FC', margin: '5px', padding: '0 25px', flex: 1}}>
                        <h2>Information</h2>
                        {isFetching && <CircularProgress/>}
                        {nomEnviroments && <RowInfo label={'Environnement'}
                                  value={nomEnviroments.find(e => e.code == data?.codeEnvironnement)?.libelle} id={benefId} field="libelle" />}

                        {nomEnviroments && <RowInfo label={'N° Client Viamedis'}
                                  value={nomEnviroments.find(e => e.code == data?.codeEnvironnement)?.numero} id={benefId} field="numero" />}

                        <RowInfo label={'Type de contrat'} value={data?.contratIndividuelCollectifLabel} id={benefId} field="contratIndividuelCollectifLabel" />
                        <RowInfo label={'N° de contrat'} value={data?.numeroContratClient} id={benefId} field="numeroContratClient" />
                        <RowInfo label={'Contrat responsable'} value={(data?.contratResponsable)? 'OUI' : 'NON'} id={benefId} field="contratResponsable" />
                        <RowInfo label={'Partenaire'} value={data?.nomPartenaire} id={benefId} field="nomPartenaire" />
                        <RowInfo label={'Centre de gestion'} value={data?.nomCentre} id={benefId} field="nomCentre" />
                    </Box>

                    <Box style={{backgroundColor: '#F6F8FC', margin: '5px', padding: '0 25px', flex: 1}}>
                        <h2>Appartenance réseau du bénéficiaire</h2>
                        {isFetching && <CircularProgress/>}
                        {(data?.reseauSoinsList && nomReseaux) && data?.reseauSoinsList.map( (reseau, i) => {
                            let objReseau = nomReseaux.find(e=>e.code === reseau.reseauSoins)
                            return <div key={`reseau_${i}`} style={{margin: '25px 0 '}}>
                                <b>{objReseau?.libelle}</b>
                                {(nomGaranties && objReseau?.codesGarantie) &&
                                    reseau.garantieList.map((resoGarant, i) =>
                                        <div key={`garant_${i}`} style={{margin: '15px'}}>
                                            {nomGaranties.find(e => e.code === resoGarant)?.libelle}
                                        </div>)}
                                {/*{(nomGaranties && objReseau?.codesGarantie) && objReseau.codesGarantie.map((garant, i) =>*/}
                                {/*    <div key={`garant_${i}`} style={{margin: '15px'}}>*/}
                                {/*        {nomGaranties.find(e => e.code === garant)?.libelle}*/}
                                {/*    </div>)}*/}

                            </div>
                        })}
                    </Box>
                </div>
            </TabPanel>

            <TabPanel value={value} index={2} data={data} >
                <div style={{display:'flex', flexDirection: 'column', width: '100%'}}>
                    <div style={{backgroundColor: '#F6F8FC', margin: '5px', padding: '0 25px', width: '600px', display: 'block'}}>
                        <h3 style={{marginBottom: '10px'}}>Information Carte</h3>
                        {isFetching && <CircularProgress/>}
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                                <RowInfo label={'N° carte'} value={data?.numeroCarteClient} id={benefId} field="numeroCarteClient" />
                                <RowInfo label={'Date début droits'} value={convertDate(data?.dateOuvertureDroits)} id={benefId} field="dateOuvertureDroits" />
                            </div>
                            <div>
                                <RowInfo label={'Date désactivation droit'} value={(data?.dateDesactivationDroits)? convertDate(data?.dateDesactivationDroits): ''}
                                    id={benefId} field="dateDesactivationDroits" />
                                <RowInfo label={'Date fin droits'} value={convertDate(data?.dateFermetureDroits)} id={benefId} field="dateFermetureDroits" />
                            </div>
                        </div>
                    </div>
                    {(garanties && nomRefs) &&<div style={{display: 'flex', width: '100%'}}>
                        <div style={{flex: 1, margin: '15px 15px 15px 0'}}>
                            <h3>Garanties Tiers Payant simple</h3>
                            {isFetching && <CircularProgress/>}
                            <GarantiesGrid garanties={garanties} nom={nomRefs}/>
                        </div>
                        <div style={{flex: 1, margin: '15px 0 15px 0'}}>
                            <h3>Garanties Tiers Payant complexes</h3>
                            <GarantiesGrid garanties={garantiesComplex} nom={nomRefs} simple={false}/>
                        </div>
                    </div>}
                </div>
            </TabPanel>

            <TabPanel value={value} index={3} data={data} sx={{display: 'flex'}}>
                {data?.ouvrantDroit && <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <DroitInfoBox droit={data?.ouvrantDroit} />
                        {data?.ouvrantDroit?.ayantDroitList.map(ouvrantDroit => {
                            if (ouvrantDroit.id !== data.id) {
                                return <DroitInfoBox droit={ouvrantDroit} key={ouvrantDroit.id} />
                            } else return ''
                        })}
                    </div>}
                {(data?.ayantDroitList && data?.ayantDroit?.ayantDroitList > 0) && <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {data?.ayantDroit.map(ayantDroit => <DroitInfoBox droit={ayantDroit} key={ayantDroit.id}/>)}
                </div>}

                {(!data?.ouvrantDroit?.ayantDroitList || data?.ouvrantDroit?.ayantDroitList?.length == 0)
                && (!data?.ayantDroit || data?.ayantDroit?.length == 0) && <NoGridResultsAlert/>}

            </TabPanel>

            <TabPanel value={value} index={4} data={data}>
                <div>History Tab</div>
            </TabPanel>
        </Box>
    );
}
