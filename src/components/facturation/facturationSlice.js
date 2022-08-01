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
        numPartenaire: undefined,
        raisonSociale: undefined,
        disciplines: undefined,
        codePostal: undefined,
        ville: undefined,
        statutRibs: undefined,
    }
    // isLoading: null,
    // isError: null,
}


export const facturationSlice = createSlice({
    name: 'Facturation',
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
                ville,
                codePostal,
                statutRibs,
                disciplines,
                numPartenaire,
                raisonSociale
            } = action?.payload

            state.criterias = {...initialState.criterias};
            state.pagination = initialState.pagination;
            state.numCriterias = 0;

            state.criterias.raisonSociale = raisonSociale;
            if (raisonSociale) {
                state.numCriterias++;
            }
            state.criterias.ville = ville;
            if (ville) {
            }
            state.criterias.codePostal = codePostal;
            if (codePostal) {
                state.numCriterias++;
            }
            state.criterias.statutRibs = statutRibs;
            if (statutRibs) {
                state.numCriterias++;
            }
            state.criterias.disciplines = disciplines;
            if (disciplines) {
                state.numCriterias++;
            }
            state.criterias.numPartenaire = numPartenaire;
            if (numPartenaire) {
                state.numCriterias++;
            }
        },
    },

})

export const {
    setSort,
    setPagination,
    setCriterias,
    initCriterias
} = facturationSlice.actions;

export const selectPagination = (state) => ({...state?.ps?.pagination});
export const selectCriterias = (state) => ({...state?.ps?.criterias});
export const selectNumCriterias = (state) => (state?.ps?.numCriterias);

export default facturationSlice.reducer;
