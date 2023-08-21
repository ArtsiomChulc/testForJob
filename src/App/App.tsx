import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import ShoppingCart from "../components/shoppingСart/ShoppingCart";
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

    useEffect(() => {
        // Retrieve saved cart items from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    useEffect(() => {
        // Save cart items to localStorage whenever the cart changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (el: CardType[], productId: string) => {
        setCart([...cart, ...el])
    }

    const data = useSelector<AppRootStateType, CardType[]>(state => state.cards)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCards())
    }, []);


    if (data.length === 0) {
        return (
            <Loader/>
        )
    }
    return (
        <div className={s.App}>
            <Header
                cart={cart}
                // totalCost={totalCost}
            />
            <Routes>
                <Route path={'/'} element={<Card
                    data={data}
                    addToCart={addToCart}
                />}/>

                <Route path={'/shoppingCart'} element={<ShoppingCart
                    product={cart}
                    // handleAddToCart={handleAddToCart}
                    // handleRemoveFromCart={handleRemoveFromCart}
                    // quantity={quantity}
                    // totalCost={totalCost}
                />}/>
            </Routes>
        </div>
    );
}

export default App;