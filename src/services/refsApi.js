import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../env-vars'

export const refsApi = createApi({

    reducerPath: 'refsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports.configurations}/api/v1`,
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
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
            transform: (response, meta, arg) => {
                return response
            }
        }),
    }),
})
export const {
    useGetRefsQuery
} = refsApi
