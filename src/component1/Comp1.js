import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount,
} from './comp1Slice';

import {useGetUsersQuery} from '../services/entityApi'

import styles from './Comp1.module.css'
import {store} from "../store";
import Button from '@mui/material/Button';
import {Box, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
// import {changeAppNameAction} from "../../../hospi-ui/src/reducer";

import {Parcours} from "../components/referentiel/Parcours";


export function Comp1() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch()
    const remote = useSelector((state) => state.remoteApp && state.remoteApp.appName)
    const [incrementAmount, setIncrementAmount] = useState('2');
    const {data} = useGetUsersQuery();

    useEffect(() => {
        data && console.log('received >>', JSON.parse(data))
    }, [data]);



    return (
        <div className="wrapper">

        {/*<Box component="span" sx={{*/}
        {/*        p: 2,*/}
        {/*        m: 2,*/}
        {/*        border: '1px dashed grey',*/}
        {/*        width: 30,*/}
        {/*        height: 20,*/}
        {/*        '&:hover': {*/}
        {/*            opacity: [0.9, 0.8, 0.7],*/}
        {/*        },*/}
        {/*    }}>*/}
        {/*</Box>*/}
            <Button>Parcours</Button>
            <Parcours/>

            <Card sx={{ minWidth: 275, flex: 1, margin: '10px' }} className="aside">
                <CardContent>
                    <Typography variant="h5" component="span">
                        Small example
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        for transition between states
                    </Typography>
                    {remote && <Typography variant="body2">
                        RemoteApp's name from <br/>the redux store :
                        <Typography variant="h5" component="span">
                            {remote}
                        </Typography>
                        <br/>
                    </Typography>}
                    <Typography variant="h5" component="span">
                        Remote Count:
                    </Typography>
                    <Typography variant="h5" component="span">
                        <span>{count}</span>
                    </Typography>
                </CardContent>
                <CardActions>

                    <Button
                        aria-label="Increment"
                        variant="contained"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </Button>
                    <Button
                        aria-label="Decrement"
                        variant="contained"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </Button>

                </CardActions>
            </Card>

            <Card sx={{ minWidth: 275, width: 275, margin: '10px' }}  className="aside">
                <CardContent>
                    <Typography variant="h5" component="span">
                        Asynchronous
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        for transition between states
                    </Typography>
                    <TextField id="outlined-basic"
                               label="Set increment amount" variant="outlined"
                               value={incrementAmount} onChange={e => setIncrementAmount(e.target.value)}
                    />
                </CardContent>
                <CardActions>


                    <Button
                        variant="outlined"
                        onClick={() =>
                            dispatch(incrementByAmount(Number(incrementAmount) || 0))
                        }
                    >
                        Add Amount
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
                    >
                        Add Async
                    </Button>
                </CardActions>

            </Card>
        </div>
    )
}
