import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pagination: {
        page: 0,
        size: 20,
        totElements: null,
        totPages: null,
        sortDirection: 'ASC',
        sortPropert: null
    },
    criterias: {
        birdDate: null,
        prenom: undefined,
        nom: undefined,
        numeroAdherent: undefined,
        dateDeNaissance: null,
        numAdherentFamillial: undefined,
        envCodeList: undefined,
        dateDebutSoins: null,
        dateFinSoins: null
    }
    // isLoading: null,
    // isError: null,
}


export const beneficiaireSlice = createSlice({
    name: 'BENEF',
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
                birdDate, prenom, nom, numeroAdherent, dateDeNaissance, numAdherentFamillial, envCodeList, dateDebutSoins, dateFinSoins
            } = action?.payload

            state.criterias = {...initialState.criterias};
            state.pagination = initialState.pagination;
            state.numCriterias = 0;

            state.criterias.prenom = prenom;
            state.criterias.nom = nom;
            state.criterias.numeroAdherent = numeroAdherent;
            state.criterias.birdDate = birdDate;
            state.criterias.dateDeNaissance = dateDeNaissance;
            state.criterias.numAdherentFamillial = numAdherentFamillial;
            state.criterias.envCodeList = envCodeList;
            state.criterias.dateDebutSoins = dateDebutSoins;
            state.criterias.dateFinSoins = dateFinSoins;

        },
    },

})

export const {
    setSort,
    setPagination,
    setCriterias,
    initCriterias
} = beneficiaireSlice.actions;

export const selectPagination = (state) => ({...state?.benef?.pagination});
export const selectCriterias = (state) => ({...state?.benef?.criterias});
export const selectNumCriterias = (state) => (state?.benef?.numCriterias);

export default beneficiaireSlice.reducer;
