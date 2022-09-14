import React from 'react';
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import Toast from "./toast";
import {setShow} from "../../redux/slices/authSlices";
import Loading from "./loading";

const Notify = () => {
    const dispatch = useAppDispatch()
    const {success,status,error} = useAppSelector((state: RootState) => state.auth)

    return (
        <div>
            {(status !== "loading" && error ) &&
                <Toast
                    message={{title: "Error", body: error}}
                    bgColor={"#ce0101"}
                    handleShow={() => dispatch(setShow())}
                />
            }
            {(status !== "loading" && success ) &&
                <Toast
                    message={{title: "Success", body: success}}
                    bgColor={"#ADFF2FFF"}
                    handleShow={() => dispatch(setShow())}
                />
            }
            {status === "loading" && (
                <Loading />
            )}
        </div>
    );
};

export default Notify;