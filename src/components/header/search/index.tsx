import React, { useEffect, useRef, useState} from 'react';
import s from "./Search.module.scss"
import {BiSearch} from "react-icons/bi"
import {RootState,useAppSelector} from "../../../redux/store";
import axios from "axios";
import {UserState} from "../../../typing";
import {NavLink} from "react-router-dom";
import UserCard from "../../userCard";
import {IMAGES} from "../../../images";
import clsx from "clsx";

const Search = () => {
    const {token} = useAppSelector((state: RootState) => state.auth)
    const {theme} = useAppSelector((state: RootState) => state.notify)
    const usersRef = useRef<HTMLDivElement | null>(null)
    const [search, setSearch] = useState<string>()
    const [focus, setFocus] = useState(false)
    const [users, setUsers] = useState<UserState[]>([])
    const [load, setLoad] = useState<boolean>(false)


    useEffect(() => {
        (async () => {
            setLoad(true)
            try {
                if (search) {
                    const {data} = await axios.get(`/api/search?username=${search}`, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    })
                    setUsers(data.users)
                    setLoad(false)
                }
            } catch (err) {
                console.log("err - ", err)
            } finally {
                setLoad(false)
            }
        })()
    }, [search, token])

    const handleClose = () => {
        setSearch("")
        setUsers([])
    }


    const handleClick = (e: any) => {
        if (!e.path.includes(usersRef.current)) {
            setUsers([])
        }
    }
    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    })

    const handleBlur = () => {
        setTimeout(() => {
            setFocus(false)
        },200)
    }


    return (
        <form className={clsx(s.search,
                theme === "light" && s.search_dark
            )}>
            <input
                type="text"
                value={search || ""}
                onFocus={() => setFocus(true)}
                onBlur={handleBlur}
                onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))}
            />

            <div className={s.icon}>
                <span>
                    <BiSearch/>
                </span>
                <p>Search</p>
            </div>
            {load ? (
                <img className={s.spinner} src={IMAGES.spinner} alt="spiner"/>
            ) : (
                <>
                    {focus && (
                        <div onClick={handleClose} className={s.close}>&times;</div>
                    )}
                </>
            )}


            <div ref={usersRef} className={s.user}>
                {users?.map((user:UserState ) => (
                    <NavLink  key={user._id} to={`/profile/${user._id}`} onClick={handleClose} >
                        <UserCard {...user} />
                    </NavLink>
                ))}
            </div>
        </form>
    );
};

export default Search;