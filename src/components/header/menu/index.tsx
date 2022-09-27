import React from 'react';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {AiFillCaretRight, AiFillHome} from "react-icons/ai";
import {RootState, useAppSelector} from "../../../redux/store";
import {TiLocationArrow} from "react-icons/ti";
import {RiCompassDiscoverFill} from "react-icons/ri";
import {IoMdNotificationsOff} from "react-icons/io";
import axios from "axios";
import s from "./Menu.module.scss"

const Menu = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {user, token} = useAppSelector((state: RootState) => state.auth)


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
    return (
        <>
            <nav className={s.menu}>
                <ul>
                    {navLink.map(item => (
                        <li key={item.label} >
                            <NavLink to={item.path} className={s.icons + " " +`${isActive(item.path)}`}>
                                {item.Icon}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <h5 className={s.homo}>HOME</h5>
                    </li>
                    <li  className={s.drop}>
                        {token ? <img style={{opacity:".5"}} src={user?.avatar} alt="avatar"/> : "user"}
                        <span role="icon" className={s.rotateActive}>
                            <AiFillCaretRight />
                        </span>
                        <div className={s.down}>
                            <Link to={`/profile/${user?._id}`}>Profile</Link>
                            <Link to="/">Dark Mode</Link>
                            <Link onClick={handleLogout} to="/">logout</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Menu;