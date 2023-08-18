import React from 'react';
import s from './card.module.scss';
import {Button} from "@mui/material";
import {CardType} from "../../type/types";

type CardPropsType = {
    data: CardType[] | null
}

const Card = (props: CardPropsType) => {

    return (
        <>
            {
                props.data?.map(el => {
                    return (
                        <div key={el.id} className={s.container}>
                            <div className={s.wrapper}>
                                <div className={s.imgBlock}>
                                    <img src={el.img} alt="noteBook"/>
                                </div>
                                <div className={s.description}>
                                    <p className={s.descText}>{el.description}</p>
                                </div>
                                <Button className={s.btn} variant="outlined" size="medium" color={'info'}>
                                    Добавить в корзину
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
};

export default Card;

