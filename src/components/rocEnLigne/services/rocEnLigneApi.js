import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP, ports } from '../../../../env-vars'
import { addCriteriasForGetRequest, pageSize } from "../../../utils/utils";
import { reshapeCriterias } from "../utils/utils";

export const baseUrl = `http://${env_IP}:${ports.selAndIdb}/api/v1`

export const rocEnLigneApi = createApi({
    reducerPath: 'rocEnLigneApi',
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
        getRocEnLigne: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                let url = addCriteriasForGetRequest({url: 'sel/search/', filters: reshapeCriterias({criterias})})

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

        getRocEnLigneById: builder.query({
            query: (id) => {
                // http://10.241.25.10:8001/api/v1/sel/details?id=2&type=common&type=info
                let url = `sel/details/?id=${id}&type=acte,common,info,assosiete,facture`; //,acte
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

    }),
})
export const {
    useGetRocEnLigneQuery,
    useGetRocEnLigneByIdQuery,
} = rocEnLigneApi


