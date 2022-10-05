import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'

export const psApi = createApi({
    reducerPath: 'psApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports.ps}/api/v1`,
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
        getEtsroc: builder.query({
            query: (
                page = 0,
                size = 10,
                sortDirection = 'ASC',
                sortProperty,
                finessGeo,
                finessJur,
                referenceDate
            ) => ({
                url: `etsroc?page=${page}&size=${size}&sortDirection=${sortDirection}&sortProperty=${sortProperty}`,
                transform: (response, meta, arg) => {
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
                transform: (response, meta, arg) => {
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
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

        getEtsById: builder.query({
            query: (id) => {
                let url = `ets/${id}`;
                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

    }),
})
export const {
    useGetEtsrocQuery,
    useGetBankaccountpsQuery,
    useGetEtsQuery,
    useGetEtsByIdQuery
} = psApi


