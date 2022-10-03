import React from 'react'
import {useGetFluxByIdQuery} from "../services/fluxApi";
import XMLViewer from 'react-xml-viewer'

const customTheme = {
    overflowBreak: true
}

export const FluxInfo = ({factId}) => {

    const {data} = useGetFluxByIdQuery(factId);

    return <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minWidth: '200px', margin: '15px 0', fontSize: '12px'}}>
        <div style={{flex: 1, marginRight: '25px', width: '45%', maxWidth: '650px', whiteSpace: 'break-spaces',}}>
            {data?.fluxAller && <XMLViewer xml={data.fluxAller} theme={customTheme}/>}
        </div>
        <div style={{flex: 1, marginRight: '25px', width: '45%', maxWidth: '650px', whiteSpace: 'break-spaces',}}>
            {data?.fluxRetour && <XMLViewer xml={data.fluxRetour} theme={customTheme}/>}
        </div>
    </div>
}

