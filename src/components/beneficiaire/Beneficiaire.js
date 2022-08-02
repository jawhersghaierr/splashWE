import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "../beneficiaire/searches/SearchAccordion";
// import {FacturationGrid} from "./grids/FacturationGrid";
import {useGetEnvironmentsQuery} from "../../services/referentielApi";
import mainPS from '../../../assets/PS.png'

import './beneficiaire.scss'
import {matchPath} from "react-router-dom";

export const Beneficiaire = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/beneficiaire/:id",
        exact: true,
        strict: false
    });


    const {data: enviroments, isFetching: enviromentsIsFetching, isSuccess: enviromentsIsSuccess} = useGetEnvironmentsQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Beneficiaire</b> &nbsp;
            {match?.params?.id}
        </Typography>
        <SearchAccordion
            enviroments={enviroments}
            className="searchContainer"
            enviromentsIsFetching={enviromentsIsFetching}
            enviromentsIsSuccess={enviromentsIsSuccess}/>

        {/*const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })*/}

        {/*<FacturationGrid enviroments={enviroments}/>*/}

    </div>
}