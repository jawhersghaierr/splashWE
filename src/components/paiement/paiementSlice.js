import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pagination: {
        page: 0,
        size: 10,
        totElements: null,
        totPages: null,
        sortDirection: 'ASC',
        sortPropert: null
    },
    criterias: {
        numeroFacture: undefined,
        numIdPs: undefined,
        numAdhInd: undefined,
        dateDebutSoin: undefined,
        dateDebutSoinFin: undefined,
        grоupDisciplines: undefined,
        disciplines: undefined,
        numeroPsJuridique: undefined,
        complNumTitre: undefined,
        dateDebutHospitalisation: undefined,
        dateDebutHospitalisationFin: undefined,
        status: undefined,
        totalRc: undefined,
        dateFacture: undefined,
        dateFactureFin: undefined,
        receivedDate: undefined,
        receivedDateFin: undefined,
        creationDate: undefined,
        creationDateFin: undefined,
        factureRc: undefined,
        numEnv: undefined,
        provenance: undefined,
        nom: undefined,
        prenom: undefined,
        dateDeNaissance: undefined,
        birdDate: undefined,
        nir: undefined,
        cle: undefined
    }
    // isLoading: null,
    // isError: null,
}


export const paiementSlice = createSlice({
    name: 'PAIEMENTS',
    initialState,
    reducers: {

        setSort: (state, action) => {
            state.sortPropert = action?.payload?.sortPropert || null
            state.sortDirection = action?.payload?.sortDirection || null
        },

        setPagination: (state, action) => {
            const {
                page,
                size,
                totElements,
                totPages,
                sortPropert = null,
                sortDirection = 'ASC'

            } = action?.payload

            if (page >= 0) state.pagination.page = page;
            if (size) state.pagination.size = size;
            if (totPages) state.pagination.totPages = totPages;
            if (totElements) state.pagination.totElements = totElements;
            if (sortPropert) state.pagination.sortPropert = sortPropert;
            if (sortDirection) state.pagination.sortDirection = sortDirection;
        },

        initCriterias: (state, action) => {
            state.criterias = {...initialState.criterias};
        },
        setCriterias: (state, action) => {

            const {
                numeroFacture, numIdPs, numAdhInd,
                dateDebutSoin, dateDebutSoinFin,
                grоupDisciplines, disciplines,
                numeroPsJuridique, complNumTitre,
                dateDebutHospitalisation, dateDebutHospitalisationFin,
                status, totalRc,
                dateFacture, dateFactureFin,
                receivedDate, receivedDateFin,
                creationDate, creationDateFin,
                factureRc, numEnv, provenance,
                nom, prenom, dateDeNaissance, birdDate,
                nir, cle
            } = action?.payload

            state.criterias = {};

            if(action?.payload) {
                Object.keys(action?.payload).forEach(key=>{
                    if (action.payload[key] !== null && action.payload[key] !== undefined) {
                        state.criterias[key] = action.payload[key]
                        state.numCriterias++;
                    }
                })

            }

            state.pagination = initialState.pagination;
        },
    },

})

export const {
    setSort,
    setPagination,
    setCriterias,
    initCriterias
} = paiementSlice.actions;

export const selectPagination = (state) => ({...state?.paiements?.pagination});
export const selectCriterias = (state) => ({...state?.paiements?.criterias});
export const selectNumCriterias = (state) => (state?.paiements?.numCriterias);

export default paiementSlice.reducer;