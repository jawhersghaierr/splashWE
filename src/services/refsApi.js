import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { apiUrls } from '../../env-vars'

export const refsApi = createApi({

    reducerPath: 'refsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: window?._env_?.apiUrls?.refs,
        // baseUrl: apiUrls.refs,
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
            transformResponse: (response, meta, arg) => {
                return response
            }
        }),
    }),
})
export const {
    useGetRefsQuery
} = refsApi
