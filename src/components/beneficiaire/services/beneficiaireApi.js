import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'

export const beneficiaireApi = createApi({
    reducerPath: 'beneficiaireApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports?.beneficiaire}/api/v1`,
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
                let {
                    prenom,
                    nom,
                    numeroAdherent,
                    birdDate,
                    dateNaissance,
                    numAdherentFamillial,
                    envCodeList,
                    dateDebutSoins,
                    dateFinSoins
                } = criterias;

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                if (dateDebutSoins && dateDebutSoins != '' && dateDebutSoins != undefined) {
                    dateDebutSoins = new Date(dateDebutSoins).toLocaleDateString('sv');
                }
                if (dateFinSoins && dateFinSoins != '' && dateFinSoins != undefined) {
                    dateFinSoins = new Date(dateFinSoins).toLocaleDateString('sv');
                }

                if (dateNaissance && dateNaissance != '' && dateNaissance != undefined) {
                    dateNaissance = new Date(dateNaissance).toLocaleDateString('sv').replaceAll('-', '');
                }

                if (birdDate && birdDate != '' && birdDate != undefined) {
                    if (birdDate instanceof Date && !isNaN(birdDate)){
                        dateNaissance = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
                    } else dateNaissance = birdDate.split('/').reverse().join('');
                }

                const size = 20;
                let url = `droitsBeneficiaires?page=${currentPage}&size=${size}`;

                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;
                if (prenom) url += `&prenom=${prenom}`;
                if (nom) url += `&nom=${nom}`;
                if (numeroAdherent) url += `&numeroAdherent=${numeroAdherent}`;
                if (dateNaissance) url += `&dateNaissance=${dateNaissance}`;
                if (numAdherentFamillial) url += `&numAdherentFamillial=${numAdherentFamillial}`;
                if (envCodeList) url += `&envCodeList=${envCodeList}`;
                if (dateDebutSoins) url += `&dateDebutSoins=${dateDebutSoins}`;
                if (dateFinSoins) url += `&dateFinSoins=${dateFinSoins}`;

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

