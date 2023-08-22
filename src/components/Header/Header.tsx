import React from 'react';
import s from './header.module.scss'
import {IconButton} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {CardType} from "../../type/types";
import {Link} from "react-router-dom";

type HeaderPropsType = {
    cart: CardType[]
    totalCost?: number
}

const Header = (props: HeaderPropsType) => {
    return (
        <div className={s.headerContainer}>
            <div className={s.headerMenu}>
                <Link to={'/'} className={s.menuTitle}>Главная</Link>
                <Link to={'/product'} className={s.menuTitle}>Товары</Link>
                <Link to={'/checkout'} className={s.menuTitle}>Оформить заказ</Link>
                <Link to={'/about'} className={s.menuTitle}>О нас</Link>
            </div>
            <div className={s.wrapBtn}>
                <span>Amount: <span className={s.info}>{props.cart.length}</span></span>
                <Link to={'/shoppingCart'}>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </Link>
                <span>Total: <span className={s.info}>{props.totalCost ? props.totalCost : 0} $</span></span>
            </div>
        </div>
    );
};

export default Header;