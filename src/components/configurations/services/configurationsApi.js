import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP} from '../../../../env-vars'

export const configurationsApi = createApi({
    reducerPath: 'configurationsApi',
    baseQuery: fetchBaseQuery({
        // http://10.241.25.10:8015/api/v1/configs
        baseUrl: `http://${env_IP}:8015/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getConfigs: builder.query({
            query: () => {
                let url = `configs`;
                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })

            }
        }),
        getConfigById: builder.query({
            query: (id) => {
                let url = `configs/${id}`;
                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

    }),
})
export const {
    useGetConfigsQuery,
    useGetConfigByIdQuery,
} = configurationsApi


