import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom"
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import s from "./Info.module.scss"
import {postProfileDataApi} from "../../../redux/slices/authSlices";
import EditProfile from "../editProfile";
import clsx from "clsx";
import FollowBtn from "../followBtn";

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






    return (
        <main className={clsx(s.user, onEdit && s.hover)}>
            <section className={s.grid}>
                <img src={profile?.avatar} alt="user"/>
                <div>
                    <h3>{profile?.username}</h3>
                    <div className={s.follow}>
                        <span onClick={() => setShowFollowers(true)}>{profile?.followers.length} followers</span>
                        <span onClick={() => setShowFollowing(true)}>{profile?.following.length} following</span>
                    </div>
                    <h6 className={s.fullname}>{profile?.fullname}</h6>
                    <address>{profile?.address}</address>
                    <h6 className={s.email}>{profile?.email}</h6>
                    <a className={s.website} href={profile?.website} target="_blank" rel="noreferrer">
                        {profile?.website}
                    </a>
                    <p className={s.story}>{profile?.story}</p>
                </div>


                <div ref={editRef}>
                    {profile?._id === user?._id ? (
                        <button className={s.button} onClick={() => setOnEdit(true)}>Edit Profile</button>
                    ) : (
                        <FollowBtn user={profile!}/>
                    )}

                    {onEdit &&
                        <EditProfile
                            setOnEdit={setOnEdit}
                        />
                    }
                    {/*{showFollowers && (*/}
                    {/*    <Followers*/}
                    {/*        user={profile?.followers}*/}
                    {/*        setShowFollowers={setShowFollowers}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*{showFollowing && (*/}
                    {/*    <Following*/}
                    {/*        user={user!}*/}
                    {/*        setShowFollowing={setShowFollowing}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </section>
            <div>
                {/*<p>{profile?.story}</p>*/}
            </div>

        </main>

    );
};

export default Info;