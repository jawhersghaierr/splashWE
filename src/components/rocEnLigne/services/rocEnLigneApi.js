import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'
import {IntlDateWithHHMM} from "../../../utils/utils";

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
    endpoints: (builder) => ({
        getRocEnLigne: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {
                let {
                    dateDeSoins, receptionDateStart, receptionDateEnd, idPeriodeFact, dateFact, status,
                    errorCode, numId, numJur, raisonSociale, department, numClient, nom, prenom, dateNaiss, birdDate, nir, cle
                } = criterias;

                let filters = {...criterias}

                if (dateDeSoins && dateDeSoins != '' && dateDeSoins != undefined) {
                    filters.dateDeSoins = new Date(dateDeSoins).toLocaleDateString('sv');
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

                if (idPeriodeFact && idPeriodeFact !== '' && idPeriodeFact !== undefined) {
                    if (idPeriodeFact.length > 22 && idPeriodeFact.length < 27) filters.idPeriodeFact = idPeriodeFact.substring(0, 22);

                    if (idPeriodeFact.length == 27) {
                        idPeriodeFact = idPeriodeFact.split(' / ')
                        filters.occId = idPeriodeFact[1]
                        filters.idPeriodeFact = idPeriodeFact[0]
                    }
                }

                if (nir && nir != undefined && cle && cle != undefined) {
                    filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
                }

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


