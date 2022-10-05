import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'

export const configurationsApi = createApi({
    reducerPath: 'configurationsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports.configurations}/api/v1`,
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

        getConfigs: builder.query({
            query: () => {
                let url = `configs`;
                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })

            }
        }),

    }),
})
export const {
    useGetConfigsQuery,
} = configurationsApi


