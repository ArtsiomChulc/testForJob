import {createSlice} from "@reduxjs/toolkit";
import {CardType} from "../../type/types";
import {createAppAsyncThunk} from "../../utils/createAppAsyncThunk";
import {appActions} from "../../App/appReducer";
import {supabase} from "../../dataBase/createClient";
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers";
import {OrderFormType} from "../../common/orderGoodsForm/OrderGoods";
import {toast} from "react-toastify";

const slice = createSlice({
    name: "contactForm",
    initialState: [] as CardType[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendContactForm.fulfilled, (_, action) => {
                return action.payload?.data
            })
    }
})

export const sendContactForm = createAppAsyncThunk<any, any>("contactForm/sendContactForm",
    async (data: { formData: OrderFormType, product: CardType[] }, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        const { formData, product } = data;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}))
            let data = await supabase
                .from('user_products')
                .insert({id: uuid(),
                    name: formData.name,
                    address: formData.address,
                    surname: formData.surname,
                    phone: formData.phone,
                    brands: product.map(br => br.brand),
                    prices: product.map(pr => pr.price)
                })
                .select()
            toast.success('Мы с вами свяжемся')
            dispatch(appActions.setAppStatus({status: "succeeded"}))
            if (data.data) {
                return data
            }
        } catch (e) {
            return rejectWithValue(null)
        }
    })


export const orderGoodsReducer = slice.reducer;
export const orderGoodsActions = slice.actions;