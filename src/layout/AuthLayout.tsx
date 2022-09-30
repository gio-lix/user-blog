import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom"
import Header from "../components/header/header";
import {RootState, useAppSelector} from "../redux/store";
import StatusModal from "../components/statusModal";


const AuthLayout = () => {
    const navigate = useNavigate()
    const {token} = useAppSelector((state: RootState) => state.auth)
    const firstLogin = localStorage.getItem("firstLogin")
    const {modal} = useAppSelector((state: RootState) => state.posts)



    useEffect(() => {
        if (firstLogin === null && !token) {
            navigate("/login")
        }
    },[firstLogin, token, navigate])


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