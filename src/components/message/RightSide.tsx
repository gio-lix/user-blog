import React, {SyntheticEvent, useEffect, useState} from 'react';
import {RiSendPlane2Fill} from "react-icons/ri"
import {useParams} from "react-router-dom";
import {MdDelete} from "react-icons/md"
import clsx from "clsx";

import s from "./Message.module.scss"

import {RootState, useAppSelector} from "../../redux/store";
import {UserState} from "../../typing";
import MessageDisplay from "./MessageDisplay";
import UserCard from "../userCard";

const RightSide = () => {
    const {id} = useParams()

    const {users} = useAppSelector((state: RootState) => state.messageUsers)
    const {user: auth} = useAppSelector((state: RootState) => state.auth)

    const [user, setUser] = useState<UserState>()
    const [text, setText] = useState<string>("")

    useEffect(() => {
        const newUser = users.find((user: UserState) => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
    }, [users, id])


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
    }


    return (
        <div className={s.rightSide}>
            <UserCard {...user!} className={s.rightSide_deleteIcons}>
                <span>
                    <MdDelete/>
                </span>
            </UserCard>

            <div className={s.rightSide_body_box}>
                <div className={s.chat_display}>
                    <div className={clsx(s.chat_row, s.chat_other)}>
                        <MessageDisplay user={user!}/>
                    </div>
                    <div className={clsx(s.chat_row, s.chat_me)}>
                        <MessageDisplay user={auth!}/>
                    </div>
                </div>
                <div className={s.rightSide_body_box_form}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Enter you message..."
                        />

                        <button disabled={!text} type="submit">
                            <RiSendPlane2Fill/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RightSide;