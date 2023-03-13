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
        numeroEngagement: undefined,
        numeroAdherent: undefined,
        domaine: undefined,
        dateEntree: undefined,
        dateReceivedStart: undefined,
        dateReceivedEnd: undefined,
        identifiantPeriodeFacturation: undefined,
        dateFacture: undefined,
        status: undefined,
        codeErreur: undefined,
        finessGeographique: undefined,
        finessJuridique: undefined,
        raisonSociale: undefined,
        department: undefined,
        numeroAmc: undefined,
        nom: undefined,
        prenom: undefined,
        dateNaissance: undefined,
        birthDate: undefined,
        nir: undefined,
        cle: undefined,
    }
    // isLoading: null,
    // isError: null,
}


export const facturesSlice = createSlice({
    name: 'FACTURES',
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

            // const {
            //     numFact,
            //     numEng,
            //     numAdh,
            //     domaine,
            //     dateEntree,
            //     dateReceivedStart,
            //     dateReceivedEnd,
            //     idPeriodeFact,
            //     dateFact,
            //     status,
            //     errorCode,
            //     numId,
            //     numJur,
            //     raisonSociale,
            //     department,
            //     numClient,
            //     nom,
            //     prenom,
            //     dateNaissance,
            //     birthDate,
            //     nir,
            //     cle
            // } = action?.payload

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
} = facturesSlice.actions;

export const selectPagination = (state) => ({...state?.factures?.pagination});
export const selectCriterias = (state) => ({...state?.factures?.criterias});
export const selectNumCriterias = (state) => (state?.factures?.numCriterias);

export default facturesSlice.reducer;
