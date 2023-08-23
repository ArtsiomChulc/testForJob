import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {fetchAdminData} from "../../common/admin/adminReducer";
import {useSelector} from "react-redux";
import Loader from "../../common/loader/Loader";
import {AdminType} from "../../type/types";
import s from './admin.module.scss'

const Admin = () => {
    const adminData = useSelector<AppRootStateType, AdminType[]>(state => state.admin)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAdminData())
    }, []);

    const brand = adminData.map(br => {
        return br.brands
    })
    console.log(brand)
    if (adminData.length === 0) return <Loader/>

    return (
        <div className={s.adminContainer}>
            {adminData.map(el => {
                return (
                    <div className={s.adminInfo}>
                        <span>Имя: {el.name}</span>
                        <span>Фамилия: {el.surname}</span>
                        <span>Адрес: {el.address}</span>
                        <span>Телефон: {el.phone}</span>
                    </div>
                )
            })}
            {brand.map(el => {
                return (
                    <div>
                        <span>{el}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default Admin;