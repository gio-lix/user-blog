import React, {FC} from 'react';

import s from "./Message.module.scss"

import {UserState} from "../../typing";


interface Props {
    user: UserState
}


const MessageDisplay: FC<Props> = ({user}) => {
    return (
        <>
            <div className={s.chat_title}>
                <img src={user?.avatar} alt="avatar"/>
                <span>{user?.username}</span>
            </div>
            <div className={s.chat_text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate deserunt hic ipsa natus
                perferendis quam quos reprehenderit similique tempore! Aliquid cum cumque nam nihil reiciendis. Commodi
                excepturi omnis velit.
            </div>
            <div className={s.chat_time}>
                April 2021
            </div>
        </>
    );
};

export default MessageDisplay;