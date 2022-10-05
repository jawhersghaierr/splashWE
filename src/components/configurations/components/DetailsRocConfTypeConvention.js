import React from 'react'
import Box from "@mui/material/Box";
import {RowInfo} from "../../beneficiaire/components/RowInfo";
import {Typography} from "@material-ui/core";

export const DetailsRocConfTypeConvention = ({data, nomRefs}) => {

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Environnements</b>
            {data?.environments && data?.environments.map((el, id) => <div style={{margin: '25px 0', borderBottom: '1px solid #EDF2FA'}} key={id}>
                <Typography variant="subtitle2" noWrap component="div" sx={{ color: '#003154',padding: '5px 0'}}>{nomRefs.ENVIRONMENT[el]}</Typography>
            </div>)}
        </Box>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Velur</b>
            <RowInfo label={'Limite'} value={data?.content} justify={true}/>
        </Box>

    </div>
}

