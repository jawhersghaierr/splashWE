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
        numPartenaire: null,
        raisonSociale: null,
        disciplines: null,
        codePostal: null,
        ville: null,
        statutRibs: null,
    }
    // isLoading: null,
    // isError: null,
}


export const psSlice = createSlice({
    name: 'PS',
    initialState,
    reducers: {
        // incPage: (state) => {
        //     state.page += 1
        // },
        //
        // decPage: (state, action) => {
        //     console.log(state, ' * ', action)
        //     state.page -= 1
        // },

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

        setCriterias: (state, action) => {

            const {
                ville,
                codePostal,
                statutRibs,
                disciplines,
                numPartenaire,
                raisonSociale
            } = action?.payload

            state.criterias = {};
            state.pagination = initialState.pagination;
            state.numCriterias = 0;

            if (ville) {
                state.criterias.ville = ville;
                state.numCriterias++;
            }
            if (codePostal) {
                state.criterias.codePostal = codePostal;
                state.numCriterias++;
            }
            if (statutRibs) {
                state.criterias.statutRibs = statutRibs;
                state.numCriterias++;
            }
            if (disciplines) {
                state.criterias.disciplines = disciplines;
                state.numCriterias++;
            }
            if (numPartenaire) {
                state.criterias.numPartenaire = numPartenaire;
                state.numCriterias++;
            }
            if (raisonSociale) {
                state.criterias.raisonSociale = raisonSociale;
                state.numCriterias++;
            }
        },
    },

})

export const {
    incPage,
    decPage,
    setSort,
    setPagination,
    setCriterias
} = psSlice.actions;

export const selectPagination = (state) => ({...state?.ps?.pagination});
export const selectCriterias = (state) => ({...state?.ps?.criterias});
export const selectNumCriterias = (state) => (state?.ps?.numCriterias);

export default psSlice.reducer;
