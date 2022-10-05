import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP, ports } from '../../../../env-vars'

export const fluxApi = createApi({
    reducerPath: 'fluxApi',
    baseQuery: fetchBaseQuery({

        baseUrl: `http://${env_IP}:${ports.intraitables}/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    keepUnusedDataFor: 1,

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


