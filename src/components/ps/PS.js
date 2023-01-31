import React, {useEffect, useState} from 'react';
import {matchPath} from "react-router-dom";

import {Typography} from "@mui/material";
import SearchAccordion from "../ps/searches/SearchAccordion";
import {PsGrid} from "./grids/PsGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import mainPS from '../../../assets/PS.png'
import './ps.scss'

export const Ps = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/PS/:id",
        exact: true,
        strict: false
    });


    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Professionnel de santé</b> &nbsp;
            {match?.params?.id}
        </Typography>
        <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>

        {/*const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })*/}

        <PsGrid disciplines={disciplines}/>

    </div>
}
