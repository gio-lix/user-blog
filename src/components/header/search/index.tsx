import React, { useEffect, useRef, useState} from 'react';
import s from "./Search.module.scss"
import {BiSearch} from "react-icons/bi"
import {RootState,useAppSelector} from "../../../redux/store";
import axios from "axios";
import {UserState} from "../../../typing";
import {NavLink} from "react-router-dom";
import UserCard from "../../userCard";

const Search = () => {
    const {token} = useAppSelector((state: RootState) => state.auth)
    const usersRef = useRef<HTMLDivElement | null>(null)
    const [search, setSearch] = useState<string>()
    const [users, setUsers] = useState<UserState[]>([])


    useEffect(() => {
        (async () => {
            try {
                if (search) {
                    const {data} = await axios.get(`/api/search?username=${search}`, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    })
                    setUsers(data.users)
                }
            } catch (err) {
                console.log("err - ", err)
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
    return (
        <form className={s.search}>
            <input
                type="text"
                value={search || ""}
                onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))}
            />
            <div className={s.icon}>
                <span>
                    <BiSearch/>
                </span>
                <p>Search</p>
            </div>
            <div onClick={handleClose} className={s.close}>&times;</div>


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