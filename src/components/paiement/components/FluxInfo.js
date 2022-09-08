import React from 'react'
import {useGetFluxByIdQuery} from "../services/fluxApi";

export const FluxInfo = ({factId}) => {

    const {data} = useGetFluxByIdQuery(factId);
    let rows = []

    if (data) data.forEach(aEl => rows.push(aEl.map(e=>e.data).reduce((a,b)=>`${a}${b}`)))

    return <div style={{ flex: 1, minWidth: '200px', maxWidth: '100%', margin: '15px 0'}}>

        {rows.length > 0 && rows.map((row, i) =>
            <div key={i} style={{display: 'flex', flexDirection: 'row', margin: '25px 0'}}>
                <div style={{flex: 1, maxWidth: '45px'}}>{i} :</div>
                <div style={{flex: 11}}>{row}</div>
            </div>)}
        {/*{JSON.stringify(data)}*/}

    </div>
}
