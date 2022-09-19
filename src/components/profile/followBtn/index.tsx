import React, {FC, useEffect, useState} from 'react';
import s from "./FollowBtn.module.scss"
import {UserState} from "../../../typing";
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {setFollowers} from "../../../redux/slices/authSlices";
import axios from "axios";

interface Props {
    user: UserState
}


const FollowBtn:FC<Props> = ({user}) => {
    const dispatch = useAppDispatch()
    const [follow, setFollow] = useState<boolean>(false)
    const {token,user: users, profile} = useAppSelector((state: RootState) => state.auth)


    useEffect(() => {
        setFollow(profile?.followers.includes(users?._id as string)!)
    },[profile])



    const handleFollow = async () => {
        let newUser = {...user,followers: [...user.followers, users?._id]}
        try {
            await axios.put(`/api/user/${user._id}/follow`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setFollowers(newUser))
            setFollow(true)
        } catch (err) {
            console.log("err - ", err)
        }
    }

    const handleUnfollow = async () => {
        let newUser = {...user,followers: [...user.followers.filter(e => e !== users?._id)]}
        try {
           await axios.put(`/api/user/${user._id}/unfollow`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setFollowers(newUser))
            setFollow(false)
        } catch (err) {
            console.log("err - ", err)
        }
    }




    return (
        <>
            {follow
                ? <button onClick={handleUnfollow} className={s.root}>UnFollow</button>
                : <button onClick={handleFollow} className={s.root}>Follow</button>
            }
        </>
    );
};

export default FollowBtn;