import React from 'react'
import { Link } from 'react-router-dom'
import {Box} from "@material-ui/core";
import { useGetParcoursByIdQuery} from './services/referentielApi'

export const DetailsOfParcourID = ({id}) => {

    const {data, isFetching, isSuccess} = useGetParcoursByIdQuery(id)

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
                <Link to={`/editParcours/${data.id}`} className="button">
                    Edit Parcours
                </Link>
            </article>
        </div>)
    }

    return <section>{content}</section>
}
