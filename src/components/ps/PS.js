import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useGetDisciplinesQuery} from "../referentiel/services/referentielApi";

import {Typography} from "@mui/material";

import SearchAccordion from "../ps/searches/SearchAccordion";
import {PsGrid} from "./grids/PsGrid";
import PsDetailsById from "./PsDetailsById";

import {
    selectPagination,
    selectCriterias
} from './psSlice'

import './ps.scss'
import {matchPath} from "react-router-dom";

export const Ps = (props) => {

    const match = matchPath(props?.location?.pathname, {
        path: "/PS/:id",
        exact: true,
        strict: false
    });

    const criterias = useSelector(selectCriterias);
    const pagination = useSelector(selectPagination);
    const [modalContent, setModalContent] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (data = null) => {
        setModalContent(data);
        setOpen(true);
    };



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

        <PsGrid handleGetById={handleClickOpen} disciplines={disciplines}/>

    </div>
}
