import React from 'react';
import { Outlet} from "react-router-dom"
import Header from "../components/header/header";
import {RootState, useAppSelector} from "../redux/store";


const AuthLayout = () => {
    const {token} = useAppSelector((state: RootState) => state.auth)

    return (
        <section className="main-container">
            {token && <Header />}
            <Outlet />
        </section>
    );
};

export default AuthLayout;