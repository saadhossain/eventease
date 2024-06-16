import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './features/commonSlice'
import counterReducer from './features/counterSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            common: commonReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']