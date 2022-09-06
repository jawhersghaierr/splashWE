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
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
            transformResponse: (response, meta, arg) => {
                let STATUS_PAIAE = {
                    EN_COURS: 'EN_COURS',
                    VALIDE: 'VALIDE',
                    VALIDE_HCP: 'VALIDE_HCP',
                    SUSPENDU: 'SUSPENDU',
                    EXTRAIT: 'EXTRAIT',
                    ERREUR_EXTRACTION: 'ERREUR_EXTRACTION',
                    EN_ATTENTE: 'EN_ATTENTE',
                    PAYE: 'PAYE',
                    REMBOURSE: 'REMBOURSE',
                    ANNULE: 'ANNULE'
                }
                return {STATUS_PAIAE, ...response}
            }
        }),
    }),
})
export const {
    useGetRefsQuery
} = refsApi
