import React from 'react';

import {BsMessenger} from "react-icons/bs"

import LeftSide from "../components/message/LeftSide";


const Message = () => {
    return (
        <main className="message">
            <section>
                <LeftSide />
            </section>
            <section className='message_right_body'>
                <p className="messenger">
                    <BsMessenger />
                    <span>Messenger</span>
                </p>
            </section>
        </main>
    );
};

export default Message;