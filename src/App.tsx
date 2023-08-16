import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import Card from "./components/card/Card";
import ShoppingCart from "./components/shoppingСart/ShoppingCart";
import {supabase} from "./dataBase/createClient";


function App() {

    const [element, setElement] = useState<any>([]);
    console.log(element)

        async function getData() {
            let { data} = await supabase
                .from('shopCard')
                .select('*')
            setElement(data);
        }

    useEffect(() => {
      getData();
    }, []);


  return (
    <div className={s.App}>
        <Card data={element} description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, explicabo.'}/>
        <ShoppingCart/>
    </div>
  );
}

export default App;