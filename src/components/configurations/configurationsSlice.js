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
        label: undefined,
        dateDeReference: undefined,
        statut: undefined,
    },
    configuration: {
        code: null,
        label: null,
        url: null,
        urlAndParams: null,
        configId: null,
    },

    // isLoading: null,
    // isError: null,
}


export const configurationsSlice = createSlice({
    name: 'CONFIGURATIONS',
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
                label,
                dateDeReference,
                statut
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

        setConfiguration: (state, action) => {
            console.log(action)
            // let {code = null, label = null, url:urlAndParams = null} = action?.payload
            // let url = urlAndParams?.split('?')[0]

            // state.configuration = {...state.configuration, code, label, urlAndParams, url}
            state.configuration = {...state.configuration, ...action?.payload}
        },
        setConfig: (state, action) => {
            console.log(action)
            state.configuration = {...state.configuration, configId: action?.payload}
        },
    },

})

export const {
    setSort,
    setPagination,
    initCriterias,
    setCriterias,
    setConfiguration,
    setConfig
} = configurationsSlice.actions;

export const selectPagination = (state) => ({...state?.configurations?.pagination});
export const selectNumCriterias = (state) => (state?.configurations?.numCriterias);
export const selectCriterias = (state) => ({...state?.configurations?.criterias});

export const getConfigurations = (state) => ({...state?.configurations?.configuration});

export default configurationsSlice.reducer;
