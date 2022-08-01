import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "../facturation/searches/SearchAccordion";
import {FacturationGrid} from "./grids/FacturationGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi";
import mainPS from '../../../assets/PS.png'

import './facturation.scss'
import {matchPath} from "react-router-dom";

export const Facturation = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/PS/:id",
        exact: true,
        strict: false
    });


    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Beneficiaire</b> &nbsp;
            {match?.params?.id}
        </Typography>
        <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>

        {/*const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })*/}

        <FacturationGrid disciplines={disciplines}/>

    </div>
}
