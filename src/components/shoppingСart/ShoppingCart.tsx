import React from 'react';
import {CardType} from "../../type/types";

type ShoppingCartPropsType = {
    product: CardType[]
}

const ShoppingCart = (props: ShoppingCartPropsType) => {
    if (props.product.length === 0) return <div>No product in cart</div>
    return (
        <div>
            {props.product.map(pr => {
                return (
                    <div>{pr.description}</div>
                )
            })}
        </div>
    );
};

export default ShoppingCart;