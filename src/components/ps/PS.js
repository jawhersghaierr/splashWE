import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useGetDisciplinesQuery} from "../referentiel/services/referentielApi";

import {Typography} from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import SearchAccordion from "../ps/searches/SearchAccordion";
import {PsGrid} from "./grids/PsGrid";
import PsDetailsById from "./PsDetailsById";

import {
    selectPagination,
    selectCriterias
} from './psSlice'

import './ps.scss'

export const Ps = () => {

    const criterias = useSelector(selectCriterias);
    const pagination = useSelector(selectPagination);
    const [modalContent, setModalContent] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (data = null) => {
        setModalContent(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalContent(null);
    };

    useEffect(() => {
        criterias && console.log('criterias received >>', criterias)
    }, [criterias]);

    const {data: disciplines, isFetching: disciplinesIsFetching, isSuccess: disciplinesIsSuccess} = useGetDisciplinesQuery();

    return <div style={{padding: '0', margin: 0}}>
        <Typography variant="h5" noWrap component="div" sx={{padding: '15px 25px', color: '#003154'}}><b>Professionnel de santé</b></Typography>
        <SearchAccordion
            disciplines={disciplines}
            disciplinesIsFetching={disciplinesIsFetching}
            className="searchContainer"
            disciplinesIsSuccess={disciplinesIsSuccess}/>

        <PsGrid handleGetById={handleClickOpen} disciplines={disciplines}/>

        {modalContent && <Dialog open={open} onClose={handleClose}
            // fullScreen
                 fullWidth={true}
                 maxWidth={'xl'}
                 onClose={(event, reason) => {
                     console.log(reason)
                 }}
        >
            <DialogTitle>{modalContent?.row?.raisonSociale}</DialogTitle>
            <DialogContent sx={{bgcolor: 'background.paper'}}>
                <DialogContentText>
                    ROC. Viamedis
                </DialogContentText>

                <PsDetailsById id={modalContent.id}/>

                <pre style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                }}>{JSON.stringify(modalContent)}</pre>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>}

    </div>
}
