import React, {useEffect, useState} from 'react';
import {Typography, CircularProgress} from "@mui/material";
import SearchAccordion from "../beneficiaire/searches/SearchAccordion";
import { useGetEnvironmentsQuery } from "../../services/referentielApi";
import {BeneficiaireGrid} from './grids/BeneficiaireGrid'
// import CircularProgress from '@mui/material/CircularProgress';
import './beneficiaire.scss'
import {matchPath} from "react-router-dom";

export const Beneficiaire = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/beneficiaire/:id",
        exact: true,
        strict: false
    });

    const {data: enviroments, isFetching: enviromentsIsFetching, isSuccess: enviromentsIsSuccess} = useGetEnvironmentsQuery();

    if (enviromentsIsFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Bénéficiaire</b> &nbsp;
            {match?.params?.id}
        </Typography>
        <SearchAccordion
            enviroments={enviroments}
            className="searchContainer"
            enviromentsIsFetching={enviromentsIsFetching}
            enviromentsIsSuccess={enviromentsIsSuccess}/>

        <BeneficiaireGrid enviroments={enviroments}/>

    </div>
}
