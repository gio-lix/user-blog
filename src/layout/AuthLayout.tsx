import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom"
import io from "socket.io-client";

import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import {getNotifiesApi} from "../redux/slices/postNotifySlice";
import {setSocket} from "../redux/slices/socketSlice";

import StatusModal from "../components/statusModal";
import Header from "../components/header/header";


const AuthLayout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const firstLogin = localStorage.getItem("firstLogin")

    const {token} = useAppSelector((state: RootState) => state.auth)
    const {modal} = useAppSelector((state: RootState) => state.posts)


    useEffect(() => {
        if (firstLogin === null && !token) {
            navigate("/login")
        } else if (token) {
            dispatch(getNotifiesApi({token}))
        }
    }, [firstLogin, token, navigate])


    useEffect(() => {
        const socket = io()
        dispatch(setSocket({socket}))
        return () => {
            socket.close()
        }
    }, [dispatch])


    return (
        <section className="main-container">
            {token && <Header/>}
            {modal && <StatusModal/>}

            <div style={{height: "70px", width: "100%"}}></div>
            <Outlet/>
        </section>
    );
};

export default AuthLayout;