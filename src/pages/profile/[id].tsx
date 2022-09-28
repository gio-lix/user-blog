import React from 'react';
import Info from "../../components/profile/info";
import Posts from "../../components/profile/posts";
import {RootState, useAppSelector} from "../../redux/store";

const Profile = () => {
    const {profilePosts, status} = useAppSelector((state: RootState) => state.auth)

    return (
        <section>
            <Info  />
            <Posts
                profilePosts={profilePosts}
                status={status}
            />
        </section>
    );
};

export default Profile;