import React, {useEffect, useState} from 'react';
import {CardType} from "../../type/types";
import s from './ShopingCart.module.scss'

type ShoppingCartPropsType = {
    product: CardType[]
    handleAddToCart: ( productId: string) => void
    handleRemoveFromCart: (productId: string) => void
    quantity: QuantityState
    totalCost?: number
    setQuantity: (quantity: QuantityState) => void
}

export type QuantityState = {
    [id: string]: number
}

const ShoppingCart = (props: ShoppingCartPropsType) => {

    if (props.product.length === 0) return <div style={{margin: '250px auto', fontSize: '34px', fontStyle: 'italic'}}>No product in cart</div>
    return (
        <div className={s.wrapperCart}>
            {props.product.map(pr => {
                const productQuantity = props.quantity[pr.id] || 0;
                return (
                    <div key={pr.id} className={s.cartContainer}>
                        <div className={s.product}>
                            <div className={s.imgBlock}>
                                <img src={pr.img} alt="Notebook"/>
                            </div>
                            <div className={s.descBlock}>
                                <span>{pr.brand}</span>
                                <span>Price: {pr.price} $</span>
                            </div>
                        </div>
                        <div className={s.delAddProductBlock}>
                            <button onClick={() => props.handleRemoveFromCart(pr.id)}>-</button>
                            <span className={s.quantity}>{productQuantity}</span>
                            <button onClick={() => props.handleAddToCart(pr.id)}>+</button>
                        </div>
                    </div>
                )
            })}
            <span className={s.total}>Total: {props.totalCost} $</span>
        </div>
    );
};

export default ShoppingCart;