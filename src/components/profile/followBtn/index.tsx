import React, {FC, useEffect, useState} from 'react';
import s from "./FollowBtn.module.scss"
import {UserState} from "../../../typing";
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {setFollowers, setFollowing} from "../../../redux/slices/authSlices";
import axios from "axios";
import {IMAGES} from "../../../images";

interface Props {
    user: UserState
}


const FollowBtn:FC<Props> = ({user}) => {
    const dispatch = useAppDispatch()
    const [follow, setFollow] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const {token,user: auth, profile} = useAppSelector((state: RootState) => state.auth)



    useEffect(() => {
        if(auth?.following?.includes(user?._id as string)){
            setFollow(true)
        }
        return () => setFollow(false)
    },[user?._id, auth?.following])



    const handleFollow = async () => {
        let newUser = {...user, followers: [...user.followers, auth?._id]}
        let newAuth = {...auth, following: [...(auth as any).following, newUser?._id]}

        setLoading(true)
        try {
            await axios.put(`/api/user/${user._id}/follow`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setFollowers(newUser))
            dispatch(setFollowing(newAuth))
            setFollow(true)
            setLoading(false)
        } catch (err) {
            console.log("err - ", err)
        } finally {
            setLoading(false)
        }
    }

    const handleUnfollow = async () => {
        let newUser = {...user, followers: [...user.followers.filter((e:string) => e !== auth?._id)]}
        // let newAuth = {...auth, following: [...(auth as any).following.filter((e:string) => e !== user?._id)]}
        setLoading(true)

        try {
           await axios.put(`/api/user/${user?._id}/unfollow`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setFollowers(newUser))
            setFollow(false)
            setLoading(false)
        } catch (err) {
            console.log("err - ", err)
        } finally {
            setLoading(false)

        }
    }

    return (
        <>
            {follow
                ?
                <button onClick={handleUnfollow} className={s.root}>
                    {!loading ? "Unfollow" : (
                        <img src={IMAGES.spinner} alt="spinner"/>
                    )}
                </button>
                :
                <button onClick={handleFollow} className={s.root}>
                    {!loading ? "follow" : (
                        <img src={IMAGES.spinner} alt="spinner"/>
                    )}
                </button>
            }
        </>
    );
};

export default FollowBtn;