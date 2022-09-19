import React, {FC} from 'react';
import {UserState} from "../../../typing";

interface Props {
    user: UserState
    setShowFollowing: Function
}

const Following:FC<Props> = ({setShowFollowing,user}) => {
    return (
        <section>
            Following
        </section>
    );
};

export default Following;