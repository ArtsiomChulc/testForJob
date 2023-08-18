import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import Card from "../components/card/Card";
import ShoppingCart from "../components/shoppingСart/ShoppingCart";
import {supabase} from "../dataBase/createClient";
import {CardType} from "../type/types";
import Loader from "../common/Loader";


function App() {

    const [element, setElement] = useState<CardType[]>([]);
    console.log(element)

    const getData = async () => {
        let data = await supabase
            .from('shopCard')
            .select('*')
        if (data.data) {
            setElement(data.data)
        }
    }

    useEffect(() => {
      getData().catch(error => console.error(error))
    }, []);

if (element.length === 0) {
    return (
        <Loader/>
    )
}
  return (
    <div className={s.App}>
        <Card data={element} />
        <ShoppingCart/>
    </div>
  );
}

export default App;