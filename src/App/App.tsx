import React, {useEffect} from 'react';
import s from './App.module.css';
import ShoppingCart from "../components/shoppingСart/ShoppingCart";
import Loader from "../common/Loader";
import {AppRootStateType, useAppDispatch} from "../App/store";
import {fetchCards} from "../components/card/cardsReduser";
import {useSelector} from "react-redux";
import Card from "../components/card/Card";
import {CardType} from "../type/types";


function App() {
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
        <Card data={data} />
        <ShoppingCart/>
    </div>
  );
}

export default App;