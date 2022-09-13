import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {FacturesGrid} from "./grids/FacturesGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import './factures.scss'

export const Factures = (props) => {

    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Factures</b>
        </Typography>
        <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>

        <FacturesGrid disciplines={disciplines}/>

    </div>
}
