import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 777,
    isLoading: null,
    isError: null,
}

const wait = (amount) => new Promise ((resolve) => {
    setTimeout(() => resolve(amount), 1000);
});

export const incrementAsync = createAsyncThunk(
    'comp1/incrementAsync',
    async (amount, api) => {
        console.log('thunk (amount)'+amount)
        const response = await wait(amount);
        api.dispatch(incrementByAmount(amount));

        return response
    }
);

export const comp1Slice = createSlice({
    name: 'Comp1',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state, action) => {
            console.log(state, ' * ', action)
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        // extraReducers: {
        //     [incrementAsync.fulfilled]: (state, action) => {
        //         console.log(state, ' * ', action.payload)
        //         // state.value += action.payload
        //     },
        //     [incrementAsync.pending]: (state, action) => {
        //         console.log(state, ' * ', action.payload)
        //         // state.value += action.payload
        //         return {
        //             ...state,
        //             isLoading: true,
        //             isError: false
        //         }
        //     },
        //
        // },
        extraReducers: (builder, s) => {

            builder.addCase(incrementAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    value: {...action}
                }
            });
            builder.addCase(incrementAsync.pending, (state, action) => {
                console.log(s, ' * ', action)
                state.value = "pending"
            });
            builder.addCase(incrementAsync.rejected, (state, action) => {
                console.log(s, ' * ', action)
                state.value = "rejected"
            });
            builder.addCase(incrementAsync.typePrefix, (state, action) => {
                console.log(s, ' * ', action)
                state.value = "typePrefix"
            });

        }
    },

})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = comp1Slice.actions

export const selectCount = (state) => state.comp1.value

export default comp1Slice.reducer
