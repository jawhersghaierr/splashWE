import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP} from '../../env-vars'


export const refsApi = createApi({

    reducerPath: 'refsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:8015/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getRefs: builder.query({
            query: () => ({
                url: 'refs',
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
    }),
})
export const {
    useGetRefsQuery
} = refsApi