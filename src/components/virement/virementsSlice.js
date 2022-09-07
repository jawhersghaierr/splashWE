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
        numVirement: undefined,
        numDecompte: undefined,
        numAdhInd: undefined,
        numPsAPayer: undefined,
        dateTraitement: undefined,
        dateTraitementFin: undefined,
        status: undefined,
        mntVirement: undefined
    }
    // isLoading: null,
    // isError: null,
}


export const virementsSlice = createSlice({
    name: 'VIREMENTS',
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
                numVirement,
                numDecompte,
                numAdhInd,
                numPsAPayer,
                dateTraitement,
                dateTraitementFin,
                status,
                mntVirement
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
} = virementsSlice.actions;

export const selectPagination = (state) => ({...state?.virements?.pagination});
export const selectCriterias = (state) => ({...state?.virements?.criterias});
export const selectNumCriterias = (state) => (state?.virements?.numCriterias);

export default virementsSlice.reducer;
