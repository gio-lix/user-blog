import React, {useEffect} from 'react';
import {Outlet, useParams} from "react-router-dom"
import Header from "../components/header/header";
import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import {getPosts} from "../redux/slices/postsSlice";
import {postProfilePosts} from "../redux/slices/authSlices";


const AuthLayout = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {token} = useAppSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(getPosts(token))
            if (id) {
                dispatch(postProfilePosts({id, token }))
            }
        }
    },[token, id])


    return (
        <section className="main-container">
            {token && <Header />}
            <div style={{height: "70px", width:"100%"}}> </div>
            <Outlet />
        </section>
    );
};

export default AuthLayout;