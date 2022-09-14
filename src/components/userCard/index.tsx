import React from 'react';
import s from "./Username.module.scss"
import {UserState} from "../../typing";

const UserCard = ({_id,email,username,gender,avatar,followers,following,mobile,website,address}:UserState) => {
    return (
        <section className={s.user}>
            <img src={avatar} alt="avatar"/>
            <h2>{username}</h2>
        </section>
    );
};

export default UserCard;