import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetBenefByIdQuery} from "./services/beneficiaireApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {DoritInfoBox} from "./DroitInfoBox";
import {GarantiesGrid} from "./grids/GarantiesGrid";





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

    let adress, dateFin, telephone, email, garanties;

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

        if (data?.garanties) {
            garanties = [];
            data?.garanties.forEach((object, id) =>  garanties.push({ id, ...object}));
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
                {data?.numeroAdherentIndividuel && <span style={{margin: '5px 25px 5px 0'}}>{`N Adherent individuel : ${data?.numeroAdherentIndividuel}`}</span>}
                {data?.numeroAdherentFamilial && <span style={{margin: '5px 25px 5px 0'}}>{`N Adherent Familial : ${data?.numeroAdherentFamilial}`}</span>}
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
                // aria-label="scrollable auto tabs example"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}
            >
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
                        {data?.prenom && data?.nom && <div>{`Nome et prenom : ${data.prenom} ${data.nom}`}</div>}
                        {data?.rangNaissance && <div>Rang et date de naissance : <b>{data.dateNaissance}</b><Chip label={data.rangNaissance} sx={{margin: '5px'}}/></div>}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Coordinees</b></h3>
                    {data && <div>
                        {data?.adresse && <div><div>{`Adresse: ${adress}`}</div>
                            <div>telephone: <b>{telephone}</b></div>
                            <div>E-mail: <b>{email}</b></div></div>}
                    </div>}
                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3><b>Regime</b></h3>
                    <div>Grand Regime: <b>{data?.grandRegime}</b></div>
                    <div>Caisse: <b>{data?.caisseAffiliation}</b></div>

                </Box>
            </TabPanel>

            <TabPanel value={value} index={1} data={data}>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3>Inormation</h3>
                    OMC (environmentCode)
                    <b>{data?.environmentCode}</b>
                    N Client Viamedis (environmentCode)
                    {/*http://10.241.25.10:8004/api/v1/environments*/}


                    {/*това е сервиза за енвайронмънтите*/}
                    <h4>N CLIENT VIAMEDIS</h4>
                     >>>> "numero": 990159,

                    <h5>TYPE DE CONTRACT</h5>
                     {data?.contratIndividuelCollectifLabel}

                    <h5>N DE CONTRAT</h5>
                    {data?.numeroContratClient}

                    <h5>CONTRAR RESPONSABLE</h5>
                    {(data?.contratResponsable)? 'OUI' : 'NON'}

                    <h5>PARTENAIRE</h5>
                    {data?.nomPartenaire}

                    <h5>CENTRE DE GESTION</h5>
                     {data?.nomCentre}

                </Box>
                <Box style={{backgroundColor: '#f3f3f3', flex: 1, margin: '5px', padding: '0 25px'}}>
                    <h3>Appartenance reseau du beneficiare</h3>
                    по тоз код в референшъла от сервиза
                    {/*/api/v1/reseaux*/}
                    {/*{data?.reseauSoins}*/}
                </Box>
            </TabPanel>

            <TabPanel value={value} index={2} data={data} >
                <div style={{display:'flex', flexDirection: 'column', width: '100%'}}>
                    <div style={{backgroundColor: '#f3f3f3', margin: '5px', padding: '0 25px', width: '600px', display: 'block'}}>
                        <h3>Information Carte</h3>
                        numeroCarteClient : {data?.numeroCarteClient}<br/>
                        dateDesactivationDroits : {data?.dateDesactivationDroits}<br/>
                        dateFermetureDroits : {data?.dateFermetureDroits}<br/>
                        dateOuvertureDroits : {data?.dateOuvertureDroits}<br/>
                    </div>
                    {garanties && <div style={{display: 'flex', width: '100%'}}>
                        <div style={{flex: 1, margin: '15px'}}>
                            <h3>Garanties Tiers Payant simple</h3>
                            <GarantiesGrid garanties={garanties}/>
                        </div>
                        <div style={{flex: 1, margin: '15px'}}>
                            <h3>Garanties Tiers Payant complexes</h3>
                            <GarantiesGrid garanties={garanties} simple={false}/>
                        </div>
                    </div>}
                </div>
            </TabPanel>

            <TabPanel value={value} index={3} data={data} sx={{display: 'flex'}}>
                {(data?.ouvrantDroit)?
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <DoritInfoBox droit={data} />
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
