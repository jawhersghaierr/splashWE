import React, {useEffect, useState} from 'react';
import {CircularProgress, Typography} from "@mui/material";
import SearchAccordion from "./searches/SearchAccordion";
import {RocEnLigneGrid} from "./grids/RocEnLigneGrid";
import {useGetDisciplinesQuery} from "../../services/referentielApi"

import './rocEnLigne.scss'
import MoreThan200Results from "../shared/MoreThan200Results";

export const RocEnLigne = () => {

    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess, isError, error} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}>
            <b>Services en lignes</b>
        </Typography>
        {disciplinesIsFetching && <CircularProgress style={{margin: '100px 50%'}}/>}
        {disciplinesIsSuccess && <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>}

        {disciplinesIsSuccess && <RocEnLigneGrid disciplines={disciplines}/>}

        <MoreThan200Results data={disciplines} error={error} isSuccess={disciplinesIsSuccess} isError={isError}/>

    </div>
}
