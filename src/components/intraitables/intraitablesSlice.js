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
        periodFrom: null,
        periodTo: null,
    }
    // isLoading: null,
    // isError: null,
}


export const intraitablesSlice = createSlice({
    name: 'INTRAITABLES',
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
                periodFrom,
                periodTo,
            } = action?.payload

            state.criterias = {...initialState.criterias};
            state.pagination = initialState.pagination;
            state.numCriterias = 0;

            state.criterias.periodFrom = periodFrom;
            state.criterias.periodTo = periodTo;

        },
    },

})

export const {
    setSort,
    setPagination,
    setCriterias,
    initCriterias
} = intraitablesSlice.actions;

export const selectPagination = (state) => ({...state?.intraitables?.pagination});
export const selectCriterias = (state) => ({...state?.intraitables?.criterias});
export const selectNumCriterias = (state) => (state?.intraitables?.numCriterias);

export default intraitablesSlice.reducer;
