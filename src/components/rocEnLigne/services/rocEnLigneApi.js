import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'
import {IntlDateWithHHMM} from "../../../utils/convertor-utils";

export const rocEnLigneApi = createApi({
    reducerPath: 'rocEnLigneApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports.selAndIdb}/api/v1`,
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
                let {
                    dateDeSoins, receptionDateStart, receptionDateEnd, idPerFact, dateFact, status, dateAdmission,
                    errorCode, numId, numJur, raisonSociale, department, numClient, nom, prenom, dateNaiss, birdDate, nir, cle
                } = criterias;

                let filters = {...criterias}

                if (dateDeSoins && dateDeSoins != '' && dateDeSoins != undefined) {
                    filters.dateDeSoins = new Date(dateDeSoins).toLocaleDateString('sv');
                }
                if (dateAdmission && dateAdmission != '' && dateAdmission != undefined) {
                    filters.dateAdmission = new Date(dateAdmission).toLocaleDateString('sv');
                }
                if (receptionDateStart && receptionDateStart != '' && receptionDateStart != undefined) {
                    filters.receptionDateStart = IntlDateWithHHMM(receptionDateStart)
                    // filters.receptionDateStart = new Date(receptionDateStart).toISOString()//.toLocaleDateString('sv');
                }

                if (receptionDateEnd && receptionDateEnd != '' && receptionDateEnd != undefined) {
                    filters.receptionDateEnd = IntlDateWithHHMM(receptionDateEnd)
                    // filters.receptionDateEnd = new Date(receptionDateEnd).toISOString()//.toLocaleDateString('sv');//
                }

                if (dateNaiss && dateNaiss != '' && dateNaiss != undefined) {
                    filters.dateNaiss = new Date(dateNaiss).toLocaleDateString('sv').replaceAll('-', '');
                }

                if (birdDate && birdDate != '' && birdDate != undefined) {
                    if (birdDate instanceof Date && !isNaN(birdDate)){
                        filters.dateNaiss = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
                    } else filters.dateNaiss = birdDate.split('/').reverse().join('');
                }

                if (idPerFact && idPerFact !== '' && idPerFact !== undefined) {
                    if (idPerFact.length > 22 && idPerFact.length < 27) filters.idPerFact = idPerFact.substring(0, 22);

                    if (idPerFact.length == 27) {
                        idPerFact = idPerFact.split(' / ')
                        filters.occId = idPerFact[1]
                        filters.idPerFact = idPerFact[0]
                    }
                }

                if (nir && nir != undefined && cle && cle != undefined) {
                    filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
                }

                filters.cashe = null

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 20;

                let url = `sel/search/?pageNumber=${currentPage}&pageSize=${size}`;
                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;

                if(filters) {
                    Object.keys(filters).forEach( key => {
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
        }),

    }),
})
export const {
    useGetRocEnLigneQuery,
    useGetRocEnLigneByIdQuery,
} = rocEnLigneApi


