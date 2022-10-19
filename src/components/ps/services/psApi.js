import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'
import {addCriteriasForGetRequest, pageSize} from "../../../utils/utils";
import {reshapeCriterias} from "../utils/utils";

export const baseUrl = `http://${env_IP}:${ports.ps}/api/v1`

export const psApi = createApi({
    reducerPath: 'psApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
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


                let url = addCriteriasForGetRequest({url: 'ets', filters: reshapeCriterias({criterias})})

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                url += `${(url.includes('?')? '&': '?')}page=${currentPage}&size=${pageSize}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

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


