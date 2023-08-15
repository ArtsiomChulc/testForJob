import React from 'react';
import s from './App.module.css';
import Card from "./components/card/Card";
import ShoppingCart from "./components/shoppingСart/ShoppingCart";

function App() {

  return (
    <div className={s.App}>
        <Card description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, explicabo.'}/>
        <ShoppingCart/>
    </div>
  );
}

export default App;
