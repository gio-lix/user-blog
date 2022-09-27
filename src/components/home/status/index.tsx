import React from 'react';
import s from "./Status.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import StatusModal from "../../statusModal";
import {setModal} from "../../../redux/slices/postsSlice";

const Status = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state: RootState) => state.auth)
    const {modal} = useAppSelector((state: RootState) => state.posts)



    return (
        <>
            <section>
                {modal && (
                    <StatusModal  />
                )}
            </section>
            <section className={s.status}>

                <div className={s.status_box}>
                    <img src={user?.avatar} alt="avatar"/>
                    <button onClick={() => dispatch(setModal(true))}>
                        {user?.username}, what are you thinking?
                    </button>
                </div>

            </section>
        </>

    );
};

export default Status;