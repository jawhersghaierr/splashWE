import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrls } from '../../../../env-vars'

export const configurationsApi = createApi({
    reducerPath: 'configurationsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrls.configurations,
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

            },
            transformResponse: (response, meta) => {
                if (meta.response.status == 204) return {meta: {status: meta.response.status}}
                return response
            }
        }),

    }),
})
export const {
    useGetConfigsQuery,
} = configurationsApi


