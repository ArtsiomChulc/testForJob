import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import ShoppingCart, {QuantityState} from "../components/shoppingСart/ShoppingCart";
import Loader from "../common/Loader";
import {AppRootStateType, useAppDispatch} from "../App/store";
import {fetchCards} from "../components/card/cardsReduser";
import {useSelector} from "react-redux";
import Card from "../components/card/Card";
import {CardType} from "../type/types";
import Header from "../components/Header/Header";
import {Route, Routes} from "react-router-dom";


function App() {
    const [cart, setCart] = useState<CardType[]>([])
    const [quantity, setQuantity] = useState<QuantityState>({})
    const addToCart = (el: CardType[], productId: string) => {
        const isProductInCart = cart.some(item => item.id === productId);
        if (isProductInCart) {
            alert('Товар уже в корзине!');
            return;
        }
        setCart([...cart, ...el])
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
    }

    // const handleAddToCart = (productId: string) => {
    //     setQuantity((prevQuantity) => ({
    //         ...prevQuantity,
    //         [productId]: (prevQuantity[productId] || 0) + 1,
    //     }));
    // };

    const handleRemoveFromCart = (productId: string) => {
        const updateCart = cart.filter(item => item.id !== productId)
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: Math.max((prevQuantity[productId] || 0) - 1, 0),
        }));
        setCart(updateCart)
    };

    const totalCost = cart.reduce((total, pr) => {
        const productQuantity = quantity[pr.id] || 0;
        return total + pr.price * productQuantity;
    }, 0);

    const data = useSelector<AppRootStateType, CardType[]>(state => state.cards)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const thunk = fetchCards()
        dispatch(thunk)
    }, []);


    if (data.length === 0) {
        return (
            <Loader/>
        )
    }
    return (
        <div className={s.App}>
            <Header cart={cart} totalCost={totalCost}/>
            <Routes>
                <Route path={'/'} element={<Card data={data} addToCart={addToCart}/>}/>

                <Route path={'/shoppingCart'} element={<ShoppingCart
                    product={cart}
                    handleAddToCart={addToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    quantity={quantity}
                    totalCost={totalCost}
                />}/>
            </Routes>
        </div>
    );
}

export default App;