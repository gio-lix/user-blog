import axios from "axios";
import React, {useEffect, useState} from 'react';
import Info from "../../components/profile/info";
import Posts from "../../components/profile/posts";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {postProfilePosts, setProfilePosts} from "../../redux/slices/authSlices";
import {useParams} from "react-router-dom";
import Saved from "../../components/profile/saved";
import {setAddSavedPosts} from "../../redux/slices/postSavedSlice";

const Profile = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)
    const [saveTab, setSaveTab] = useState(false)
    const {profilePosts, status, token, user} = useAppSelector((state: RootState) => state.auth)
    const {result,page} = useAppSelector((state: RootState) => state.savedPosts)


    useEffect(() => {
        if (token) {
            dispatch(postProfilePosts({id, token }))
        }
    },[token, id])

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
    const handleLoadMoreSavedPost = async () => {
        setLoad(true)
        try {
            const {data} = await axios.get(`/api/getSavedPost?page=${profilePosts.page}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setAddSavedPosts({result: data.result, posts: data.savedPosts}))
        } catch (err) {
            console.log(err)
        } finally {
            setLoad(false)
        }
    }



    return (
        <section>
            <Info  />
            {user._id === id  && (
                <div className='profile_tag'>
                    <button
                        onClick={() => setSaveTab(false)}
                        className={saveTab ? "" : "active_tag"}>Posts</button>
                    <button
                        onClick={() => setSaveTab(true)}
                        className={saveTab ? "active_tag" : ""}>Save</button>
                </div>
            )}
            {saveTab ? (
                <Saved
                    load={load}
                    page={page}
                    result={result}
                    handleLoadMore={handleLoadMoreSavedPost}
                />
            ) : (
                <Posts
                    load={load}
                    status={status}
                    profilePosts={profilePosts}
                    handleLoadMore={handleLoadMore}
                />
            )}

        </section>
    );
};

export default Profile;