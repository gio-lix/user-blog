import React, {useEffect, useState} from 'react';
import s from "./RightSideBar.module.scss"
import {RootState, useAppSelector} from "../../../redux/store";
import UserCard from "../../userCard";
import {AiOutlineReload} from "react-icons/ai"
import axios from "axios";
import {UserState} from "../../../typing";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import FollowBtn from "../../profile/followBtn";

const RightSideBar = () => {
    const navigate = useNavigate()
    const {user, token} = useAppSelector((state: RootState) => state.auth)
    const [users, setUsers] = useState<UserState[]>([])
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        let mounded = true

        if (mounded || reload && token) {
            setLoading(true)
            axios.get(`/api/suggestionsUser`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(res => {
                    setUsers(res.data.users)
                    setReload(false)
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))

        }
        return () => {
            mounded = false
        }
    }, [token, reload])

    const handleLink = (id: string) => {
        return navigate(`/profile/${id}`)
    }


    return (
        <div className={s.suggest}>
            <UserCard {...user!} />

            <div className={s.suggest_title_box}>
                <h5>Suggestions for you</h5>
                <span
                    onClick={() => setReload(true)}
                    className={clsx(loading && s.loading)}>
                     <AiOutlineReload/>
                </span>
            </div>
            <div>
                {users?.map((item, index: number) => {
                    return (
                        <UserCard
                            className={s.following}
                            handleLink={() => handleLink(item._id)}
                            key={`${item._id}_${index}`}
                            {...item}
                        >
                            <FollowBtn user={item}/>
                        </UserCard>
                    )
                })}
            </div>
            <small>
                @copy; 2022
            </small>
        </div>
    );
};

export default RightSideBar;