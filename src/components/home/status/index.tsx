import React, {useState} from 'react';
import s from "./Status.module.scss"
import {RootState, useAppSelector} from "../../../redux/store";
import StatusModal from "../../statusModal";

const Status = () => {
    const [statusTrue, setStatusTrue] = useState(false)
    const {user} = useAppSelector((state: RootState) => state.auth)




    return (
        <>
            <section>
                {statusTrue && (
                    <StatusModal setStatusTrue={setStatusTrue} />
                )}
            </section>
            <section className={s.status}>

                <div className={s.status_box}>
                    <img src={user?.avatar} alt="avatar"/>
                    <button onClick={() => setStatusTrue(true)}>
                        {user?.username}, what are you thinking?
                    </button>
                </div>

            </section>
        </>

    );
};

export default Status;