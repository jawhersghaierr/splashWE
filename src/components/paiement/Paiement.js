import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {PaiementsGrid} from "./grids/PaiementsGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"
import './paiement.scss'

export const Paiement = (props) => {

    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Paiement</b>
        </Typography>
        <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>
        <PaiementsGrid/>

    </div>
}
