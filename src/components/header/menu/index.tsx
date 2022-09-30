import React from 'react';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {AiFillCaretRight, AiFillHome} from "react-icons/ai";
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {TiLocationArrow} from "react-icons/ti";
import {RiCompassDiscoverFill} from "react-icons/ri";
import {IoMdNotificationsOff} from "react-icons/io";
import axios from "axios";
import s from "./Menu.module.scss"
import {setTheme} from "../../../redux/slices/notifySlices";
import clsx from "clsx";

const Menu = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {user, token} = useAppSelector((state: RootState) => state.auth)
    const {theme} = useAppSelector((state: RootState) => state.notify)


    const navLink = [
        {label: "Home", Icon: <AiFillHome />, path: "/"},
        {label: "Message", Icon: <TiLocationArrow />, path: "/message"},
        {label: "discover", Icon: <RiCompassDiscoverFill />, path: "/discover"},
        {label: "Notify", Icon: <IoMdNotificationsOff />, path: "/notify"},
    ]

    const handleLogout = async () => {
        try {
            localStorage.removeItem("firstLogin")
            await axios.post("/api/logout")
            navigate("/login")
        } catch (err) {
            console.log("err - ")
        }
    }

    const isActive = (pn: string) => {
        if (pn === pathname ) return s.active
    }

    const onHandleTheme = () => {
        if (theme === "light") {
            dispatch(setTheme("dark"))
            localStorage.setItem("blog_theme", "dark")
        } else {
            dispatch(setTheme("light"))
            localStorage.setItem("blog_theme", "light")
        }
    }


    return (
        <>
            <nav className={clsx(s.menu,
                    theme === "light" && s.menu_dark
                )}>
                <ul>
                    {navLink.map(item => (
                        <li key={item.label} >
                            <NavLink to={item.path} className={clsx(s.icons + " " +`${isActive(item.path)}`)}>
                                {item.Icon}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <h5 className={s.homo}>HOME</h5>
                    </li>
                    <li  className={s.drop}>
                        {token ? <img style={{opacity:".5"}} src={user?.avatar} alt="avatar"/> : "user"}
                        <span className={s.rotateActive}>
                            <AiFillCaretRight />
                        </span>
                        <div className={clsx(s.down,
                                theme === "light" && s.drop_theme
                            )}>
                            <Link to={`/profile/${user?._id}`}>Profile</Link>
                            <button onClick={() => onHandleTheme()} >{theme === "light" ? "Light mode" : "Dark mode"}</button>
                            <Link onClick={handleLogout} to="/">logout</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Menu;