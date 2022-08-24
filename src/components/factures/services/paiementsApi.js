import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP } from '../../../../env-vars'

export const paiementsApi = createApi({
    reducerPath: 'paiementsApi',
    baseQuery: fetchBaseQuery({

        // http://10.241.25.10:8003/api/v1/paiements/factures/2441

        baseUrl: `http://${env_IP}:8003/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getPaiementsFacturesById: builder.query({
            query: (numFac) => {

                const url = `paiements/factures/${numFac}`;

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
    useGetPaiementsFacturesByIdQuery,
} = paiementsApi


