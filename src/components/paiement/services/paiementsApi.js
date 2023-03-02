import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { apiUrls } from '../../../../env-vars'
import {addCriteriasForGetRequest, pageSize} from "../../../utils/utils";
import {reshapeCriterias} from "../utils/utils";

export const baseUrl = window?._env_?.apiUrls?.paiements;
// export const baseUrl = apiUrls.paiements;

export const paiementsApi = createApi({
    reducerPath: 'paiementsApi',
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
        getPaiements: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                let url = addCriteriasForGetRequest({url: 'paiements', filters: reshapeCriterias({criterias})})

                url += `&pageNumber=${currentPage}&pageSize=${pageSize}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

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
        }),


        getPaiementById: builder.query({
            query: (id) => {

                const url = `paiements/${id}`;

                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
            transformResponse: (response, meta, arg) => {
                if (meta.response.status == 204) return {meta: {status: meta.response.status}}
                response?.historyElementList?.forEach((el, id)=>el.id = id)
                return response;
            }

        }),



        getPaiementsFacturesById: builder.query({
            query: (numFac) => {

                const url = `paiements/factures/${numFac}`;

                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            }
        })


    }),
})
export const {
    useGetPaiementsQuery,
    useGetPaiementByIdQuery,
    useGetPaiementsFacturesByIdQuery,
} = paiementsApi


