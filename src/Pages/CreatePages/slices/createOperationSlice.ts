import { createSlice } from '@reduxjs/toolkit'
import {fetchMaterials} from "../api/fetchMaterials.ts";

export interface CounterState {
    materials: Array<{
        name:string
        id:string
    }>
}

const initialState: CounterState = {
    materials: [],
}

export const createOperationSlice = createSlice({
    name: 'operation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMaterials.fulfilled, (state, action) => {
            state.materials = action.payload
        })
    }
})


export default createOperationSlice.reducer
