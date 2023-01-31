import React from 'react'
import Box from "@mui/material/Box";
import {Typography} from "@material-ui/core";
import {RowInfo} from "../../beneficiaire/components/RowInfo";

export const DetailsRocConfTypeConvention = ({data, nomRefs}) => {

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Environnements</b>
            {data?.environments && data?.environments.map((el, id) => <div style={{margin: '25px 0', borderBottom: '1px solid #EDF2FA'}} key={id}>
                <Typography variant="subtitle2" noWrap component="div" sx={{ color: '#003154',padding: '5px 0'}} id={el + "_" + data?.id}>{nomRefs.ENVIRONMENT[el]}</Typography>
            </div>)}
        </Box>
        <Box style={{
            backgroundColor: '#F6F8FC', flex: 1,
            minWidth: '300px', marginRight: '15px', padding: '10px 25px 25px 25px'
        }}>
            <b>Valeur</b>
            <RowInfo label={'Limite'} value={data?.content} justify={true} id={data?.id} field="content" />
        </Box>

    </div>
}

