import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {env_IP, ports} from '../../../../env-vars'

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

                if (dateDeNaissance && dateDeNaissance != '' && dateDeNaissance != undefined) {
                    filters.dateDeNaissance = new Date(dateDeNaissance).toLocaleDateString('sv').replaceAll('-', '');
                }

                if (birdDate && birdDate != '' && birdDate != undefined) {
                    if (birdDate instanceof Date && !isNaN(birdDate)){
                        filters.dateDeNaissance = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
                    } else filters.dateDeNaissance = birdDate.split('/').reverse().join('');
                }

                if (idPeriodeFact && idPeriodeFact !== '' && idPeriodeFact !== undefined) {
                    if (idPeriodeFact.length > 22 && idPeriodeFact.length < 27) filters.idPeriodeFact = idPeriodeFact.substring(0, 22);

                    if (idPeriodeFact.length == 27) {
                        idPeriodeFact = idPeriodeFact.split(' / ')
                        filters.occId = idPeriodeFact[1]
                        filters.idPeriodeFact = idPeriodeFact[0]
                    }
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


