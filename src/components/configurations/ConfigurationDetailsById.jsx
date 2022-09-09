import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useEffect, useState} from "react";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import {RowInfo} from "./components/RowInfo";
import {ConfigutationGrid} from "./grids/GridRulesOfConfig";
import {useGetRefsQuery} from "../../services/refsApi";
import {convertDate} from "../../utils/utils";


function TabPanel(props) {
    const { children, value, index, data, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{minHeight: '300px', background: 'white', padding: '15px'}}>

            {value === index && children}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default function ConfigurationDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:id",
        exact: true,
        strict: false
    });
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    useEffect(() => {
        if (match?.params?.id) {
            fetch(`http://10.241.25.10:8005/api/v1/configurations/${match.params.id}`)
            // fetch(`http://10.241.25.10:80014/api/v1/configs/${match.params.id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        if (result?.rules) result?.rules.map((e,id)=>e.id = id)
                        setData(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [])

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>Configuration&nbsp;
                    {/*{match?.params?.id}*/}
                </b>
                > {data?.label}
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                type: {nomRefs && nomRefs.FACTURE_CONFIGURATION_TYPE[data?.type] || data?.type}
            </Typography>

            <Chip label={nomRefs && nomRefs.FACTURE_CONFIGURATION_STATUS[data?.status] || data?.status} sx={{color: 'black', margin: '15px 0 0 0'}}/>

            {/*
            ******************************* MAIL ************************************
            {
                "id": "DOUBLON",
                "label": "Report for error of allready integrated file",
                "startDate": "2022-05-22",
                "subject": "Fichier doublon ${FILE_NAME} détecté",
                "body": "Le fichier ${FILE_NAME} est en doublon et a déjà été intégré le (date de la première intégration ${PREV_INTEGRATION_DATES})",
                "from": "test@viamedis.fr",
                "to": "g.markov@tinqin.com;il.ivanov@tinqin.com;m.ilova@tinqin.com",
                "status": "Active",
                "user": "N/A",
                "motif": "N/A",
                "type": "EMAIL"
            }
            ****************************** CONF ***************************************

            {
                "id": 2,
                "label": "La donnée obligatoire Numéro Finess Juridique est manquante",
                "status": "A",
                "timestamp": "2022-06-17T22:52:01",
                "user": "ADMIN",
                "type": "F",
                "rules": [
                {
                    "factureContexts": [
                        "ROC"
                    ]
                    }
                ],
                    "content": [
                    "La donnée obligatoire Numéro Finess Juridique est manquante"
                ]
            }

            */}
            <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 25px 0'}}>
                <RowInfo label={'Période de validité'} value={`${convertDate(data?.startDate)}${(data?.endDate)? '-' :''}${convertDate(data?.endDate)}`}/>
                <RowInfo label={'Motif'} value={data?.motif}/>
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
                <Tab label="Elements associes"  {...a11yProps(0)}/>
            </Tabs>

            <TabPanel value={value} index={0}>
                <Box style={{
                    backgroundColor: '#F6F8FC',
                    flex: 1,
                    minWidth: '300px',
                    margin: '5px',
                    padding: '10px 25px 25px 25px'}}>

                    <RowInfo label={'Nombre de règles'} value={data?.rules?.length}/>

                    {isLoaded && <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 1, marginRight: '5%'}}>
                            {data?.rules && <ConfigutationGrid data={data?.rules}/>}

                            {JSON.stringify(data)}
                        </div>
                    </div>}

                </Box>
            </TabPanel>

        </Box>
    );
}
