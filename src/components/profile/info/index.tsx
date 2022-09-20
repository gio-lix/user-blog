import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom"
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import s from "./Info.module.scss"
import {postProfileDataApi} from "../../../redux/slices/authSlices";
import EditProfile from "../editProfile";
import clsx from "clsx";
import FollowBtn from "../followBtn";
import Followers from "../followers";
import axios from "axios";
import Following from "../following";
import {log} from "util";

const Info = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const editRef = useRef<HTMLDivElement | null>(null)
    const {token, profile, user} = useAppSelector((state: RootState) => state.auth)
    const [onEdit, setOnEdit] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)



    useEffect(() => {
        dispatch(postProfileDataApi({id, token}))
    }, [id])
    const handleClick = (e: any) => {
        if (!e.path.includes(editRef.current)) {
            setOnEdit(false)
        }
    }
    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])


    const [currentUser, setCurrentUser] = useState<any>()
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`/api/user/${id}`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                setCurrentUser(data.user)
            } catch (err) {

            }
        })()
    },[id])


    return (
        <main className={clsx(s.user, onEdit && s.hover)}>
            <section className={s.grid}>
                <img src={currentUser?.avatar} alt="user"/>
                <div>
                    <h3>{currentUser?.username}</h3>
                    <div className={s.follow}>
                        <span onClick={() => setShowFollowers(true)}>{profile?.followers?.length} followers</span>
                        <span onClick={() => setShowFollowing(true)}>{profile?.following?.length} following</span>
                    </div>
                    <h6 className={s.fullname}>{currentUser?.fullname}</h6>
                    <address>{currentUser?.address}</address>
                    <h6 className={s.email}>{currentUser?.email}</h6>
                    <a className={s.website} href={currentUser?.website} target="_blank" rel="noreferrer">
                        {currentUser?.website}
                    </a>
                    <p className={s.story}>{currentUser?.story}</p>
                </div>


                <div ref={editRef}>
                    {currentUser?._id === user?._id ? (
                        <button className={s.button} onClick={() => setOnEdit(true)}>Edit Profile</button>
                    ) : (
                        <FollowBtn user={profile!}/>
                    )}
                    {onEdit &&
                        <EditProfile
                            setOnEdit={setOnEdit}
                        />
                    }
                </div>
            </section>
            <div>
                {/*<p>{profile?.story}</p>*/}
            </div>
            {showFollowers && (
                <Followers
                    profile={profile!}
                    showFollowers={showFollowers}
                    setShowFollowers={setShowFollowers}
                />
            )}
            {showFollowing && (
                <Following
                    profile={profile!}
                    showFollowing={showFollowing}
                    setShowFollowing={setShowFollowing}
                />
            )}
        </main>

    );
};

export default Info;