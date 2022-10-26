import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {CircularProgress, Typography} from "@mui/material";
import {matchPath} from "react-router-dom";
import {useGetConfigsQuery} from "./services/configurationsApi";
import {useGetRefsQuery} from "../../services/refsApi";
import './configuration.scss'
import {ConfigutationsGrid} from "./grids/ConfigutationsGrid";
import SearchAccordion from "./searches/SearchAccordion";
import {selectCriterias} from './configurationsSlice'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import {Link} from "react-router-dom";

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ListConfiguration = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/configuration/:domain/:code",
        exact: true,
        strict: true
    });

    const {domain, code} = match?.params
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [currentConfigs, setCurrentConfigs] = useState({});

    const [openMsg, setOpenMsg] = useState({
        open: false,
        success: null,
        error: null,
        data: null,
    })

    const handleMsgClose = () => {
        setOpenMsg({...openMsg, open: false})
    };

    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();
    const {data: LOC, isFetching: LOCIsFetching, isSuccess: LOCIsSuccess, isError: LOCIsError, error: LOCError} = useGetConfigsQuery(); // LOC === listOfConfigs

    let moreCriterias = null
    if (code) moreCriterias = code?.includes('control') || null
    let url = null, label;

    const criterias = useSelector(selectCriterias);

    useEffect(() => {

        if (domain && code && LOCIsSuccess && LOC[domain]) {
            const current = LOC[domain]?.items?.find(e=>e.code==code)
            setCurrentConfigs(current)
            url = current?.url || null
        }

        if (url) {

            let filters = {...criterias}

            if (criterias?.referenceDate && criterias?.referenceDate != '' && criterias?.referenceDate != undefined) {
                filters.referenceDate = new Date(criterias?.referenceDate).toLocaleDateString('sv');
            }

            if (criterias?.status && criterias?.status !== '' && criterias?.status !== undefined) filters.status = 'A'
            if(filters) {
                Object.keys(filters).forEach( (key, ii)=>{
                    if (filters[key] && filters[key] !== 'null' && filters[key] !== undefined && filters[key] !== '') {
                        url += `${(url.includes('?'))? '&' : '?'}${key}=${filters[key]}`;
                    }
                })
            }
            fetch(url)
                .then(res => {
                    if (res.ok && res.status == 204) return {results:[]}
                    return res.json()
                })
                .then( (res) => {
                        setIsLoaded(true);
                        setItems(res);
                        return res
                    },
                    (error) => {
                        setIsLoaded(true);
                        setOpenMsg({success: false, open: true, error});
                        setItems({
                            result: []
                        });
                        setError(error);
                    }
                )
        }

    }, [domain, code, LOC, nomRefs, criterias])

    // if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>


    const breadcrumbs = [
        <Link key="1" color="inherit" to="/configuration" style={{textDecoration: 'none'}} >
            <Typography variant="h6" noWrap component="div" sx={{color: '#4C6F87'}}>
                <b>Configuration</b>
            </Typography>
        </Link>,
        <Typography key="2" variant="h6" noWrap component="div" sx={{color: '#4C6F87'}}>
            {currentConfigs?.label}
        </Typography>,
    ];

    return <div style={{padding: '0', margin: 0}}>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{padding: '15px 25px', color: '#003154'}}>
            {breadcrumbs}
        </Breadcrumbs>
        {code && <SearchAccordion code={code} nomRefs={nomRefs} moreCriterias={moreCriterias}/>}

        {LOCIsFetching && nomRefsIsFetching && <CircularProgress style={{margin: '100px 50%'}}/>}

        {!(LOCIsFetching || nomRefsIsFetching) && <ConfigutationsGrid data={items} nomRefs={nomRefs} domain={domain} code={code} error={LOCIsError}
                             isSuccess={LOCIsSuccess} isError={LOCError}/>}

        <Snackbar open={openMsg.open}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  autoHideDuration={3000}
                  onClose={handleMsgClose}
                  key={'bottom' + 'right'}>

            <Alert onClose={handleMsgClose}
                   severity={(openMsg.success)? 'success': 'error'}
                   sx={{ width: '100%' }}>
                {!openMsg.success && <AlertTitle><b>Error</b></AlertTitle>}
                {!openMsg.success && <div style={{padding: '5px 95px 0 0'}}>
                    {openMsg.error}
                </div>}
            </Alert>
        </Snackbar>

    </div>
}
