import {createSlice} from "@reduxjs/toolkit";
import {CardType} from "../../type/types";
import {createAppAsyncThunk} from "../../utils/createAppAsyncThunk";
import {supabase} from "../../dataBase/createClient";

const slice = createSlice({
    name: "cards",
    initialState: [] as CardType[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.fulfilled, (_, action) => {
               return action.payload?.data
            })
    }
})

export const fetchCards = createAppAsyncThunk("cards/fetchCards",
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            // dispatch(appActions.setAppStatus({status: "loading"}))
            let data = await supabase
                .from('shopCard')
                .select('*')
            // dispatch(appActions.setAppStatus({status: "succeeded"}))
            // toast.success("Thank you for your letter!");
            if (data.data) {
                return data
            }

        } catch (e) {
            return rejectWithValue(null)
        }
    })


export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;