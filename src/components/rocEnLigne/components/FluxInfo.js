import React from 'react'
import {useGetFluxByIdQuery} from "../services/fluxApi";
import XMLViewer from 'react-xml-viewer'
import {CircularProgress, Typography} from "@mui/material";

const customTheme = {
    overflowBreak: true,
    maxHeight: '400px',
    scrollY:'auto'
}

export const FluxInfo = ({factId}) => {

    const {data, isFetching, isSuccess} = useGetFluxByIdQuery(factId);

    return <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minWidth: '200px', fontSize: '12px'}}>
        <div style={{flex: 1, marginRight: '25px', width: '45%', maxWidth: '650px', whiteSpace: 'break-spaces',}}>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154', marginBottom: '10px'}}>
                <b>Flux aller</b>
            </Typography>
            {isFetching && <CircularProgress style={{margin: '100px auto'}}/>}
            {isSuccess && data?.fluxAller && <XMLViewer xml={data.fluxAller} theme={customTheme} style={{maxHeight: '400px', overflowY:'auto'}}/>}
        </div>
        <div style={{flex: 1, marginRight: '25px', width: '45%', maxWidth: '650px', whiteSpace: 'break-spaces',}}>
            <Typography variant="h6" noWrap component="div" sx={{color: '#003154', marginBottom: '10px'}}>
                <b>Flux retour</b>
            </Typography>
            {isFetching && <CircularProgress style={{margin: '100px auto'}}/>}
            {isSuccess && data?.fluxRetour && <XMLViewer xml={data.fluxRetour} theme={customTheme} style={{maxHeight: '400px', overflowY:'auto'}}/>}
        </div>
    </div>
}

