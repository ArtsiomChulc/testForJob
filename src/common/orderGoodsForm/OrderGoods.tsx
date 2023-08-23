import React from 'react';
import s from './orderGoods.module.scss'
import {Button} from "@mui/material";
import {Field, InjectedFormProps, reduxForm, reset} from 'redux-form'
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {sendContactForm} from "../../common/orderGoodsForm/orderGoodsReducer";
import {useSelector} from "react-redux";
import {CardType} from "../../type/types";
import {RequestStatusType} from "../../App/appReducer";

export type OrderFormType = {
    name: string
    surname: string
    address: string
    phone: string
}

type ContactFormType = {
    product: CardType[]
}

let OrderGoods: React.FC<InjectedFormProps<OrderFormType>> = ({
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

const OrderGoodsForm = reduxForm<OrderFormType>({
    form: 'contact'
})(OrderGoods)


export const ContactForm = (props: ContactFormType) => {
    const {product} = props


    const dispatch = useAppDispatch()

    const onSubmit = async (formData: OrderFormType) => {
        const data = {
            formData: formData,
            product: product
        }
        dispatch(sendContactForm(data))
        dispatch(reset('contact'))
    }

    return (
        <div className={s.orderWrapper}>
            <OrderGoodsForm onSubmit={onSubmit}/>
        </div>
    );
};

