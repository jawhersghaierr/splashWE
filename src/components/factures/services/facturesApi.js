import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'

export const facturesApi = createApi({
    reducerPath: 'facturesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports.factures}/api/v1`,
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
                let {
                    dateDeSoins, dateReceivedStart, dateReceivedEnd, idPeriodeFact, dateFact, status,
                    errorCode, numId, numJur, raisonSociale, department, numClient, nom, prenom, dateDeNaissance, birdDate, nir, cle
                } = criterias;

                let filters = {...criterias}

                if (dateDeSoins && dateDeSoins != '' && dateDeSoins != undefined) {
                    filters.dateDeSoins = new Date(dateDeSoins).toLocaleDateString('sv');
                }

                if (dateReceivedStart && dateReceivedStart != '' && dateReceivedStart != undefined) {
                    filters.dateReceivedStart = new Date(dateReceivedStart).toLocaleDateString('sv');//.toISOString()
                }

                if (dateReceivedEnd && dateReceivedEnd != '' && dateReceivedEnd != undefined) {
                    filters.dateReceivedEnd = new Date(dateReceivedEnd).toLocaleDateString('sv');//.toISOString()
                }

                if (dateFact && dateFact != '' && dateFact != undefined) {
                    filters.dateFact = new Date(dateFact).toLocaleDateString('sv');//.toISOString()
                }

                if (dateDeNaissance && dateDeNaissance != '' && dateDeNaissance != undefined) {
                    filters.dateDeNaissance = new Date(dateDeNaissance).toLocaleDateString('sv').replaceAll('-', '');
                }

                if (birdDate && birdDate != '' && birdDate != undefined) {
                    if (birdDate instanceof Date && !isNaN(birdDate)){
                        filters.dateDeNaissance = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
                    } else filters.dateDeNaissance = birdDate.split('/').reverse().join('');
                }

                if (nir && nir != undefined && cle && cle != undefined) {
                    filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
                }

                if (idPeriodeFact && idPeriodeFact !== '' && idPeriodeFact !== undefined) {
                    if (idPeriodeFact.length > 22 && idPeriodeFact.length < 27) filters.idPeriodeFact = idPeriodeFact.substring(0, 22);

                    if (idPeriodeFact.length == 27) {
                        idPeriodeFact = idPeriodeFact.split(' / ')
                        filters.occId = idPeriodeFact[1]
                        filters.idPeriodeFact = idPeriodeFact[0]
                    }
                }

                filters.cashe = null

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 20;

                let url = `factures?pageNumber=${currentPage}&pageSize=${size}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

                if(filters) {
                    Object.keys(filters).forEach(key=>{
                        if (filters[key] && filters[key] !== 'null' && filters[key] !== undefined && filters[key] !== '') {
                            url += `&${key}=${filters[key]}`;
                        }
                    })
                }

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
                return response
            }
        }),

    }),
})
export const {
    useGetFacturesQuery,
    useGetFactureByIdQuery,
} = facturesApi


