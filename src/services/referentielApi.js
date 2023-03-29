import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const referentielApi = createApi({

    reducerPath: 'referentielApi',
    baseQuery: fetchBaseQuery({
        baseUrl: window?._env_?.apiUrls?.referentiels,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getParcours: builder.query({
            query: () => ({
                url: 'parcours',
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getParcoursById: builder.query({
            query: (id) => ({
                url: `parcours/${id}`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getClients: builder.query({
            query: () => ({
                url: 'clients',
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getClientsById: builder.query({
            query: (id) => ({
                url: `clients/${id}`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getEnvironments: builder.query({
            query: () => ({
                url: 'environments',
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getEnvironmentsById: builder.query({
            query: (id) => ({
                url: `environments/${id}`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getNatures: builder.query({
            query: () => ({
                url: 'natures',
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getNaturesById: builder.query({
            query: (id) => ({
                url: `natures/${id}`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getDisciplines: builder.query({
            query: () => ({
                url: `disciplines`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
            structuralSharing: false,
        }),
        getGaranties: builder.query({
            query: () => ({
                url: `garanties`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
            structuralSharing: false,
        }),
        getSousGaranties: builder.query({
            query: () => ({
                url: `sousGaranties`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
            structuralSharing: false,
        }),
        getReseaux: builder.query({
            query: () => ({
                url: `reseaux`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
            structuralSharing: false,
        }),
        getDcs: builder.query({
            query: () => ({
                url: `dcs`,
                transform: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
            structuralSharing: false,
        }),
    }),
})
export const {
    useGetParcoursQuery,
    useGetParcoursByIdQuery,
    useGetClientsQuery,
    useGetClientsByIdQuery,
    useGetEnvironmentsQuery,
    useGetEnvironmentsByIdQuery,
    useGetNaturesQuery,
    useGetNaturesByIdQuery,
    useGetDisciplinesQuery,
    useGetGarantiesQuery,
    useGetSousGarantiesQuery,
    useGetReseauxQuery,
    useGetDcsQuery,
} = referentielApi
