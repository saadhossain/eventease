import { createSlice } from '@reduxjs/toolkit'

export interface InitialState {
    count: number
}
const initialState: InitialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increaseCount: (state) => {
            state.count = state.count + 1
        },
        decrementCount: (state) => {
            if(state.count <= 1){
                return;
            }
            state.count = state.count - 1
        }
    }
})

export const { increaseCount, decrementCount } = counterSlice.actions;

export default counterSlice.reducer;