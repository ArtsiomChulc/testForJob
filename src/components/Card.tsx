import React from 'react';
import s from './card.module.scss';
import foto1 from '../assets/img/maxresdefault.jpg'

const Card = () => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.img}>
                    <img src={foto1} alt="noteBook"/>
                </div>
                <div className={s.description}>
                    <p className={s.descText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quam quasi quo sint ullam? Aperiam dicta eius esse expedita quia.</p>
                </div>
                <div className={s.wrapBtn}>
                    <button className={s.btn}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    );
};

export default Card;