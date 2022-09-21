import React, {FC, useEffect, useState} from 'react';
import {UserState} from "../../../typing";
import s from "./Following.module.scss"
import UserCard from "../../userCard";
import FollowBtn from "../followBtn";
import {useNavigate} from "react-router-dom";
import {RootState, useAppSelector} from "../../../redux/store";
import axios from "axios";

interface Props {
    profile: UserState
    showFollowing: boolean
    setShowFollowing: Function
}

const Following:FC<Props> = ({setShowFollowing, profile,showFollowing}) => {
    const navigate = useNavigate()
    const {user: auth, token} = useAppSelector((state: RootState) => state.auth)


    const [currentUser, setCurrentUser] = useState<UserState[]>([])
    useEffect(() => {
        setCurrentUser([])
        profile?.following.forEach((e: string) => {
            axios.get(`/api/user/${e}`, {
                headers: {'Authorization': `${token}`}
            })
                .then(res => setCurrentUser((prev: any) => [...prev, res.data.user]))
                .catch(err => console.log(err))
        })
    }, [showFollowing])


    const handleLink = (id: string) => {
        setShowFollowing(false)
        navigate(`/profile/${id}`)
        return
    }
    return (
        <div className={s.root}>
            <div>
                <h1>Followers</h1>
                <button onClick={() => setShowFollowing(false)}>&times;</button>
                {currentUser.map((user: UserState) => {
                    return (
                        <div key={user._id}>
                            <UserCard {...user} className={s.className} handleLink={handleLink}>
                                {auth?._id !== user._id && <FollowBtn  user={user} />}
                            </UserCard>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Following;