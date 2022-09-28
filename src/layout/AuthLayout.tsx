import React, {useEffect} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom"
import Header from "../components/header/header";
import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import {getPosts} from "../redux/slices/postsSlice";
import {postProfilePosts} from "../redux/slices/authSlices";
import StatusModal from "../components/statusModal";


const AuthLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {id} = useParams()
    const {token} = useAppSelector((state: RootState) => state.auth)

    const firstLogin = localStorage.getItem("firstLogin")
    const {modal} = useAppSelector((state: RootState) => state.posts)



    useEffect(() => {
        if (token) {
            dispatch(getPosts(token))
            if (id) {
                dispatch(postProfilePosts({id, token }))
            }
        } else if(firstLogin === null ) {
            navigate("/login")
        }
    },[token, id])


    return (
        <section className="main-container">
            {token && <Header />}
            {modal && <StatusModal />}
            <div style={{height: "70px", width:"100%"}}> </div>
            <Outlet />
        </section>
    );
};

export default AuthLayout;