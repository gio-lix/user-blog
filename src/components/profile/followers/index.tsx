import React, {FC, useEffect, useState} from 'react';
import UserCard from "../../userCard";
import FollowBtn from "../followBtn";
import s from "./Followers.module.scss"
import {RootState, useAppSelector} from "../../../redux/store";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserState} from "../../../typing";
import {IMAGES} from "../../../images";


interface Props {
    profile: UserState
    showFollowers: boolean
    setShowFollowers: Function
}

const Followers: FC<Props> = ({showFollowers, setShowFollowers, profile}) => {
    const navigate = useNavigate()
    const {user: auth, token} = useAppSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState(false)


    const [currentUser, setCurrentUser] = useState<UserState[]>([])
    useEffect(() => {
        setCurrentUser([])
        if (showFollowers) {
            setLoading(true)
            profile?.followers.forEach((e: string) => {
                axios.get(`/api/user/${e}`, {
                    headers: {'Authorization': `${token}`}
                })
                    .then(res => setCurrentUser((prev: any) => [...prev, res.data.user]))
                    .catch(err => console.log(err))
                    .finally(() => setLoading(false))
            })
        }
    }, [showFollowers])


    const handleLink = (id: string) => {
        setShowFollowers(false)
        navigate(`/profile/${id}`)
        return
    }

    return (
        <div className={s.root}>
            <div>
                <h1>Followers</h1>
                <button onClick={() => setShowFollowers(false)}>&times;</button>
                {loading ? <img className={s.spinner} src={IMAGES.spinner} alt="spinner"/> : (
                    <>
                        {currentUser.map((user: UserState) => {
                            return (
                                <div key={user._id}>
                                    <UserCard {...user} className={s.className} handleLink={() => handleLink(user._id)}>
                                        {auth?._id !== user._id && <FollowBtn user={user}/>}
                                    </UserCard>
                                </div>
                            )
                        })}
                    </>
                )}

            </div>
        </div>
    );
};

export default Followers;