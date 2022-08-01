import React from 'react'
import { Link } from 'react-router-dom'
import {Box} from "@material-ui/core";
import { useGetEnvironmentsByIdQuery} from '../../services/referentielApi'

export const DetailsOfEnvironmentsID = ({id}) => {

    const {data, isFetching, isSuccess} = useGetEnvironmentsByIdQuery(id)

    let content

    //TODO need preloader!

    if (isFetching) {
        content = (<div style={{background: 'green', height: '20px', width: '50px'}}>
            "Loading..."
        </div>)
    } else if (isSuccess) {
        content = (<div style={{padding: '10px', margin: '10px', }}>

            <Box component="span" sx={{
                p: 2,
                m: 2,
            }}>
                <pre style={{wordBreak: 'break-word'}}>{JSON.stringify(data)}</pre>
            </Box>
            <article className="data">
                <Link to={`/editEnvironments/${data.id}`} className="button">
                    Edit Environment
                </Link>
            </article>
        </div>)
    }

    return <section>{content}</section>
}
