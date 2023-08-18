import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import ShoppingCart from "../components/shoppingСart/ShoppingCart";
import Loader from "../common/Loader";
import {AppRootStateType, useAppDispatch} from "../App/store";
import {fetchCards} from "../components/card/cardsReduser";
import {useSelector} from "react-redux";
import Card from "../components/card/Card";
import {CardType} from "../type/types";


function App() {
    const [cart, setCart] = useState<CardType[]>([])
    const addToCart = (el: CardType[]) => {
        setCart(el)
    }

    const data = useSelector<AppRootStateType, CardType[]>(state => state.cards)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const thunk = fetchCards()
        dispatch(thunk)
    }, [data]);


    if (data.length === 0) {
    return (
        <Loader/>
    )
}
  return (
    <div className={s.App}>
        <Card data={data} addToCart={addToCart} />
        <ShoppingCart product={cart}/>
    </div>
  );
}

export default App;