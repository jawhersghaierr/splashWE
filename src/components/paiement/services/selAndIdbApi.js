import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP } from '../../../../env-vars'

export const selAndIdbApi = createApi({
    reducerPath: 'selAndIdbApi',
    baseQuery: fetchBaseQuery({

        // http://10.241.25.10:8001/api/v1/sel/details?type=assosiete

        baseUrl: `http://${env_IP}:8001/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getSelsAndIdbOfFactureEngN: builder.query({
            query: (numEng) => {

                const url = `sel/details?type=assosiete&numEng=${numEng}`;

                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
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


