import React from 'react';
import Status from "../components/home/status";
import Posts from "../components/home/posts";
import {RootState, useAppSelector} from "../redux/store";

const Home = () => {
    const {result} = useAppSelector((state:RootState) => state.posts)
    return (
        <main>
            <Status />
            {result === 0 ? <h1>No Posts</h1> : <Posts />}
        </main>
    );
};

export default Home;