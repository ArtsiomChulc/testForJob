import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import ShoppingCart, {QuantityState} from "../components/shoppingСart/ShoppingCart";
import Loader from "../common/loader/Loader";
import {AppRootStateType, useAppDispatch} from "../App/store";
import {fetchCards} from "../components/card/cardsReduser";
import {useSelector} from "react-redux";
import Card from "../components/card/Card";
import {CardType} from "../type/types";
import Header from "../components/Header/Header";
import {Route, Routes} from "react-router-dom";
import PopUp from "../common/popup/PopUp";


function App() {
    const [cart, setCart] = useState<CardType[]>([])

    const [showPopUp, setShowPopUp] = useState(false);

    // for ShoppingCart
    let [quantity, setQuantity] = useState<QuantityState>({})

    const data = useSelector<AppRootStateType, CardType[]>(state => state.cards)
    const dispatch = useAppDispatch()

    const addProductHandler = (productId: string) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
    }

    const handleRemoveFromCart = (productId: string) => {
        setQuantity((prevQuantity) => {
            const updatedQuantity = { ...prevQuantity };
            const updatedProductQuantity = Math.max((prevQuantity[productId] || 0) - 1, 0);
            if (updatedProductQuantity === 0) {
                delete updatedQuantity[productId];
                setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
            } else {
                updatedQuantity[productId] = updatedProductQuantity;
            }
            return updatedQuantity;
        });
    };

    const totalCost = cart.reduce((total, pr) => {
        const productQuantity = quantity[pr.id] || 0;
        return total + pr.price * productQuantity;
    }, 0);


    useEffect(() => {
        // Retrieve saved cart items from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    useEffect(() => {
        // Save cart items to localStorage whenever the cart changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        // Получение сохраненных данных из localStorage
        const savedQuantity = JSON.parse(localStorage.getItem('quantity') || '{}');

        // Восстановление сохраненных данных
        setQuantity(savedQuantity);
    }, []);

    useEffect(() => {
        // Сохранение данных в localStorage при каждом изменении quantity
        localStorage.setItem('quantity', JSON.stringify(quantity));
    }, [quantity]);


    const addToCart = (el: CardType[], productId: string) => {
        const isProductInCart = cart.some((item) => item.id === productId);
        if (isProductInCart) {
            setShowPopUp(true)
        } else {
            setCart([...cart, ...el]);
            setQuantity((prevQuantity) => ({
                ...prevQuantity,
                [productId]: 1,
            }));
        }
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
    };

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
            {showPopUp && <PopUp onClose={handleClosePopUp} />}
            <Header
                cart={cart}
                totalCost={totalCost}
            />
            <Routes>
                <Route path={'/product'} element={<Card
                    disabled={showPopUp}
                    data={data}
                    addToCart={addToCart}
                />}/>

                <Route path={'/shoppingCart'} element={<ShoppingCart
                    product={cart}
                    handleAddToCart={addProductHandler}
                    handleRemoveFromCart={handleRemoveFromCart}
                    quantity={quantity}
                    totalCost={totalCost}
                    setQuantity={setQuantity}
                />}/>
            </Routes>
        </div>
    );
}

export default App;