import {createSlice} from "@reduxjs/toolkit";
import {AdminType} from "../../type/types";
import {createAppAsyncThunk} from "../../utils/createAppAsyncThunk";
import {supabase} from "../../dataBase/createClient";

const slice = createSlice({
    name: 'admin',
    initialState: [] as AdminType[],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAdminData.fulfilled, (_, action) => {
            return action.payload?.data
        })
    }
})

export const fetchAdminData = createAppAsyncThunk('admin/fetchAdminData',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            let data = await supabase
                .from('user_products')
                .select('*')
            if (data.data) {
                return data
            }
        } catch (e) {
            return rejectWithValue(null)
        }
    })

export const adminReducer = slice.reducer;
export const adminActions = slice.actions;