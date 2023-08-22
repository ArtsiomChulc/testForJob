import React from 'react';
import s from './orderGoods.module.scss'
import {Button} from "@mui/material";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {supabase} from "../../dataBase/createClient";

type ContactFormType = {
    name: string
    surname: string
    address: string
    phone: string
}

let OrderGoods: React.FC<InjectedFormProps<ContactFormType>> = ({
    handleSubmit,
    }) => {
    return (
        <form onSubmit={handleSubmit} className={s.orderContainer}>
            {/*<TextField id="outlined-basic" label="Name" variant="outlined" />*/}
            {/*<TextField id="outlined-basic" label="SureName" variant="outlined" />*/}
            {/*<TextField id="outlined-basic" label="Address" variant="outlined" />*/}
            {/*<TextField id="outlined-basic" label="Phone" variant="outlined" />*/}
            <label className={s.label}>Name</label>
            <Field name={'name'} component={'input'} type={'text'} />
            <label className={s.label}>Surname</label>
            <Field name={'surname'} component={'input'} type={'text'} />
            <label className={s.label}>Address</label>
            <Field name={'address'} component={'input'} type={'text'} />
            <label className={s.label}>Phone</label>
            <Field name={'phone'} component={'input'} type={'text'} />
            <Button type={'submit'} variant="outlined">Submit</Button>
        </form>
    );
};

const OrderGoodsForm = reduxForm<ContactFormType>({
    form: 'contact'
})(OrderGoods)


export const ContactForm = () => {
    const onSubmit = async (formData: ContactFormType) => {

        await supabase
            .from('user_products')
            .insert({id: 3, name: formData.name, address: formData.address, surname: formData.surname, phone: formData.phone})
            .select()

    }
    return (
        <div className={s.orderWrapper}>
            <OrderGoodsForm onSubmit={onSubmit}/>
        </div>
    );
};

