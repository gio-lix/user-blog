import React from 'react';
import Status from "../components/home/status";
import Posts from "../components/home/posts";
import {RootState, useAppSelector} from "../redux/store";
import {IMAGES} from "../images";

const Home = () => {
    const {result, status} = useAppSelector((state:RootState) => state.posts)

    return (
        <main>
            {status === "loading" ? (
                <div className="loading">
                    <img src={IMAGES.spinner} alt="spinner"/>
                </div>
            ) : (
                <>
                    <Status />
                    {result === 0 ? <h1>No Posts</h1> : <Posts />}
                </>
            )}
        </main>
    );
};

export default Home;