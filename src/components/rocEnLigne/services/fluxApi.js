import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP } from '../../../../env-vars'

export const fluxApi = createApi({
    reducerPath: 'fluxApi',
    baseQuery: fetchBaseQuery({

        // http://10.241.25.10:8014/api/v1/facture/flux/15180

        baseUrl: `http://${env_IP}:8014/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getFluxById: builder.query({
            query: (numFac) => {

                const url = `facture/flux/${numFac}`;

                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            }
        })
    }),
})
export const {
    useGetFluxByIdQuery,
} = fluxApi


