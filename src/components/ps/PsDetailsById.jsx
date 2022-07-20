import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useGetEtsByIdQuery} from "./services/psApi";
import {statusRow} from "./utils/utils";
import {useEffect} from "react";
import {useGetDisciplinesQuery} from "../referentiel/services/referentielApi";
import {matchPath} from "react-router-dom";
import {Typography} from "@mui/material";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';

export default function PsDetailsById(props) {

    const match = matchPath(props?.location?.pathname, {
        path: "/PS/:id",
        exact: true,
        strict: false
    });

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };

    const {data = null} = useGetEtsByIdQuery(match?.params?.id);

    const statRow = data?.statutRibs && statusRow(data?.statutRibs) || null
    const shown = data?.statutRibs && Object.keys(statRow).find(key => statRow[key].shown) || null;

    const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })

    useEffect(() => {

        console.log(resultData);
        console.log('^^^^^^^^^^^^^^^^^^^^');
    }, [resultData]);

    const reShapeDiscipline = (_discipline) => resultData.find(item => item.code.toString() === _discipline)?.libelle || ''


    return (

        <Box sx={{padding: '15px 25px',  bgcolor: 'background.paper'}}>
            <Typography variant="h5" noWrap component="div" sx={{color: '#003154'}}>
                <b>{data?.raisonSociale}</b>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154'}}>
                ROC . Viamedis
            </Typography>
            <div>
                {(data?.disciplines && resultData) && data?.disciplines.map((e, i)=><Chip label={reShapeDiscipline(e)} sx={{color: 'black'}} sx={{margin: '10px 10px 10px 0'}} key={`chip_${i}`}/>)}
                {data &&
                    <div style={{display: 'flex', alignItems: 'center', padding: '15px 0', margin: '15px 0', height: '50px'}}>
                        Nº de partenaire&nbsp;:&nbsp;<b style={{color: '#00C9E9'}}>{data.numPartenaire}</b> &nbsp;
                        <Tooltip
                            title={'Finess Géographique'}
                            placement="top" arrow>
                            <InfoOutlinedIcon/>
                        </Tooltip>
                        <span style={{marginLeft: '50px'}}>Finess Juridique&nbsp;:&nbsp;<b style={{color: '#00C9E9'}}>{data.finessJuridique}</b></span>
                    </div>}
            </div>
            <Tabs
                TabIndicatorProps={{sx: {top: 0, bgcolor: 'black'}}}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{color: 'black', '& .Mui-selected': {backgroundColor: 'white', color: '#000!important'}}}
            >
                <Tab label="Information generales" />
                <Tab label={<div>RIB&nbsp;
                    {data?.statutRibs && <Chip label={`${statRow[shown]?.count} ${statRow[shown]?.label}`}
                           sx={{bgcolor: statRow[shown]?.color, color: 'black'}}/>}
                </div>} value="/messages" />
                <Tab label="Droits" />
                <Tab label="Historique" />

            </Tabs>
            <div style={{minHeight: '300px', background: 'white', padding: '15px'}}>
                {data && <pre style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    background: 'white',
                    margin: 0,
                    padding: 0
                }}>{JSON.stringify(data)}</pre>}
            </div>
        </Box>
    );
}
