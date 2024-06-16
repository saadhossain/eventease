import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
    isShowPassword: boolean,
    loading: boolean
}

const initialState: InitialState = {
    isShowPassword: true,
    loading: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setIsShowPassword: (state) => {
            state.isShowPassword = !state.isShowPassword
        },
        setLoading: (state) => {
            state.loading = !state.loading
        }
    }
})

export const { setIsShowPassword, setLoading } = commonSlice.actions;
export default commonSlice.reducer;