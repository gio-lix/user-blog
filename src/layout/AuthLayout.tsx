import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom"
import Header from "../components/header/header";
import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import StatusModal from "../components/statusModal";
import io from "socket.io-client";
import {setSocket} from "../redux/slices/socketSlice";
import SocketClient from "../SocketClient";


const AuthLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const firstLogin = localStorage.getItem("firstLogin")
    const {token, user} = useAppSelector((state: RootState) => state.auth)
    const {modal} = useAppSelector((state: RootState) => state.posts)



    useEffect(() => {
        if (firstLogin === null && !token) {
            navigate("/login")
        }
    },[firstLogin, token, navigate])


    useEffect(() => {
        const socket = io()
        dispatch(setSocket({socket}))
        return () => {
            socket.close()
        }
    },[dispatch])


    return (
        <section   className="main-container">
            {token && <Header />}
            {modal && <StatusModal />}

            <div style={{height: "70px", width:"100%"}}> </div>
            <Outlet />
        </section>
    );
};

export default AuthLayout;