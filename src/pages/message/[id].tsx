import React from 'react';
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
    return (
        <main className="message">
            <section>
                <LeftSide />
            </section>
            <section >
                <RightSide />
            </section>
        </main>
    );
};

export default Conversation;