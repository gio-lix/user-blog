import React, {FC} from 'react';
import s from "./Username.module.scss"
import {UserState} from "../../typing";
import clsx from "clsx";
import {RootState, useAppSelector} from "../../redux/store";

interface Props extends UserState{
    children?: React.ReactNode
    handleLink?: React.MouseEventHandler<HTMLHeadingElement> | undefined
    className?: string
}

const UserCard:FC<Props> = ({_id,username,avatar,children,handleLink,className}) => {
    const {theme} = useAppSelector((state:RootState) => state.notify)



    return (
        <section className={clsx(s.user, className ? className : "",
            theme === "light" && s.user_theme
            )}>
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