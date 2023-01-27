import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {addCriteriasForGetRequest, pageSize} from "../../../utils/utils";
import {reshapeCriterias} from "../utils/utils";
// import { apiUrls } from '../../../../env-vars'

export const baseUrl = window?._env_?.apiUrls?.beneficiaire;
// export const baseUrl = apiUrls.beneficiaire;

export const beneficiaireApi = createApi({
    reducerPath: 'beneficiaireApi',
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

        getBenef: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                let url = addCriteriasForGetRequest({url: 'droitsBeneficiaires', filters: reshapeCriterias({criterias})})

                url += `${(url.includes('?')? '&': '?')}page=${currentPage}&size=${pageSize}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

                url += '&applyEnvCriteria=true';

                console.log('params to be send > ', url);

                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
            transformResponse: (response, meta) => {
                if (meta.response.status == 204) return {...response, meta: {status: meta.response.status}}
                return response
            }

        }),

        getBenefById: builder.query({
            query: (id) => {
                let url = `droitsBeneficiaires/${id}?fields=ADRESSE,GAR,RES_SOINS,AYANT_DROITS,OUVRANT_DROITS`;
                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
            transformResponse: (response, meta) => {
                if (meta.response.status == 204) return {...response, meta: {status: meta.response.status}}
                return response
            }
        }),

    }),
})
export const {
    useGetBenefQuery,
    useGetBenefByIdQuery,
} = beneficiaireApi

