import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_dev, env_int} from '../../env-vars'

export const entityApi = createApi({
    reducerPath: 'entityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_dev}:8031/api/entities`,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                responseHandler: (response) => {
                    // debugger
                    return response.text()
                }, // This is the same as passing 'text'
            }),
        }),
        getEntityById: builder.query({
            query: (id) => `/${id}`,
        }),
        updateEntity: builder.mutation({
            query: ({ id, patch }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: patch, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
            }),
        }),
    }),
})
export const { useGetUsersQuery, useGetEntityByIdQuery, useUpdateEntityQuery } = entityApi
