import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {PaiementsGrid} from "./grids/PaiementsGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"
import mainPS from '../../../assets/PS.png'

import './paiement.scss'
import {matchPath} from "react-router-dom";
import PaiementDetailsById from "./PaiementDetailsById";

export const Paiement = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/paiement/:id",
        exact: true,
        strict: false
    });


    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Paiement</b> &nbsp;
            {match?.params?.id}
        </Typography>
        <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>

        {/*const {data: resultData} = useGetDisciplinesQuery(undefined, { selectFromResult: result => ({ data: result?.data }) })*/}

        <PaiementsGrid disciplines={disciplines}/>

    </div>
}
