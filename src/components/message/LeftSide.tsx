import React, {SyntheticEvent, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import {GoPrimitiveDot} from "react-icons/go"
import clsx from "clsx";

import s from "./Message.module.scss"

import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {addMessageUsers} from "../../redux/slices/messageUseresSlices";
import {fetchDataApi} from "../../api/postDataApi";
import {UserState} from "../../typing";
import UserCard from "../userCard";


const LeftSide = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const {token} = useAppSelector((state: RootState) => state.auth)
    const {users} = useAppSelector((state: RootState) => state.messageUsers)

    const [search, setSearch] = useState("")
    const [searchUsers, setSearchUsers] = useState([])


    const onHandleSearch = async (e: SyntheticEvent) => {
        e.preventDefault()
        const {success} = await fetchDataApi.getData(`search?username=${search}`, token!)
        if (success) setSearchUsers(success.users)
    }


    const onHandlerAddUser = (user: UserState) => {
        dispatch(addMessageUsers({user}))
        setSearch("")
        setSearchUsers([])
        navigate(`/message/${user._id}`)
    }

    const isActive = (user: any) => {
        if (id === user._id) return s.leftSide_active_icon
        return ""
    }

    return (
        <>
            <form onSubmit={onHandleSearch} className={s.leftSide_form}
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter to Search..."
                />
                <button type="button">
                    Search
                </button>
            </form>


            {searchUsers?.length !== 0 ? (
                <>
                    {searchUsers?.map((user: UserState, index: number) => (
                        <div key={`${user._id}_${index}`} onClick={() => onHandlerAddUser(user)}>
                            <UserCard className={s.users_styles}  {...user} />
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {users?.map((user: UserState) => (
                        <div key={user._id} onClick={() => onHandlerAddUser(user)}>
                            <UserCard {...user} className={clsx(s.users_styles, s.leftSide_icon, isActive(user))}>
                                <span role="icon"><GoPrimitiveDot/></span>
                            </UserCard>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default LeftSide;