import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP } from '../../../../env-vars'

export const paiementsApi = createApi({
    reducerPath: 'paiementsApi',
    baseQuery: fetchBaseQuery({

        baseUrl: `http://${env_IP}:8003/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },

    }),
    endpoints: (builder) => ({
        getPaiements: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {
                let {
                    dateDebutSoin, dateDebutSoinFin,
                    dateDebutHospitalisation, dateDebutHospitalisationFin,
                    dateFacture, dateFactureFin,
                    receivedDate, receivedDateFin,
                    creationDate, creationDateFin,
                    dateDeNaissance, birdDate,
                } = criterias;

                let filters = {...criterias}

                if (dateDebutSoin && dateDebutSoin != '' && dateDebutSoin != undefined) filters.dateDebutSoin = new Date(dateDebutSoin).toLocaleDateString('sv');
                if (dateDebutSoinFin && dateDebutSoinFin != '' && dateDebutSoinFin != undefined) filters.dateDebutSoinFin = new Date(dateDebutSoinFin).toLocaleDateString('sv');

                if (dateDebutHospitalisation && dateDebutHospitalisation != '' && dateDebutHospitalisation != undefined) filters.dateDebutHospitalisation = new Date(dateDebutHospitalisation).toLocaleDateString('sv');
                if (dateDebutHospitalisationFin && dateDebutHospitalisationFin != '' && dateDebutHospitalisationFin != undefined) filters.dateDebutHospitalisationFin = new Date(dateDebutHospitalisationFin).toLocaleDateString('sv');

                if (dateFacture && dateFacture != '' && dateFacture != undefined) filters.dateFacture = new Date(dateFacture).toLocaleDateString('sv');
                if (dateFactureFin && dateFactureFin != '' && dateFactureFin != undefined) filters.dateFactureFin = new Date(dateFactureFin).toLocaleDateString('sv');

                if (receivedDate && receivedDate != '' && receivedDate != undefined) filters.receivedDate = new Date(receivedDate).toLocaleDateString('sv');
                if (receivedDateFin && receivedDateFin != '' && receivedDateFin != undefined) filters.receivedDateFin = new Date(receivedDateFin).toLocaleDateString('sv');

                if (creationDate && creationDate != '' && creationDate != undefined) filters.creationDate = new Date(creationDate).toLocaleDateString('sv');
                if (creationDateFin && creationDateFin != '' && creationDateFin != undefined) filters.creationDateFin = new Date(creationDateFin).toLocaleDateString('sv');



                if (dateDeNaissance && dateDeNaissance != '' && dateDeNaissance != undefined) {
                    filters.dateDeNaissance = new Date(dateDeNaissance).toLocaleDateString('sv').replaceAll('-', '');
                }
                if (birdDate && birdDate != '' && birdDate != undefined) {
                    if (birdDate instanceof Date && !isNaN(birdDate)){
                        filters.dateDeNaissance = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
                    } else filters.dateDeNaissance = birdDate.split('/').reverse().join('');
                }


                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                const size = 20;

                let url = `paiements?pageNumber=${currentPage}&pageSize=${size}`;
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

            }
        }),


        getPaiementById: builder.query({
            query: (id) => {

                const url = `paiements/${id}`;

                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
            transformResponse: (response, meta, arg) => {
                response?.historyElements?.forEach((el, id)=>el.id = id)
                return response;
            }

        }),



        getPaiementsFacturesById: builder.query({
            query: (numFac) => {

                const url = `paiements/factures/${numFac}`;

                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            }
        })


    }),
})
export const {
    useGetPaiementsQuery,
    useGetPaiementByIdQuery,
    useGetPaiementsFacturesByIdQuery,
} = paiementsApi


