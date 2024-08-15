import { configureStore } from '@reduxjs/toolkit'
import createOperationReducer from "../Pages/CreatePages/slices/createOperationSlice.ts";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        createOperation: createOperationReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
