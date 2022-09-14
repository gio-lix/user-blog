import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/home";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import Notify from "./components/notify";
import {useAppDispatch} from "./redux/store";
import {refreshDataApi} from "./redux/slices/authSlices";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import NotFound from "./components/NotFound";


function App() {
    const dispatch = useAppDispatch()
    const firstLogin = localStorage.getItem("firstLogin")

    useEffect(() => {
        if (firstLogin) {
            dispatch(refreshDataApi())
        }
    }, [firstLogin, dispatch])

    return (
        <>
            <Notify/>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
                <Route path="/" element={<AuthLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route element={<PrivateRouter />}>
                        <Route  path=":page" element={ <> <PageRender  /> </> } />
                        <Route  path=":page/:id" element={ <> <PageRender  /> </> } />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
