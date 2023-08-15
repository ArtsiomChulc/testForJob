import React from 'react';
import s from './card.module.scss';
import foto1 from '../../assets/img/maxresdefault.jpg'
import {Button} from "@mui/material";

type CardPropsType = {
    description: string
}

const Card = (props: CardPropsType) => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.imgBlock}>
                    <img src={foto1} alt="noteBook"/>
                </div>
                <div className={s.description}>
                    <p className={s.descText}>{props.description}</p>
                </div>
                <Button className={s.btn} variant="outlined" size="medium" color={'info'}>
                    Добавить в корзину
                </Button>
            </div>
        </div>
    );
};

export default Card;