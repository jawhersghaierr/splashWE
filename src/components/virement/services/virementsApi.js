import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { apiUrls } from '../../../../env-vars'
import {addCriteriasForGetRequest, pageSize} from "../../../utils/utils";
import {reshapeCriterias} from "../utils/utils";

export const baseUrl = window?._env_?.apiUrls?.paiements;
// export const baseUrl = apiUrls.virements;

export const virementsApi = createApi({
    reducerPath: 'virementsApi',
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
        getVirements: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                let url = addCriteriasForGetRequest({url: 'virements', filters: reshapeCriterias({criterias})})

                url += `${(url.includes('?')? '&': '?')}pageNumber=${currentPage}&pageSize=${pageSize}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

                console.log(url)

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


        getVirementsById: builder.query({
            query: (id) => {

                const url = `virements/${id}`;

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


    }),
})
export const {
    useGetVirementsQuery,
    useGetVirementsByIdQuery,
} = virementsApi


