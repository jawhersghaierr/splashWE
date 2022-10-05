import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP, ports } from '../../../../env-vars'

export const selAndIdbApi = createApi({
    reducerPath: 'selAndIdbApi',
    baseQuery: fetchBaseQuery({

        baseUrl: `http://${env_IP}:${ports.selAndIdb}/api/v1`,
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
        getSelsAndIdbOfFactureEngN: builder.query({
            query: (numEng) => {

                const url = `sel/details?type=assosiete&numEng=${numEng}`;

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
    useGetSelsAndIdbOfFactureEngNQuery,
} = selAndIdbApi


