import React, {FC} from 'react';
import s from "./Username.module.scss"
import {UserState} from "../../typing";
import clsx from "clsx";

interface Props extends UserState{
    children?: React.ReactNode
    handleLink?: React.MouseEventHandler<HTMLHeadingElement> | undefined
    className?: string
}

const UserCard:FC<Props> = ({_id,username,avatar,children,handleLink,className}) => {

    return (
        <section className={clsx(s.user, className ? className : "")}>
            <div>
                <img className={s.img} src={avatar} alt="avatar"/>
                <h2 onClick={handleLink}>{username}</h2>
            </div>
            <div>
                {children}
            </div>
        </section>
    );
};

export default UserCard;