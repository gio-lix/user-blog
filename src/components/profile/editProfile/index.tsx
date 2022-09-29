import React, {FC, SyntheticEvent, useEffect, useState} from 'react';
import s from "./EditProfile.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import axios from "axios";
import {imageUpload} from "../../../utils/ImageUploaded";
import {setNotify} from "../../../redux/slices/notifySlices";

interface Props {
    setOnEdit: Function
    setCount: Function
}

const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: ""
}
type State = typeof initialState

const EditProfile: FC<Props> = ({setOnEdit, setCount}) => {
    const dispatch = useAppDispatch()
    const [avatar, setAvatar] = useState<any>()
    const [uploadImage, setUploadImage] = useState<any>()
    const [userData, setUserData] = useState<State>(initialState)
    const {profile, token} = useAppSelector((state: RootState) => state.auth)
    const {website, address, fullname,mobile, gender, story} = userData

    useEffect(() => {
        setUserData(profile!)
    }, [profile])




    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }



    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        const file = e.target.files[0]
        setAvatar(file)

        const {success} = await imageUpload(file)

        setUploadImage((success as any).url)

    };


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        let user = {website, address,avatar : uploadImage, fullname, mobile, gender, story}

        setCount((prev: number) => prev + 1)
        try {
            await axios.put(`/api/user`, user, {
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            dispatch(setNotify({error: [(err as any).response.data]}))
        }
        setOnEdit(false)
    }


    return (
        <section className={s.edit}>
            <button onClick={() => setOnEdit(false)} className={s.close}>&times;</button>
            <form onSubmit={handleSubmit}>
                <div className={s.images_group}>
                    <figure className={s.image}>
                        <img
                            src={avatar ? URL.createObjectURL(avatar) : profile?.avatar}
                            alt="profile"
                        />
                        {/*<figcaption>Change</figcaption>*/}
                    </figure>
                    <label htmlFor="file" role="button">
                        Load file
                        <input
                            type="file"
                            accept="image/*"
                            name="file"
                            id="file"
                            hidden
                            onChange={handleChangeFile}
                        />
                    </label>

                </div>
                <div className={s.input_group}>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={fullname}
                        onChange={handleChangeInput}
                        className={s.fullname}
                    />
                    <small className={s.fullname_cunt}>
                        {fullname.length} / 25
                    </small>
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={handleChangeInput}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChangeInput}
                    />
                </div>
                <div>
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        value={website}
                        onChange={handleChangeInput}
                    />
                </div>
                <div>
                    <label htmlFor="story">Story</label>
                    <textarea
                        name="story"
                        value={story}
                        onChange={handleChangeInput}
                        cols={30}
                        rows={4}
                    />
                    <small className={s.textarea_count}>{story.length} / 200</small>
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select onChange={handleChangeInput} value={gender} name="gender" id="gender">
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button type="submit" className={s.save_button}>Save</button>
            </form>
        </section>
    );
};

export default EditProfile;