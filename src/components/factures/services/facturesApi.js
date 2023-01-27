import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { apiUrls } from '../../../../env-vars'
import { actesGridMapper } from '../../../utils/reshaper-utils'
import { reshapeCriterias } from "../utils/utils";
import { addCriteriasForGetRequest, pageSize } from "../../../utils/utils";

export const baseUrl = window?._env_?.apiUrls?.factures;
// export const baseUrl = apiUrls.factures;

export const facturesApi = createApi({
    reducerPath: 'facturesApi',
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
        getFactures: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                let url = addCriteriasForGetRequest({url: 'factures', filters: reshapeCriterias({criterias})})

                url += `${(url.includes('?')? '&': '?')}pageNumber=${currentPage}&pageSize=${pageSize}`;
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

        getFactureById: builder.query({
            query: (id) => {
                let url = `factures/${id}`;
                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
            transformResponse: (response, meta) => {
                if (meta.response.status == 204) return {meta: {status: meta.response.status}}

                if (response.factLines && response.factLines.length > 0) {
                    response.factLines = response.factLines.map(factLine => {
                        factLine['taux'] = factLine['taux'] / 100;
                        for (let key in actesGridMapper) {
                            factLine[key] = factLine[actesGridMapper[key]['factures']];
                        }
                        return factLine
                    })

                }
                return response
            }
        }),

    }),
})
export const {
    useGetFacturesQuery,
    useGetFactureByIdQuery,
} = facturesApi


