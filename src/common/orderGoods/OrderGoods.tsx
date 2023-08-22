import React from 'react';
import s from './orderGoods.module.scss'
import {Button, TextField} from "@mui/material";


const OrderGoods = () => {
    return (
        <form className={s.orderContainer}>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="SureName" variant="outlined" />
            <TextField id="outlined-basic" label="Address" variant="outlined" />
            <TextField id="outlined-basic" label="Phone" variant="outlined" />
            <Button type={'submit'} variant="outlined">Outlined</Button>
        </form>
    );
};

export default OrderGoods;