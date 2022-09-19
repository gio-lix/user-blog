import React, {FC} from 'react';
import s from "./Username.module.scss"
import {UserState} from "../../typing";

interface Props extends UserState{
    children?: React.ReactNode
}

const UserCard:FC<Props> = ({_id,username,avatar,children}) => {
    return (
        <section className={s.user}>
            <img src={avatar} alt="avatar"/>
            <h2>{username}</h2>
            <div>
                {children}
            </div>
        </section>
    );
};

export default UserCard;