import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP, ports } from '../../../../env-vars'

export const virementsApi = createApi({
    reducerPath: 'virementsApi',
    baseQuery: fetchBaseQuery({

        baseUrl: `http://${env_IP}:${ports.paiements}/api/v1`,
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
                let {
                    numVirement, numDecompte,
                    numAdhInd, numPsAPayer,
                    dateTraitement, dateTraitementFin,
                    status, mntVirement
                } = criterias;

                let filters = {...criterias}

                if (dateTraitement && dateTraitement != '' && dateTraitement != undefined) filters.dateTraitement = new Date(dateTraitement).toLocaleDateString('sv');
                if (dateTraitementFin && dateTraitementFin != '' && dateTraitementFin != undefined) filters.dateTraitementFin = new Date(dateTraitementFin).toLocaleDateString('sv');

                filters.cashe = null

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 20;

                let url = `virements?pageNumber=${currentPage}&pageSize=${size}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

                if(filters) {
                    Object.keys(filters).forEach(key=>{
                        if (filters[key] && filters[key] !== 'null' && filters[key] !== undefined && filters[key] !== '') {
                            url += `&${key}=${filters[key]}`;
                        }
                    })
                }

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
                response?.historyElements?.forEach((el, id)=>el.id = id)
                return response;
            }

        }),


    }),
})
export const {
    useGetVirementsQuery,
    useGetVirementsByIdQuery,
} = virementsApi


