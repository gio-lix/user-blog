import axios from "axios";
import React, {useEffect, useState} from 'react';
import Info from "../../components/profile/info";
import Posts from "../../components/profile/posts";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {postProfilePosts, setProfilePosts} from "../../redux/slices/authSlices";
import {useParams} from "react-router-dom";

const Profile = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)
    const {profilePosts, status, token} = useAppSelector((state: RootState) => state.auth)


    const handleLoadMore = async () => {
        setLoad(true)
        try {
            const {data} = await axios.get(`/api/user_post/${id}?page=${profilePosts.page}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setProfilePosts(data))
        } catch (err) {
            console.log(err)
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        if (token ) {
            dispatch(postProfilePosts({id, token }))
        }
    },[token, id])



    return (
        <section>
            <Info  />
            <Posts
                handleLoadMore={handleLoadMore}
                load={load}
                profilePosts={profilePosts}
                status={status}
            />
        </section>
    );
};

export default Profile;