import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetBenefByIdQuery} from "./services/beneficiaireApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {DoritInfoBox} from "./components/DroitInfoBox";
import {GarantiesGrid} from "./grids/GarantiesGrid";
import {useGetDcsQuery, useGetGarantiesQuery, useGetReseauxQuery, useGetEnvironmentsQuery, useGetSousGarantiesQuery} from "../../services/referentielApi";
import {useGetRefsQuery} from "../../services/refsApi";
import {RowInfo} from "./components/RowInfo";





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
    const {data: nomEnviroments} = useGetEnvironmentsQuery();
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();
    const {data: nomGaranties, isFetching: nomGarantiesIsFetching, isSuccess: nomGarantiesIsSuccess} = useGetGarantiesQuery();
    const {data: nomSousGaranties, isFetching: nomSousGarantiesIsFetching, isSuccess: nomSousGarantiesIsSuccess} = useGetSousGarantiesQuery();
    const {data: nomReseaux, isFetching: nomReseauxIsFetching, isSuccess: nomReseauxIsSuccess} = useGetReseauxQuery();
    const {data: nomDCS, isFetching: nomDCSIsFetching, isSuccess: nomDCSIsSuccess} = useGetDcsQuery();

    let adress, dateFin, telephone, email, garanties, garantiesComplex;

    if (data) {

        // birdDate instanceof Date && !isNaN(birdDate)
        // data?.dateOuvertureDroits} > ${data?.dateDesactivationDroits

        let {adresse, dateOuvertureDroits, dateDesactivationDroits} = data;
        dateOuvertureDroits = new Date(dateOuvertureDroits);
        dateDesactivationDroits = new Date(dateDesactivationDroits);

        if (dateOuvertureDroits instanceof Date && !isNaN(dateOuvertureDroits)
            && dateDesactivationDroits instanceof Date && !isNaN(dateDesactivationDroits)) {
            dateFin = (dateOuvertureDroits > dateDesactivationDroits)? dateDesactivationDroits : dateOuvertureDroits;
        }

        adress = `${adresse.numeroVoie} ${adresse.nomVoie} ${adresse.batimentresidence} ${adresse.appartementEscalierEtage} ${adresse.complementAdresse} ${adresse?.codePostal} ${adresse?.ville} ${adresse.pays} `
        telephone = adresse?.telephone
        email = adresse?.email

        if (data?.garanties && nomDCS && nomGaranties && nomSousGaranties) {
            garanties = [];
            garantiesComplex = [];
            data?.garanties.forEach((_garan, id) => {
                let garantie = nomGaranties.filter(e=>e.code == _garan.garantie)

                console.log('garantie > ', garantie)
                console.log('_garan.garantie > ', _garan.garantie)
// debugger
                if (garantie?.type == 'TP simple') {
                    garanties.push({id, ..._garan})
                } else {
                    garantiesComplex.push({id, ..._garan})
                }
            });
        }

    }


    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <h3><b>{data?.nom}&nbsp;{data?.prenom}</b></h3>
                {data?.lienFamillialLabel}
            </Typography>

            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                <Chip label={data?.status} sx={{color: 'black', margin: '5px'}}/>
            </Typography>

            <div style={{margin: '25px 0'}}>
                {data?.numeroAdherentIndividuel && <span style={{margin: '5px 25px 5px 0'}}>{`Nº Adherent individuel : ${data?.numeroAdherentIndividuel}`}</span>}
                {data?.numeroAdherentFamilial && <span style={{margin: '5px 25px 5px 0'}}>{`Nº Adherent Familial : ${data?.numeroAdherentFamilial}`}</span>}
                {data?.numeroAdherentIndividuel && <span style={{margin: '5px 15px 5px 0'}}>
                    Droits ouverts : <b>{`${data?.dateOuvertureDroits}  ${dateFin.toLocaleDateString('en-GB')}`}</b>
                </span>}
            </div>

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
                <Tab label="Autres beneficiares"  {...a11yProps(3)}/>
                <Tab label="Historique" {...a11yProps(4)} />
            </Tabs>

            <TabPanel value={value} index={0} data={data} sx={{display: 'flex', flexDirection: 'row'}}>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Identite</b></h3>
                    {data && <div>
                        {data?.prenom && data?.nom && <RowInfo label={'Nome et prenom'} value={`${data.prenom} ${data.nom}`}/>}
                        {data?.rangNaissance && <RowInfo label={'Rang et date de naissance'} value={data.dateNaissance} chip={data.rangNaissance}/>}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Coordinees</b></h3>
                        {data && <div>
                            <RowInfo label={'Adresse'} value={adress}/>
                            <RowInfo label={'telephone'} value={telephone}/>
                            <RowInfo label={'E-mail'} value={email}/>
                        </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Regime</b></h3>
                    {data && <div>
                        <RowInfo label={'Grand Regime'} value={data?.grandRegime}/>
                        <RowInfo label={'Caisse'} value={data?.caisseAffiliation}/>
                    </div>}
                </Box>
            </TabPanel>

            <TabPanel value={value} index={1} data={data}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Box style={{backgroundColor: '#f3f3f3', margin: '5px', padding: '0 25px', flex: 1}}>
                        <h2>Information</h2>
                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            Environment <br/>
                            {nomEnviroments && <b>{nomEnviroments.find(e=>e.code == data?.environmentCode)?.libelle}</b>}
                        </Typography>

                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            Nº CLIENT VIAMEDIS <br/>
                            {nomEnviroments && <b>{nomEnviroments.find(e=>e.code == data?.environmentCode)?.numero}</b>}
                        </Typography>

                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            TYPE DE CONTRACT<br/>
                            <b>{data?.contratIndividuelCollectifLabel}</b>
                        </Typography>

                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            Nº DE CONTRAT<br/>
                            <b>{data?.numeroContratClient}</b>
                        </Typography>

                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            CONTRAT RESPONSABLE<br/>
                            <b>{(data?.contratResponsable)? 'OUI' : 'NON'}</b>
                        </Typography>

                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            PARTENAIRE<br/>
                            <b>{data?.nomPartenaire}</b>
                        </Typography>

                        <Typography variant="subtitle1" noWrap component="div" sx={{color: '#003154', marginBottom: '25px'}}>
                            CENTRE DE GESTION<br/>
                            <b>{data?.nomCentre}</b>
                        </Typography>
                    </Box>

                    <Box style={{backgroundColor: '#f3f3f3', margin: '5px', padding: '0 25px', flex: 1}}>
                        <h2>Appartenance reseau du beneficiare</h2>

                        {(data?.reseauSoins && nomReseaux) && data?.reseauSoins.map( (reseau, i) => {
                            let objReseau = nomReseaux.find(e=>e.code === reseau.reseauSoins)
                            return <div key={`reseau_${i}`} style={{margin: '25px 0 '}}>
                                <b>{objReseau.libelle}</b>
                                {(nomGaranties && objReseau?.codesGarantie) && objReseau.codesGarantie.map((garant, i) => <div key={`garant_${i}`} style={{margin: '15px'}}>
                                    {nomGaranties.find(e => e.code === garant).libelle}
                                </div>)}

                            </div>
                        })}
                    </Box>
                </div>
            </TabPanel>

            <TabPanel value={value} index={2} data={data} >
                <div style={{display:'flex', flexDirection: 'column', width: '100%'}}>
                    <div style={{backgroundColor: '#f3f3f3', margin: '5px', padding: '0 25px', width: '600px', display: 'block'}}>
                        <h3 style={{marginBottom: '10px'}}>Information Carte</h3>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                                <RowInfo label={'numeroCarteClient'} value={data?.numeroCarteClient}/>
                                <RowInfo label={'date Desactivation Droits'} value={data?.dateDesactivationDroits}/>
                            </div>
                            <div>
                                <RowInfo label={'date Fermeture Droits'} value={data?.dateFermetureDroits}/>
                                <RowInfo label={'date Ouverture Droits'} value={data?.dateOuvertureDroits}/>
                            </div>
                        </div>
                    </div>
                    {(garanties && nomRefs) &&<div style={{display: 'flex', width: '100%'}}>
                        <div style={{flex: 1, margin: '15px'}}>
                            <h3>Garanties Tiers Payant simple</h3>
                            <GarantiesGrid garanties={garanties} nom={nomRefs}/>
                        </div>
                        <div style={{flex: 1, margin: '15px'}}>
                            <h3>Garanties Tiers Payant complexes</h3>
                            <GarantiesGrid garanties={garantiesComplex} nom={nomRefs} simple={false}/>
                        </div>
                    </div>}
                </div>
            </TabPanel>

            <TabPanel value={value} index={3} data={data} sx={{display: 'flex'}}>
                {(data?.ouvrantDroit)?
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <DoritInfoBox droit={data?.ouvrantDroit} />
                        {data?.ouvrantDroit?.ayantDroit.map(ouvrantDroit => <DoritInfoBox droit={ouvrantDroit}  key={ouvrantDroit.id}/>)}
                    </div> :
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <DoritInfoBox droit={data} simple={false}/>
                        {data?.ayantDroit.map(ayantDroit => <DoritInfoBox droit={ayantDroit}  key={ayantDroit.id}/>)}
                    </div>
                }
            </TabPanel>

            <TabPanel value={value} index={4} data={data}>
                <div>History Tab</div>
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
