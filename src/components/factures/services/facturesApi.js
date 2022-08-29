import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP} from '../../../../env-vars'

export const facturesApi = createApi({
    reducerPath: 'facturesApi',
    baseQuery: fetchBaseQuery({
        // http://10.241.25.10:8003/api/v1/paiements/factures/10170
        // http://10.241.25.10:8005/api/v1/factures
        baseUrl: `http://${env_IP}:8005/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getFactures: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {
                const {
                    numEng, numFact, numAdh, domaine, dateDeSoins, dateReceivedStart, dateReceivedEnd, idPeriodeFact, dateFact, status,
                    errorCode, numId, numJur, raisonSociale, department, numClient, nom, prenom, dateDeNaissance, birdDate, nir, cle
                } = criterias;

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 20;

                let url = `factures?pageNumber=${currentPage}&pageSize=${size}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

                if(criterias) {
                    Object.keys(criterias).forEach(key=>{
                        if (criterias[key] && criterias[key] !== 'null' && criterias[key] !== undefined && criterias[key] !== '') {
                            url += `&${key}=${criterias[key]}`;
                        }
                    })
                }

                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })

            }
        }),

        getFactureById: builder.query({
            query: (id) => {
                let url = `factures/${id}`;
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
    useGetFacturesQuery,

    useGetFactureByIdQuery,
} = facturesApi


