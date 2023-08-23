import React, {useState} from 'react';
import s from './orderGoods.module.scss'
import {Button} from "@mui/material";
import {Field, InjectedFormProps, reduxForm, reset} from 'redux-form'
import {supabase} from "../../dataBase/createClient";
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers";
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {sendContactForm} from "../../common/orderGoodsForm/orderGoodsReducer";
import {useSelector} from "react-redux";
import {CardType} from "../../type/types";
import Loader from "../../common/loader/Loader";
import PopUp from "../popup/PopUp";
import {appActions, RequestStatusType} from "../../App/appReducer";

export type ContactFormType = {
    name: string
    surname: string
    address: string
    phone: string
}

let OrderGoods: React.FC<InjectedFormProps<ContactFormType>> = ({
    handleSubmit,
    }) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <form aria-disabled={status === 'loading'} onSubmit={handleSubmit} className={s.orderContainer}>
            <label className={s.label}>Name</label>
            <Field name={'name'} component={'input'} type={'text'} />
            <label className={s.label}>Surname</label>
            <Field name={'surname'} component={'input'} type={'text'} />
            <label className={s.label}>Address</label>
            <Field name={'address'} component={'input'} type={'text'} />
            <label className={s.label}>Phone</label>
            <Field name={'phone'} component={'input'} type={'text'} />
            <Button
                type={'submit'}
                variant="outlined"
                disabled={status === 'loading'}
            >Submit</Button>
        </form>
    );
};

const OrderGoodsForm = reduxForm<ContactFormType>({
    form: 'contact'
})(OrderGoods)


export const ContactForm = () => {
    // const [showPopUp, setShowPopUp] = useState(false);

    // const closePopUp = () => {
    //     setShowPopUp(false)
    // }


    const dispatch = useAppDispatch()

    const onSubmit = async (formData: ContactFormType) => {
        dispatch(sendContactForm(formData))
        dispatch(reset('contact'))
        // setShowPopUp(true)
    }

    return (
        <div className={s.orderWrapper}>
            {/*{showPopUp && <PopUp onClose={closePopUp} text={'Запрос обрабатывается. Скоро с вами свяжемся'}/>}*/}
            <OrderGoodsForm onSubmit={onSubmit}/>
        </div>
    );
};

