import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Typography} from "@mui/material";
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
    const {data: LOC, isFetching: LOCIsFetching, isSuccess: LOCIsSuccess} = useGetConfigsQuery(); // LOC === listOfConfigs

    let moreCriterias = null
    if (code) moreCriterias = code?.includes('control') || null
    let url = null;
    const criterias = useSelector(selectCriterias);

    useEffect(() => {

        if (domain && code && LOCIsSuccess && LOC[domain]) {
            url = LOC[domain]?.items?.find(e=>e.code==code)?.url || null
        }

        if (url) {

            let filters = {...criterias}

            if (criterias?.refDate && criterias?.refDate != '' && criterias?.refDate != undefined) {
                filters.refDate = new Date(criterias?.refDate).toLocaleDateString('sv');
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
                .then(res => res.json())
                .then( (res) => {
                        setIsLoaded(true);
                        console.log('ar0rived res > ', res)
                        if (res.ok && res.status == 204) return []
                        setItems(res);
                        return res
                    },
                    (error) => {
                        setIsLoaded(true);
                        console.log('error > ', error)
                        setOpenMsg({success: false, open: true, error: result.error});
                        setItems({
                            result: []
                        });
                        setError(result.error);
                    }
                )
        }

    }, [domain, code, LOC, nomRefs, criterias])

    // if (isFetching) return <CircularProgress style={{margin: '100px 50%'}}/>


    return <div style={{padding: '0', margin: 0}}>

        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Configuration List</b> &nbsp;
        </Typography>

        {code && <SearchAccordion code={code} nomRefs={nomRefs} moreCriterias={moreCriterias}/>}

        {nomRefs && <ConfigutationsGrid data={items} nomRefs={nomRefs} domain={domain} code={code}/>}

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
