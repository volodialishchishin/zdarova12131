import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../axios/config.ts";

export const fetchMaterials = createAsyncThunk(
    'material/fetchAll',
    async () => {
        const response = await $api.get('/materials')
        return response.data
    },
)
