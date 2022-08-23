import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP} from '../../../../env-vars'

export const facturesApi = createApi({
    reducerPath: 'facturesApi',
    baseQuery: fetchBaseQuery({
        // http://10.241.25.10:8003/api/v1/paiements/factures/10170
        baseUrl: `http://${env_IP}:8003/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getFactures: builder.query({
            query: (
                page = 0,
                size = 10,
                sortDirection = 'ASC',
                sortProperty,
            ) => ({
                url: `paiements/factures?page=${page}&size=${size}&sortDirection=${sortDirection}&sortProperty=${sortProperty}`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
            }}),
        }),
        getBankaccountps: builder.query({
            query: (
                page = 0,
                size = 10,
                sortDirection = 'ASC',
                sortProperty,
                finessGeo,
                finessJur,
                discipline,
                codeCanal,
                codeReseau,
                codeTypePrestation
            ) => ({
                url: `bankaccountps?page=${page}&size=${size}&sortDirection=${sortDirection}&sortProperty=${sortProperty}`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
            }}),
        }),
        getEts: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {
                const {
                    numPartenaire,
                    raisonSociale,
                    disciplines,
                    codePostal,
                    ville,
                    statutRibs,
                } = criterias;

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 10;
                let url = `ets?page=${currentPage}&size=${size}`;

                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;
                if (numPartenaire) url += `&numPartenaire=${numPartenaire}`;
                if (raisonSociale) url += `&raisonSociale=${raisonSociale}`;
                if (disciplines) url += `&disciplines=${disciplines}`;
                if (codePostal) url += `&codePostal=${codePostal}`;
                if (ville) url += `&ville=${ville}`;
                if (statutRibs) url += `&statutRibs=${statutRibs}`;

                console.log('params to be send > ', url);

                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

        getFactureById: builder.query({
            query: (id) => {
                let url = `paiements/factures/${id}`;
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


