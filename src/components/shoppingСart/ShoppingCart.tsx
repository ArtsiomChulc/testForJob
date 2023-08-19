import React, {useState} from 'react';
import {CardType} from "../../type/types";
import s from './ShopingCart.module.scss'

type ShoppingCartPropsType = {
    product: CardType[]
    handleAddToCart?: ( productId: string) => void
    handleRemoveFromCart?: (productId: string) => void
    quantity?: QuantityState
    totalCost?: number
}

export type QuantityState = {
    [id: string]: number
}

const ShoppingCart = (props: ShoppingCartPropsType) => {

    let [quantity, setQuantity] = useState<QuantityState>({'': 1})
    console.log(quantity)

    const addProductHandler = (productId: string) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
    }

    const handleRemoveFromCart = (productId: string) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: Math.max((prevQuantity[productId] || 0) - 1, 0),
        }));
    };

    const totalCost = props.product.reduce((total, pr) => {
        const productQuantity = quantity[pr.id] || 0;
        return total + pr.price * productQuantity;
    }, 0);

    if (props.product.length === 0) return <div style={{margin: '50px auto', fontSize: '34px', fontStyle: 'italic'}}>No product in cart</div>
    return (
        <div className={s.wrapperCart}>
            {props.product.map(pr => {
                const productQuantity = quantity[pr.id] || 0;
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
                            <button onClick={() => handleRemoveFromCart(pr.id)}>-</button>
                            <span className={s.quantity}>{productQuantity}</span>
                            <button onClick={() => addProductHandler(pr.id)}>+</button>
                        </div>
                    </div>
                )
            })}
            <span className={s.total}>Total: {totalCost} $</span>
        </div>
    );
};

export default ShoppingCart;