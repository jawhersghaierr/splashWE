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
        referenceDate: undefined,
        status: true,
        environment: undefined,
        provenance: undefined,
        discipline: undefined,
        factureContext: undefined,
        canalReception: undefined,
        dcs: undefined
    },
    configuration: {
        code: null,
        label: null,
        url: null,
        urlAndParams: null,
        configId: null,
    },

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

            let {
                label, referenceDate, status, environment, provenance, discipline, factureContext, canalReception, dcs
            } = action?.payload

            let criterias = {...action?.payload, status: Boolean(!action?.payload?.status || action?.payload?.status == undefined)}

            state.criterias = {};

            if(criterias) {
                Object.keys(criterias).forEach(key=>{
                    if (action.payload[key] !== null && action.payload[key] !== undefined) {
                        state.criterias[key] = action.payload[key]
                    }
                })

            }

            state.pagination = initialState.pagination;
        },

        setConfiguration: (state, action) => {
            state.configuration = {...state.configuration, ...action?.payload}
        },
        setConfig: (state, action) => {
            console.log(action)
            state.configuration = {...state.configuration, configId: action?.payload}
        },
    },

})

export const {
    initCriterias,
    setCriterias,
    setConfig
} = configurationsSlice.actions;

export const selectCriterias = (state) => ({...state?.configurations?.criterias});

export const getConfigurations = (state) => ({...state?.configurations?.configuration});

export default configurationsSlice.reducer;
