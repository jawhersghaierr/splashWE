import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fluxApi = createApi({
    reducerPath: 'fluxApi',
    baseQuery: fetchBaseQuery({

        baseUrl: window?._env_?.apiUrls?.fluxSelAndIdb,
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

                const url = `sel/flux/${numFac}`;

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
        })
    }),
})
export const {
    useGetFluxByIdQuery,
} = fluxApi


