import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_dev, env_int} from '../../../../env-vars'


/*
http://10.241.25.10:8004/api/v1/

<dependency>
  <groupId>net.viamedis</groupId>
  <artifactId>referentiel-api-specification</artifactId>
  <version>0.0.1-SNAPSHOT</version>
</dependency>

Контракта се намира тук
https://git.viamedis.fr/groupe-vdhm/vdhm-platform/referentiel-transverse/referentiel-transverse-web/-/blob/develop/referentiel-api-specification/src/main/resources/referentiel.yaml

Налични са
- Client http://10.241.25.10:8004/api/v1/clients
- Environment http://10.241.25.10:8004/api/v1/environments
- Nature d'assurance http://10.241.25.10:8004/api/v1/natures
- Parcours de soins http://10.241.25.10:8004/api/v1/parcours
 */

export const referentielApi = createApi({

    reducerPath: 'referentielApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_dev}:8004/api/v1`,
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
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getParcoursById: builder.query({
            query: (id) => ({
                url: `parcours/${id}`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getClients: builder.query({
            query: () => ({
                url: 'clients',
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getClientsById: builder.query({
            query: (id) => ({
                url: `clients/${id}`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getEnvironments: builder.query({
            query: () => ({
                url: 'environments',
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getEnvironmentsById: builder.query({
            query: (id) => ({
                url: `environments/${id}`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getNatures: builder.query({
            query: () => ({
                url: 'natures',
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }}),
        }),
        getNaturesById: builder.query({
            query: (id) => ({
                url: `natures/${id}`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
        }),
        getDisciplines: builder.query({
            query: () => ({
                url: `disciplines`,
                transformResponse: (response, meta, arg) => {
                    return JSON.parse(response);
                }
            }),
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
    useGetDisciplinesQuery
} = referentielApi
