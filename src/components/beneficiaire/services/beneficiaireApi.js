import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP} from '../../../../env-vars'

// http://10.241.25.10:8007/v1/droitsBeneficiaires/

export const beneficiaireApi = createApi({
    reducerPath: 'beneficiaireApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:8007/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({

        getBenef: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {
                const {
                    prenom,
                    nom,
                    numAdherentIndividuel,
                    dateDeNaissance,
                    numAdherentFamillial,
                    enviroment,
                    dateDebutSoins,
                    dateFinSoins
                } = criterias;

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 10;
                let url = `droitsBeneficiaires?page=${currentPage}&size=${size}`;

                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;
                if (prenom) url += `&prenom=${prenom}`;
                if (nom) url += `&nom=${nom}`;
                if (numAdherentIndividuel) url += `&numAdherentIndividuel=${numAdherentIndividuel}`;
                if (dateDeNaissance) url += `&dateDeNaissance=${dateDeNaissance}`;
                if (numAdherentFamillial) url += `&numAdherentFamillial=${numAdherentFamillial}`;
                if (enviroment) url += `&enviroment=${enviroment}`;
                if (dateDebutSoins) url += `&dateDebutSoins=${dateDebutSoins}`;
                if (dateFinSoins) url += `&dateFinSoins=${dateFinSoins}`;

                console.log('params to be send > ', url);

                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

        getBenefById: builder.query({
            query: (id) => {
                let url = `droitsBeneficiaires/${id}`;
                return ({
                    url,
                    transformResponse: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

    }),
})
export const {
    useGetBenefQuery,
    useGetBenefByIdQuery,
} = beneficiaireApi

