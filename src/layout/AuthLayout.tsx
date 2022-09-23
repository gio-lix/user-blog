import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom"
import Header from "../components/header/header";
import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import {getPosts} from "../redux/slices/postsSlice";


const AuthLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {token} = useAppSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(getPosts(token))
        }
    },[token])

    return (
        <section className="main-container">
            {token && <Header />}
            <div style={{height: "70px", width:"100%"}}> </div>
            <Outlet />
        </section>
    );
};

export default AuthLayout;